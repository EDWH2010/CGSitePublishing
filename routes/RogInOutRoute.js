const router = require('express').Router();


router.get('/rogin.ejs',(req,res)=>{
    console.log('move to roginPage');
    res.render('./rogin');

}).get('/newMemAdded.ejs',(req,res)=>{
    console.log('move to newMemAddedPage');
    res.render('./newMemAdded');
});

router.get('/RigisterSuccess.ejs',(req,res)=>{
    console.log('move to RigisterSuccessPage');
    res.render('./RigisterSuccess');
});


module.exports = router;