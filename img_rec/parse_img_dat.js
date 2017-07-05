const vecto = require('vecto'),
path = require('path'),
fs = require('fs');

let img,
img_dat,
pixel_dat;

fs.createReadStream('C:/users/lmess/desktop/Capture1.png')
.on('data',dat=>{
    console.log(dat);
})