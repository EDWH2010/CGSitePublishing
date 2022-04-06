
const router = require('express').Router();
const hasha = require('hasha');
const httpMsg = require('http-msgs');

const fs = require('fs');
const path = require('path');

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


router.post('/watchPage.ejs/workTotalCount',(req,res)=>{
    let sql = 'SELECT * FROM workitem';
    connector.query(sql,function(err,results,fields){
        if(err) throw err;

        const data = {
            Results:results,
            Fields:fields
        };
        res.send(data);
    });

});

router.post('/watchPage.ejs/SearchWorkItem',(req,res)=>{
    if(req.body){
        let k = req.body.key;
        let sql = `SELECT * from workitem WHERE WorkName LIKE "%${k}%"`;

        connector.query(sql,[k],function(err,results){
            if(err) throw err;

            res.send(results);
        });
    }
});

router.post('/watchPage.ejs/select',(req,res)=>{
    let data = req.body;
    let sql = 'SELECT * FROM workitem WHERE Id BETWEEN ? AND ?';

    if(req.body){
        let first = req.body.first;
        let last = req.body.last;
       
        console.log("first value : " + first);
        console.log("last Value : " + last);
        
        connector.query(sql,[first,last],function(err,results){
            if(err) throw err;

            res.send(results);
        });
    }
   
});

router.post('/watchPage/work',(req,res)=>{
    let data = req.body;
    data.workName = hasha(data.workName);

    res.send(data);
    console.log(data);
});


router.get('/workUploadPage.ejs',(req,res)=>{
    console.log('moved to ' + req.url);
   res.render('./workUploadPage');
});

router.post('/workUploadPage.ejs/upload',(req,res)=>{
    let sql = '';
    let tArr = [];
    let type = '';
    if(req.body){
        let data = req.body;
        switch(data.DataType){
            case 'Object':
                type = 'Object';
                res.send(type);
                sql = 'INSERT INTO workitem (WorkName,WorkDiscription,WorkSource) VALUES (?,?,?)';
                connector.query(sql,[data.Result.workName,data.Result.workDiscription,data.Result.workSource],function(err,result){
                    if(err) throw err;
                });
                break;
            case 'Array':
                type='Array';
                res.send(type);
                 sql = 'INSERT INTO workitem (WorkName,WorkDiscription,WorkSource) VALUES ?';

                data.workArray.forEach((item,index)=>{
                    tArr[index] = [];

                    tArr[index].push(item.workName);
                    tArr[index].push(item.workDiscription);
                    tArr[index].push(item.workSource);
                });
                connector.query(sql,[tArr],function(err,result){
                    if(err) throw err; 
                });
                break;
            default:
                res.send(type);
                break;
        }
    }
});

router.post('/workUploadPage.ejs/testSaveFile',(req,res)=>{
    if(req.body){
        
    }
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