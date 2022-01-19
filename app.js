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





app.listen(3000,()=>{
    console.log('server running on port 3000');
});

