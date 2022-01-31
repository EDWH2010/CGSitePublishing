const router = require('express').Router();


router.get('/rogin.ejs',(req,res)=>{
    console.log('move to roginPage');
    res.render('./rogin.ejs');

}).get('/newMemAdded.ejs',(req,res)=>{
    console.log('move to newMemAddedPage');
    res.render('./newMemAdded.ejs');
});

router.get('/RigisterSuccess.ejs',(req,res)=>{
    console.log('move to RigisterSuccessPage');
    res.render('./RigisterSuccess.ejs');
});


module.exports = router;