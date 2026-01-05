const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const mongoUrl=process.env.MONGO_URL;

mongoose.connect(mongoUrl);



//schema
const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;

const adminSchema=new Schema({
    username:String,
    password:String
});

const userSchema=new Schema({
    username:String,
    password:String
});

const courseSchema=new Schema({
    title:String,
    description: String, 
    price: Number, 
    imageLink:String, 
    published: Boolean
});

const purchaseSchema=new Schema({
    userId:ObjectId,
    courseId:ObjectId
});

//model
const userModel=mongoose.model('users',userSchema);
const adminModel=mongoose.model('admin',adminSchema);
const courseModel=mongoose.model('course',courseSchema);
const purchaseModel=mongoose.model('purchases',purchaseSchema);



module.exports={
    userModel,
    adminModel,
    courseModel,
    purchaseModel

}

