const jwt=require('jsonwebtoken');
const {Router}=require('express');
const { userModel, courseModel, purchaseModel } = require('../db');
const { userAuthMiddleware } = require('../middleware/user');
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


//get all the course
userRouter.get('/courses',userAuthMiddleware,async(req,res)=>{

    const response=await courseModel.find({});
    if(!response){
        res.status(403).json({msg:"you r not verified"});
    }
    res.json({courses:response});
});




//user purchase the course
userRouter.post('/courses/:courseId',userAuthMiddleware,async(req,res)=>{

    const courseId=req.params.courseId;//get form route
    const userId=req.userId;//get from userAuthMiddleware function

    const response=await purchaseModel.create({
        userId:userId,
        courseId:courseId
    });
    res.status(200).json({msg:"Course Purchased Successfully"});

});


module.exports={
    userRouter
};