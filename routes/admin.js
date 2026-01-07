const {Router, json}=require('express');
const { userModel, adminModel, courseModel } = require('../db');
const adminRouter=Router();
const jwt=require("jsonwebtoken");
const { adminAuthMiddleware } = require('../middleware/admin');
const JWT_SECRET_admin=process.env.JWT_SECRET_ADMIN;




//admin sign up
adminRouter.post('/signup',async(req,res)=>{

    const username=req.body.username;
    const password=req.body.password;
    try {
        await adminModel.create({
            username:username,
            password:password
        });
        res.status(200).json({msg:"Admin created successfully "});
    } catch (error) {
        res.status(500).json({msg:"error occur in admin /signup endpoint",error});
    }
    
});



//admin sign in
adminRouter.post('/login',async (req,res)=>{

    const username=req.body.username;
    const password=req.body.password;

    try {
        const foundAdmin=await adminModel.findOne({
            username:username,
            password:password
        });
        if(foundAdmin){
            const token=jwt.sign({
                adminId:foundAdmin._id
            },JWT_SECRET_admin)
            res.status(200).json({
                msg:"Logged in successfully",
                token:token
            });
        }else{
            res.status(403).json({msg:"Admin not found"});
        }
    } catch (error) {
        res.status(500).json({msg:"error occur in admin /login endpoint",error});
    }        
});





//create course
adminRouter.post('/courses',adminAuthMiddleware,async(req,res)=>{

    const adminId=req.adminId;//get from adminAuthMiddleware
    
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const imageLink=req.body.imageLink;
    const published=req.body.published;

    try {
       //verify the admin
        const verifiedAdmin=await adminModel.findOne({
            _id:adminId
        });
        if(verifiedAdmin){
            const createCourse=await courseModel.create({
                title:title,
                description:description,
                price:price,
                imageLink:imageLink,
                published:published
            });
            res.status(200).json({msg:"Course created successfully",courseId:createCourse._id});
        }else{
            res.status(403).json({msg:"Admin not found from /courses -->post method"});
        } 
    } catch (error) {
        res.status(500).json({msg:"error occur in admin /courses ->post endpoint",error});
    }

    

})




//update course
adminRouter.put('/courses/:courseId',adminAuthMiddleware,async(req,res)=>{
    const adminId=req.adminId;//get from adminAuthMiddleware
    const courseId=req.params.courseId;//get form route

    const title=req.body.title;//get from body
    const description=req.body.description;
    const price=req.body.price;
    const imageLink=req.body.imageLink;
    const published=req.body.published;

    try{
        //verify the admin
        const verifiedAdmin=await adminModel.findOne({
            _id:adminId
        });
        if(verifiedAdmin){
            const filter={_id:courseId};//in courseModel -> where _id is equal to courseId
            const update={
                title:title,
                description:description,
                price:price,
                imageLink:imageLink,
                published:published
            }
            await courseModel.findOneAndUpdate(filter,update,{
                new:true
            });
            res.json({msg:"Course updated successfully"});
        }else{
            res.status(403).json({msg:"Admin not found from /courses/:courseId -->put method"});
        }
    }catch(error){
        res.status(500).json({msg:"error occur in admin /courses/:courseId ->put endpoint",error});
    }
    
    
})




//get all the course
adminRouter.get('/courses',adminAuthMiddleware,async(req,res)=>{
    const adminId=req.adminId;//get from adminAuthMiddleware

    try {
       //verify the admin
        const verifiedAdmin=await adminModel.findOne({
            _id:adminId
        });
        if(verifiedAdmin){
            const response=await courseModel.find({});
            res.json({courses:response});
        }else{
            res.status(403).json({msg:"Admin not found from /courses -->get method"});
        } 
    } catch (error) {
        res.status(500).json({msg:"error occur in admin /courses ->get endpoint",error});
    }

    
});




module.exports={
    adminRouter
};