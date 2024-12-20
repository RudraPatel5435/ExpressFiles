const express = require('express')
const { body, validationResult } = require('express-validator')
const userModel = require('./models/user')
const bcrypt = require('bcrypt')

const app = express()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
  res.render('./Auth/register')
})

app.post('/home',
  body('username').trim(),
  body('password').trim().isLength({min: 8}),
  async (req, res)=>{
  const {username, password} = req.body

  const hashPassword = await bcrypt.hash(password, 10)

  const newUser = await userModel.create({
    username: username,
    password: hashPassword
  })

  res.render('home')
})

app.listen(5001, ()=>{
  console.log("Server running on port 5001")
})