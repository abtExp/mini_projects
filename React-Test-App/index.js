const express = require('express'),
fs = require('fs'),
path = require('path'),
app = express();

app.get('/',(req,res)=>{
    fs.createReadStream(path.resolve(__dirname,'./index.html'))
    .pipe(res);
});

app.get(/\/build\/([a-zA-Z0-9]*(\.[a-zA-Z0-9]*)*)\.js$/,(req,res)=>{
    console.log(req.url);
    fs.createReadStream(path.resolve(`${__dirname}${req.url}`))
    .pipe(res);
})

console.log('Now Serving At 8080');

app.listen(8080);