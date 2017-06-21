const express = require('express');
const firebase_admin = require('firebase-admin');
const admin_acc = require(__dirname+'/cryptoAdmin.json');

const msg_ctrl = require('./controllers/msg');
const nav_ctrl = require('./controllers/nav');
const usr_ctrl = require('./controllers/new_user');

firebase_admin.initializeApp({
    credential : firebase_admin.credential.cert(admin_acc),
    databaseURL : 'https://crypto-df61c.firebaseio.com/'
})

const db = firebase_admin.database();

const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));

msg_ctrl(app,db);
nav_ctrl(app);
usr_ctrl(app,db);
app.listen(3000);

console.log('Server is running.');
