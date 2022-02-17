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
   // connector.query()
 //  connector.connect();
   let data = req.body;
   /*
    const sData = {};
    sData.Result = 'OK You';
    sData.userName = data.userName;
   res.send(sData);*/
   let sData = {};
   connector.query(`SELECT * FROM accounts WHERE Account=${data.userName} AND 
   PassWord=${data.password}`
   ,function(err,result,fields){
        if(err) throw err;
        res.send(result[0]);
    }
   );

   connector.end();

}).post('/newMemAdded.ejs/:id',(req,res)=>{
   // res.send(req.body);
/*
    connector.connect(function(err){
        console.error(err);
    });
    */
    connector.query('SELECT * from accounts',function(err,result,fields){
        if(err) throw err;

        res.send(result[0]);
    });
  

   

});

router.get('/RigisterSuccess.ejs',(req,res)=>{
    console.log('move to RigisterSuccessPage');
    res.render('./RigisterSuccess');
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


module.exports = router;