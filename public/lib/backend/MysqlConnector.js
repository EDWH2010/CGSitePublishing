const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port:3306,
    password:'servant2697950',
    database:'cgsitebase'
});


module.exports = connection;