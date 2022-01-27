const  express = require('express');
const mysql = require('mysql');
const path = require('path');
const url = require('url');

const app = express();
/*const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'servant2697950',
    database:'CGSiteBase'
});

*/

app.use(express.static('public'));
app.use(express.json());


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

