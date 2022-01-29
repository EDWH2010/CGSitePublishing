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

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port:3306,
    password:'servant2697950',
    database:'cgsitebase'
});


connection.connect(function(err){
    if(err){
        throw err;
    }
    console.log('connected');
});



app.engine('ejs',ejs.renderFile);

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/',chatRoot);
app.use('/',rogRoot);


app.get('/', (req, res) => {
    console.log('Protocals : '+req.protocol);
    console.log('moved to ' + req.url);

    const sql = 'select * from account';
    connection.query(sql,(err,result,fields)=>{
        if(err) throw err;

        console.log(result);
    });

    res.render('./index.ejs');
});


app.get('/index.ejs', (req, res) => {
    console.log('Protocals : '+req.protocol);
    console.log('moved to ' + req.url);
   res.render('./index.ejs');
});

/*
app.get('/rogin.ejs',(req,res)=>{
    console.log('moved to ' + req.url);
    res.render('./rogin.ejs');
})

app.get('/newMemAdded.ejs',(req,res)=>{
     console.log('moved to ' + req.url);
    res.render('./newMemAdded.ejs');
});

*/


/*
app.get('/chatRoom.ejs',(req,res)=>{
     console.log('moved to ' + req.url);
    res.render('./chatRoom.ejs');
});
app.get('/chatRoomCreatedPage.ejs',(req,res)=>{
     console.log('moved to ' + req.url);
    res.render('./chatRoomCreatedPage.ejs');
});

*/


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

