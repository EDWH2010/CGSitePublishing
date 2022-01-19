const  express = require('express');
const mysql = require('mysql');
const path = require('path');

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
    console.log('index page now');
    console.log('headers : ' + req.headers);
    console.log('Protocals : '+req.protocol);

    res.sendFile(__dirname + '/index.html');
});



app.get('/rogin',(req,res)=>{
    res.sendFile(__dirname + '/rogin.html');
})

app.get('/newMemAdded',(req,res)=>{
    res.sendFile(__dirname + '/newMemAdded.html');
});

app.listen(3000,()=>{
    console.log('server running on port 3000');
});

