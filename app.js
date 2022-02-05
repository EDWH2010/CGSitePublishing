const  express = require('express');
const mysql = require('mysql');
const path = require('path');
const url = require('url');

const ejs = require('ejs');

const http = require('http');

const chatRoot = require('./routes/ChatRoomSetting.js');
const rogRoot = require('./routes/RogInOutRoute.js');

const app = express();
const server = http.createServer(app);

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
    res.render('./index.ejs',{like:3});
});

app.get('/index.ejs', (req, res) => {
    console.log('Protocals : '+req.protocol);
    console.log('moved to ' + req.url);
   res.render('./index.ejs');
});


app.get('/referPage.ejs',(req,res)=>{
     console.log('moved to ' + req.url);
    res.render('./referPage.ejs');
});
app.get('/RigisterSuccess.ejs',(req,res)=>{
     console.log('moved to ' + req.url);
    res.render('./RigisterSuccess.ejs');
});

app.get('/UserProperty.ejs',(req,res)=>{
     console.log('moved to ' + req.url);
    res.render('./UserProperty.ejs');
});
app.get('/watchPage.ejs',(req,res)=>{
     console.log('moved to ' + req.url);
    res.render('./watchPage.ejs');
});
app.get('/workUploadPage.ejs',(req,res)=>{
     console.log('moved to ' + req.url);
    res.render('./workUploadPage.ejs');
});



server.listen(3000,()=>{
    console.log('server running on port 3000');
});

