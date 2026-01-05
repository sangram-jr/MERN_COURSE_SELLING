const express=require('express');
const dotenv=require("dotenv");
const { userRouter } = require('./routes/user');
const { adminRouter } = require('./routes/admin');
dotenv.config();

const app=express();
app.use(express.json());//act as a body-parser


app.use('/user',userRouter);
app.use('/admin',adminRouter);



const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
    
});