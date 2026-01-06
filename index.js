const express=require('express');
const dotenv=require("dotenv");
const { userRouter } = require('./routes/user');
const { adminRouter } = require('./routes/admin');
const { connectToDatabase } = require('./db');
dotenv.config();

const app=express();
app.use(express.json());//act as a body-parser


app.use('/user',userRouter);
app.use('/admin',adminRouter);



const port=process.env.PORT || 3000;

connectToDatabase().then(()=>{
    app.listen(port,()=>{
        console.log(`Server running on port ${port}`);
        
    });
});


