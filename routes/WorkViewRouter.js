
const router = require('express').Router();
const hasha = require('hasha');
const httpMsg = require('http-msgs');

const connector = require('../public/lib/backend/MysqlConnector.js');

router.get('/watchPage.ejs',(req,res)=>{
    console.log('moved to ' + req.url);
   res.render('./watchPage');
});

router.get('/workUploadPage.ejs',(req,res)=>{
    console.log('moved to ' + req.url);
   res.render('./workUploadPage');
});


router.post('/workUploadPage.ejs/upload',(req,res)=>{
    let data = req.body;
  
    res.send(data);
})
.post('/workUploadPage.ejs/upload/initInsert',(req,res)=>{
    if(req.body){
        
    }
});

router.post('/workUploadPage.ejs/inputEvent',(req,res)=>{
    let data = req.body;
    let sql = '';

    res.send(data);
});

router.get('/referPage.ejs',(req,res)=>{
   console.log('moved to ' + req.url);
   
  res.render('./referPage');
});

router.get('/referPage.ejs/:hname',(req,res)=>{
    console.log('moved to ' + req.url);

   res.render('./referPage?hname='+req.params.hname);
 });
 

router.post('/watchPage/work',(req,res)=>{
    let data = req.body;
    data.workName = hasha(data.workName);

    res.send(data);
    console.log(data);
})


module.exports = router;