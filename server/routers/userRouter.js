import express from 'express';
import User from '../models/User.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

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


userRouter.post('/login',async(req,res)=>{
    try {
        const {username,password}=req.body;
        if(!username||!password){
            return res.status(400).json({success:false,message:"missing username or password"});
        }

        const user=await User.findOne({username});  // get user from database with username
        if(user&&argon2.verify(user.password,password)){
            const token=jwt.sign({
                userId:user._id
            },process.env.ACCESS_TOKEN);
            
            return res.status(200).json({success:true,message:"login successfully",token});

        }
        else{
            return res.status(400).json({success:false,message:"incorrect username or pasword"});
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:'Internal server Error'});
        
    }
});

export default userRouter;