const path = require('path');
const url = require('url');
const express = require('express');
const ejs = require('ejs');

const hasha = require('hasha');

const InitRoot = require('./routes/PageInit.js');
const chatRoot = require('./routes/ChatRoomSetting.js');
const rogRoot = require('./routes/RogInOutRoute.js');
const wViewRoot = require('./routes/WorkViewRouter.js');

const pool = require('./public/lib/backend/MysqlConnectorPool.js');

const app = require('./routes/Server.js').App;

app.engine('ejs',ejs.renderFile);

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/',InitRoot);
app.use('/',chatRoot);
app.use('/',rogRoot);
app.use('/',wViewRoot);

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

app.get('/index.ejs/:username',(req,res)=>{
    console.log('moved to ' + req.url);

    res.render('./index',req.params);
})

app.get('/RigisterSuccess.ejs',(req,res)=>{
     console.log('moved to ' + req.url);
    res.render('./RigisterSuccess');
});

app.get('/UserProperty.ejs',(req,res)=>{
     console.log('moved to ' + req.url);
    res.render('./UserProperty');
});

