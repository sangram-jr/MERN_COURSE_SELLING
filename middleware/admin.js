const jwt=require('jsonwebtoken');
const JWT_SECRET_admin=process.env.JWT_SECRET_ADMIN;


//verify the token
const adminAuthMiddleware=(req,res,next)=>{
    const token=req.headers.authorization;
    const word=token.split(" ");
    const exactToken=word[1];//because we send Bearer ashaiwh4i3htkhwiut6 --> so token in the 1st index
    
    const response=jwt.verify(exactToken,JWT_SECRET_admin);
    if(response.adminId){
        req.adminId=response.adminId; //fetched from jwt.sign method and set it to req.adminId
        next();
    }else{
        res.status(403).json({msg:"token is not verified"});
    }

}

module.exports={
    adminAuthMiddleware
}