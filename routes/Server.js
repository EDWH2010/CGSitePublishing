const  express = require('express');
const http = require('http');
const path = require('path');

const port = process.env.PORT || 3000;

const app = express();

const server = http.createServer(app);

/*
const io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    socket.emit('greeting', {message: 'hello'}, function (data) {
      console.log('result: ' + data);
    });
 });
 
*/

server.listen(port,()=>{
   // console.log(process.env);
    console.log('server running on port 3000');
});

module.exports = {
    App:app,
    Server:server
};