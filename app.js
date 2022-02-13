const path = require('path');
const url = require('url');
const express = require('express');
const ejs = require('ejs');

const chatRoot = require('./routes/ChatRoomSetting.js');
const rogRoot = require('./routes/RogInOutRoute.js');

const app = require('./routes/Server.js');

app.engine('ejs',ejs.renderFile);

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/',chatRoot);
app.use('/',rogRoot);

const connector = require('./public/lib/backend/MysqlConnector.js');

app.get('/', (req, res) => {
    console.log('Protocals : '+req.protocol);
    console.log('moved to ' + req.url);
    res.render('./index',{like:3});
});

app.get('/index.ejs', (req, res) => {
    console.log('Protocals : '+req.protocol);
    console.log('moved to ' + req.url);
   res.render('./index');
});


app.get('/referPage.ejs',(req,res)=>{
     console.log('moved to ' + req.url);
    res.render('./referPage');
});
app.get('/RigisterSuccess.ejs',(req,res)=>{
     console.log('moved to ' + req.url);
    res.render('./RigisterSuccess');
});

app.get('/UserProperty.ejs',(req,res)=>{
     console.log('moved to ' + req.url);
    res.render('./UserProperty');
});
app.get('/watchPage.ejs',(req,res)=>{
     console.log('moved to ' + req.url);
    res.render('./watchPage');
});
app.get('/workUploadPage.ejs',(req,res)=>{
     console.log('moved to ' + req.url);
    res.render('./workUploadPage');
});

