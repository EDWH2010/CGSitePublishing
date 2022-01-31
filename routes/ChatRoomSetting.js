const route = require('express').Router();

const io = require('socket.io');

route.get('/chatRoom.ejs',(req,res)=>{
    console.log('move to chatRoomPage'); 
    res.render('chatRoom.ejs');
});

route.get('/chatRoomCreatedPage.ejs',(req,res)=>{
    console.log('move to chatRoomCreatedPage');

    res.render('chatRoomCreatedPage.ejs');
});


module.exports = route;