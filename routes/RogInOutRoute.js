const router = require('express').Router();



router.get('./rogin.ejs',(req,res)=>{
    console.log('move to roginPage');
    res.render('./rogin.ejs');
}).get('./newMemAdded.ejs',(req,res)=>{
    console.log('move to newMemAddedPage');
    res.render('./newMemAdded.ejs');
});


module.exports = router;