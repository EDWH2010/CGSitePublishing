const  express = require('express');
const http = require('http');

const port = process.env.PORT || 3000;

const app = express();
app.listen(port,()=>{
    console.log('server running on port 3000');
});

const server = http.createServer(app);

module.exports = app;