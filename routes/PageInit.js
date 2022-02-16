const fs = require('fs');
const router = require('express').Router();

router.post('/index.html',(req,res)=>{

    res.sendFile(path.join(__dirname,'index.html'),(err)=>{
        console.error(err);
    });

});

module.exports = router;