const router = require('express').Router();
const connector = require('../public/lib/backend/MysqlConnector.js');

router.get('/rogin.ejs',(req,res)=>{
    console.log('move to roginPage');
    res.render('./rogin');

}).get('/newMemAdded.ejs',(req,res)=>{
    console.log('move to newMemAddedPage');
    res.render('./newMemAdded');
});

router.post('/rogin.ejs/:id',(req,res)=>{
    
   let data = req.body;
   data.exists = false;

   connector.query(`SELECT * FROM accounts WHERE UserName=? AND 
   PassWord=?`,[data.userName,data.password]
   ,function(err,result){
        if(err) throw err;
        if(result[0]){
            data.exists = true;
        }
        res.send(data);
    }
   );
   
}).post('/newMemAdded.ejs/:id',(req,res)=>{
   // res.send(req.body);
/*
    connector.connect(function(err){
        console.error(err);
    });
    */
   let sData = req.body;
   sData.exists = false;

   connector.query('SELECT Account,UserName FROM accounts WHERE Account=? OR UserName=?',[sData.email,sData.name],
    function(err,result){
        if(err) throw err;

        if(result.length == 0){
            connector.query(`INSERT INTO accounts (Account,UserName,PassWord) VALUES (?,?,?)`,[sData.email,sData.name,sData.pass],
            function(err,result){
                if(err){
                    console.error(err);
                }
                sData.exists=true;
                res.send(sData);
            });
        }else{
            res.send(sData);
        }
   });
   
});

router.get('/RigisterSuccess.ejs',(req,res)=>{
    console.log('move to RigisterSuccessPage');
    let lCount = 0;
    if(req.query){
        console.log(req.query.lastCount);
        lCount = typeof req.query.lastCount !== 'undefined' ? parseInt(req.query.lastCount) : 10; 
   }
    res.render('./RigisterSuccess',{lastCount:lCount});
});


router.get('/RigisterSuccess.ejs/:type',(req,res)=>{
    let type = req.params.type;
    let msg = '';

    console.log('move to RigisterSuccessPage Type : ' + type);
    if(type === 'rogin'){
        msg = 'ログイン';
    }else if(type === 'rigister'){
        msg = '登録';
    }

    res.render('RigisterSuccess',{Type:type,Message:msg});
});


router.get('/UserProperty.ejs',(req,res)=>{
    console.log('moved to ' + req.url);
    if(req.query){

    }
   res.render('./UserProperty');
});

module.exports = router;