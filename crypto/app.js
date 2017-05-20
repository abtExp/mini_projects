var express = require('express');
var msg_ctrl = require('./controllers/msg');
var nav_ctrl = require('./controllers/nav');

var admin = require('firebase-admin');

var serviceAcc = require('D:/cryptoAdmin.json');
admin.initializeApp({
  credential : admin.credential.cert(serviceAcc),
  databaseURL : 'https://crypto-df61c.firebaseio.com/'
})


var app = express();

app.set('view engine','ejs');
app.use(express.static('public'));

msg_ctrl(app,admin);
nav_ctrl(app);

app.listen(3000);

console.log('Server is running.');
