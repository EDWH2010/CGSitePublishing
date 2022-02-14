const route = require('express').Router();
const server = require('./Server.js').Server;

const io = require('socket.io')(server);


route.get('/chatRoom.ejs',(req,res)=>{
    console.log('move to chatRoomPage'); 
    res.render('chatRoom');
});

route.get('/chatRoomCreatedPage.ejs',(req,res)=>{
    console.log('move to chatRoomCreatedPage');

    res.render('chatRoomCreatedPage');
});


module.exports = route;