const  express = require('express');
const mysql = require('mysql');
const path = require('path');
const url = require('url');
const bodyParse = require('body-parser');

const http = require('http');

const app = express();
const server = http.createServer(app);

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port:3306,
    password:'servant2697950',
    database:'cgsitebase'
});

connection.connect(function(err){
    console.error(err);
});

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (req, res) => {
    console.log('Protocals : '+req.protocol);
    console.log('moved to ' + req.url);
    res.sendFile(__dirname + '/index.html');
});


app.get('/index.html', (req, res) => {
    console.log('Protocals : '+req.protocol);
    console.log('moved to ' + req.url);
    res.sendFile(__dirname + '/index.html');
});

app.get('/rogin.html',(req,res)=>{
    console.log('moved to ' + req.url);
    res.sendFile(__dirname + '/rogin.html');
})

app.get('/newMemAdded.html',(req,res)=>{
     console.log('moved to ' + req.url);
    res.sendFile(__dirname + '/newMemAdded.html');
});

app.get('/chatRoom.html',(req,res)=>{
     console.log('moved to ' + req.url);
    res.sendFile(__dirname + '/chatRoom.html');
});
app.get('/chatRoomCreatedPage.html',(req,res)=>{
     console.log('moved to ' + req.url);
    res.sendFile(__dirname + '/chatRoomCreatedPage.html');
});
app.get('/referPage.html',(req,res)=>{
     console.log('moved to ' + req.url);
    res.sendFile(__dirname + '/referPage.html');
});
app.get('/RigisterSuccess.html',(req,res)=>{
     console.log('moved to ' + req.url);
    res.sendFile(__dirname + '/RigisterSuccess.html');
});
app.get('/UserProperty.html',(req,res)=>{
     console.log('moved to ' + req.url);
    res.sendFile(__dirname + '/UserProperty.html');
});
app.get('/watchPage.html',(req,res)=>{
     console.log('moved to ' + req.url);
    res.sendFile(__dirname + '/watchPage.html');
});
app.get('/workUploadPage.html',(req,res)=>{
     console.log('moved to ' + req.url);
    res.sendFile(__dirname + '/workUploadPage.html');
});


app.listen(3000,()=>{
    console.log('server running on port 3000');
});

