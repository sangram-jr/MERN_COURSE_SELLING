const {Router}=require('express');
const userRouter=Router();


userRouter.get('/gg',(req,res)=>{
    res.json({msg:"testing"});
});

module.exports={
    userRouter
};