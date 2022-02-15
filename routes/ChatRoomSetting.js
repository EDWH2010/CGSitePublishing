const route = require('express').Router();
const server = require('./Server.js').Server;

const io = require('socket.io')(server);

io.on('connection',socket=>{
    socket.send("Hello!");

    socket.emit("greeting",{"ms":"jane"},Buffer.from([4,3,2,1]));

    socket.on('message',(data)=>{
        console.log(data);
    });

    socket.on('salutation',(elem1,elem2,elem3)=>{
        console.log(elem1,elem2,elem3);
    });
    
});

route.get('/chatRoom.ejs',(req,res)=>{
    console.log('move to chatRoomPage'); 
    res.render('chatRoom');
});

route.get('/chatRoomCreatedPage.ejs',(req,res)=>{
    console.log('move to chatRoomCreatedPage');

    res.render('chatRoomCreatedPage');
});


module.exports = route;