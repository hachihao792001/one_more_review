import express from 'express';
import User from '../models/User.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import {genarateToken,isAuth,isAdmin} from '../middleware/auth.js'

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

userRouter.post("/register", async (req, res) => {
  const {
    username,
    password,
    name,
    image,
    age,
    gender,
    isAdmin,
    country,
    createdAt,
  } = req.body;
  if (!username || !password)
    return res
      .status(401)
      .json({ success: false, message: "missing username or password" });
  const user = await User.findOne({ username });
  if (user)
    // check if username is unique or not
    return res
      .status(404)
      .json({ success: false, message: "user already existed" });

  let hashedPassword;
  try {
    hashedPassword = await argon2.hash(password);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ success: false, message: "password is not hashed" });
  }

 
  const newUser = new User({
    username,
    password: hashedPassword,
    name,
    image,
    age,
    gender,
    isAdmin,
    country,
    createdAt,
  });
  try {
    await newUser.save();
    const access_token=genarateToken(newUser);
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "error at inserting user" });
  }

  return res.status(200).json({ message: true, user: newUser,access_token });
});


userRouter.post('/login',async(req,res)=>{
    try {
        const {username,password}=req.body;
        if(!username||!password){
            return res.status(404).json({success:false,message:"missing username or password"});
        }

        const user=await User.findOne({username});  // get user from database with username
        if(user&&argon2.verify(user.password,password)){
            const token=jwt.sign({
                userId:user._id
            },process.env.ACCESS_TOKEN);
            
            return res.status(200).json({success:true,message:"login successfully",token});

        }
        else{
            return res.status(404).json({success:false,message:"incorrect username or pasword"});
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:'Internal server Error'});
        
    }
});


// get specific user
userRouter.get('/:id',isAuth,async(req,res)=>{
    try {
        const user=await User.findById(req.params.id);
        const access_token=genarateToken(user);
        if(user){
            return res.json({success:true,message:"get user successfully",user:user,access_token});
        }
        return res.status(404).json({success:false,message:'incorrect id',user:user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:'Internal server Error'});
    }
})


//update user
userRouter.put('/:id',isAuth,async(req,res)=>{
    try {
        const user=await User.findById(req.params.id);
        if(user){
            const {password,name,image,age,gender,isAdmin,country}=req.body;
            // chuyen sang argon2
            user.name=name||user.name;
            user.age=age||user.age;
            user.gender=gender||user.gender;
            user.isAdmin=isAdmin||user.isAdmin;
            user.country=country||user.country;
            user.image=image||user.image;
            if(password){
                user.password=argon2.hash(password);
            }
            
            const updatedUser=await user.save();
            return res.status(200).json({success:true,message:'update successfully',user:updatedUser});


        }
        else{
            return res.status(404).json({success:false,message:'User not found'});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:'Internal server Error'});
    }
});

userRouter.delete('/:id',isAuth,isAdmin,async(req,res)=>{
    try {
        const user=await User.findById(req.params.id);
        if(user){
            if(user.username=='admin@gmail.com'){  // admin VIP can not deleted
                return res.status(400).json({success:false,message:'can not delete admin'});
            }
            const deletedUser=await user.remove();
            return res.status(200).json({success:true,message:'delete user successfully',user:deletedUser});
        }
        else{
            return res.status(404).json({success:false,message:'User not found'});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:'Internal server Error'});
    }
});


export default userRouter;