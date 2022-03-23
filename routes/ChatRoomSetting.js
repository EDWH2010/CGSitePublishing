const route = require('express').Router();
const server = require('./Server.js').Server;

const socketIO = require('socket.io');
const io = socketIO(server);

route.get('/chatRoom.ejs',(req,res)=>{
    console.log('move to chatRoomPage'); 
    res.render('chatRoom');


    io.on("connection", socket => {
        socket.on("disconnenpmcting", () => {
          console.log(socket.rooms); // the Set contains at least the socket ID
        });
      
        socket.on("disconnect", () => {
          // socket.rooms.size === 0
        });
      });

});


route.get('/chatRoom.ejs/:id',(req,res)=>{
    console.log(`move to chatRoomPage id : ${req.params.id}`);
    if(req.params){
        
    }

    io.on('connect',socket=>{
        socket.send("Hello!");
        console.log(`io connection : ${req.params.id}`); 
    });

    res.render('chatRoom',{id:req.params.id});
});


route.get('/chatRoomCreatedPage.ejs',(req,res)=>{
    console.log('move to chatRoomCreatedPage');

    res.render('chatRoomCreatedPage');
});


module.exports = route;