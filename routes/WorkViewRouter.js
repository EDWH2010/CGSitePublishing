
const router = require('express').Router();
const hasha = require('hasha');
const httpMsg = require('http-msgs');


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
});

router.get('/referPage.ejs',(req,res)=>{
   console.log('moved to ' + req.url);
   /* if(req.query == null){
        console.log('null');
    }else{
        console.log(req.query.name);
    }
*/
  res.render('./referPage');
});

router.get('/referPage.ejs/:hname',(req,res)=>{
    console.log('moved to ' + req.url);

   res.render('./referPage?hname='+req.params.hname);
 });
 

router.post('/work',(req,res)=>{
    let data = req.body.jdata;
    res.render('referPage',JSON.parse(data));
    console.log(data);
})




module.exports = router;