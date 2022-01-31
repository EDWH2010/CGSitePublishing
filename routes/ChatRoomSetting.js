const route = require('express').Router();

const io = require('socket.io');

route.get('/chatRoom.ejs',(req,res)=>{
    console.log('move to chatRoomPage'); 
});

route.get('/chatRoomCreatedPage.ejs',(req,res)=>{
    console.log('move to chatRoomCreatedPage');
});


module.exports = route;