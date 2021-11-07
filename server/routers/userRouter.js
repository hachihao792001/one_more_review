import express from 'express';
import User from '../models/User.js';
import argon2 from 'argon2';

const userRouter=express.Router();

userRouter.get('/',async(req,res)=>{
    try {
        const users=await User.find({});
        if(!users){
           return  res.status(400).json({success:false,message:'Users is empty'});
        }
        res.status(200).json({success:true,users:users});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Internal server error'});
    }
    
});

userRouter.post('/register',async(req,res)=>{
    const {username,password,name,image,age,gender,isAdmin,country,createdAt}=req.body;
    if(!username||!password)
        return res.status(400).json({success:false,message:"missing username or password"});
    const user =await User.findOne({username});
    if(user) // check if username is unique or not
        return res.status(400).json({success:false,message:'user already existed'});
    
    let hashedPassword;
    try {
         hashedPassword=await argon2.hash(password);
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false,message:"password is not hashed"});
    }
    
    const newUser=new User({username,password:hashedPassword,name,image,age,gender,isAdmin,country,createdAt});
    try {
        await newUser.save();
        
    } catch (error) {
        return res.status(400).json({success:false,message:"error at inserting user"});
        
    }

    return res.status(200).json({message:true,user:newUser});


})

export default userRouter;