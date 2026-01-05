const jwt=require('jsonwebtoken');
const {Router}=require('express');
const { userModel } = require('../db');
const userRouter=Router();
const JWT_SECRET_user=process.env.JWT_SECRET_user;




//admin sign up
userRouter.post('/signup',async(req,res)=>{

    const username=req.body.username;
    const password=req.body.password;
    try {
        await userModel.create({
            username:username,
            password:password
        });
        res.status(200).json({msg:"User created successfully "});
    } catch (error) {
        res.status(500).json({msg:"error occur in user /signup endpoint",error});
    }
    
});



//admin sign in
userRouter.post('/login',async (req,res)=>{

    const username=req.body.username;
    const password=req.body.password;

    try {
        const foundUser=await userModel.findOne({
            username:username,
            password:password
        });
        if(foundUser){
            const token=jwt.sign({
                userId:foundUser._id
            },JWT_SECRET_user)
            res.status(200).json({
                msg:"Logged in successfully",
                token:token
            });
        }else{
            res.status(403).json({msg:"User not found"});
        }
    } catch (error) {
        res.status(500).json({msg:"error occur in user /signup endpoint",error});
    }        
});

module.exports={
    userRouter
};