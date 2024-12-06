const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    res.render('index')
})


app.listen(3000, ()=>{
    console.log('Server is running at port 3000')
})