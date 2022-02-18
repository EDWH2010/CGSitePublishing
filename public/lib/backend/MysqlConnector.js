const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port:3306,
    password:'',
    database:'hew2022_11059'
});

connection.connect(function (err){
    console.error('Is MsqlConnection Problem? : ' + err);

    if(!err){
        connection.query('SELECT * FROM accounts',function(err,rows){
            rows.forEach((e)=>{
                console.log(e);
            })
        })
    }
});


module.exports = connection;