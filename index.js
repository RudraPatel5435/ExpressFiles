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


app.get('/file/:filename', (req, res)=>{
    fs.readFile(`./files/${req.params.filename}`, "utf-8",(err, filedata)=>{
        res.render("show", {title: req.params.filename, details: filedata})
    })
})

app.post('/create', (req, res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join(' ')}.txt`, req.body.details, function(err){
        res.redirect('/')
    })
})

app.get('/edit/:filename', (req, res)=>{
        res.render('edit', {Prevtitle: req.params.filename})
})

app.post('/edit', (req, res)=>{
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, (err)=>{
        res.redirect('/')
    })
})

app.listen(3000, ()=>{
    console.log('Server is running at port 3000')
})