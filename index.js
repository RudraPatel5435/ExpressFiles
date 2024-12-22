const express = require('express')
const { body, validationResult } = require('express-validator')
const userModel = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const user = require('./models/user')

const app = express()
const JWT_SECRET = 'secret'

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req, res)=>{
  res.render('./Auth/register')
})

app.get('/login', (req, res)=>{
  res.render('./Auth/login')
})

app.post('/register',
  body('username').trim(),
  body('password').trim().isLength({min: 8}),
  async (req, res)=>{
  const {username, password} = req.body

  const hashPassword = await bcrypt.hash(password, 10)

  const newUser = await userModel.create({
    username: username,
    password: hashPassword,
    files: null
  })

  const token = jwt.sign({ userID: newUser._id}, JWT_SECRET, {expiresIn: '1h'})
  res.cookie('token', token, {httpOnly: true})

  res.redirect('/home')
})

const authenticateJWT = (req, res, next)=>{
  const token = req.cookies.token
  if(token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if(err){
        return res.sendStatus(403)
      }
      req.user = user
      next()
    })
  } else {
    res.sendStatus(401)
  }
}

app.post('/login',
  body('username').trim(),
  body('password').trim().isLength({min: 8}),
  async (req, res)=>{
    const {username, password} = req.body
    
    const user = await userModel.findOne({username})
    if(!user){
      return res.status(404).send('User not found')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(401).send('Invalid credentials')
    }
    const token = jwt.sign({userID: user._id}, JWT_SECRET, {expiresIn: '1h'})
    res.cookie('token', token, {httpOnly: true})
    
    res.redirect('/home')
  })
  
  app.get('/home', authenticateJWT, (req, res)=>{
    res.render('home')
  })

app.listen(5001, ()=>{
  console.log("Server running on port 5001")
})