
const router = require('express').Router();
const hasha = require('hasha');
const httpMsg = require('http-msgs');

const connector = require('../public/lib/backend/MysqlConnector.js');

router.get('/watchPage.ejs',(req,res)=>{
    console.log('moved to ' + req.url);
   res.render('./watchPage');
});

router.post('/watchPage.ejs/initInsert',(req,res)=>{
    let sql = 'INSERT INTO workitem (WorkName,WorkDiscription,WorkSource) VALUES ?';
    if(req.body){
        let array = [];
        let wArr = [];
        req.body.forEach(function(data,index){
            array.push(data);
            wArr[index] = [];

            wArr[index].push(data.workName);
            wArr[index].push(data.workDiscription);
            wArr[index].push(data.workSource);
        });

        connector.query(sql,[wArr],function(err,results){
            if(err) throw err;
        });

        res.send(array);
    }
});

router.post('/watchPage.ejs/inputEvent',(req,res)=>{
    if(req.body){
        let data = req.body;
        let sql = 'SELECT * FROM workitem WHERE Id BETWEEN ? AND ?';

        connector.query(sql,[data.first,data.last],function(err,result){
            if(err) throw err;
            res.send(result);
            return;
        });
    }
  

    res.send(data);
});


router.post('/watchPage.ejs/select',(req,res)=>{
    let data = req.body;
    let sql = '';

    if(req.body){

    }
   

    res.send(data);
});

router.post('/watchPage/work',(req,res)=>{
    let data = req.body;
    data.workName = hasha(data.workName);

    res.send(data);
    console.log(data);
})

router.get('/workUploadPage.ejs',(req,res)=>{
    console.log('moved to ' + req.url);
   res.render('./workUploadPage');
});


router.post('/workUploadPage.ejs/upload',(req,res)=>{
    let data = req.body;
  
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
 


module.exports = router;