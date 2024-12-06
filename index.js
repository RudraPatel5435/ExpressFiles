const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    fs.readdir(`./files`, (err, files)=>{
        res.render('index', {files: files})
    })
})

app.post('/create', (req, res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        res.redirect('/')
    })
})

app.listen(3000, ()=>{
    console.log('Server is running at port 3000')
})