const express = require('express'),
firebase_admin = require('firebase-admin'),
admin_acc = require(__dirname+'/cryptoAdmin.json'),
fs = require('fs'),
crypto = require('crypto'),
msg_ctrl = require('./controllers/msg'),
nav_ctrl = require('./controllers/nav'),
usr_ctrl = require('./controllers/user');

firebase_admin.initializeApp({
    credential : firebase_admin.credential.cert(admin_acc),
    databaseURL : 'https://crypto-df61c.firebaseio.com/'
})

const db = firebase_admin.database();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

msg_ctrl(app,db);
nav_ctrl(app);
usr_ctrl(app,db);
app.listen(3000);

console.log('Server is running.');
