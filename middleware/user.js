const jwt=require('jsonwebtoken');
const JWT_SECRET_user=process.env.JWT_SECRET_USER;
console.log(JWT_SECRET_user);


//verify the token
const userAuthMiddleware=(req,res,next)=>{
    const token=req.headers.authorization;
    const word=token.split(" ");
    const exactToken=word[1];
    const verifiedToken=jwt.verify(exactToken,JWT_SECRET_user);
    if(verifiedToken){
        req.userId=verifiedToken.userId;
        next();
    }else{
        res.json({msg:"token is not verified"});
    }
};

module.exports={
    userAuthMiddleware
}