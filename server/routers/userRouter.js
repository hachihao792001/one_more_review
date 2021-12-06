import express from 'express';
import {isAuth,isAdmin} from '../middleware/auth.js'
const userRouter=express.Router();
import {getUsers,registerUser,loginUser,getUser,updateUser,deleteUser,searchUser} from '../controllers/UserController.js'

userRouter.get('/users',isAuth,getUsers);
userRouter.post("/register", registerUser);
userRouter.get('/search',isAuth,isAdmin,searchUser)
userRouter.post('/login',loginUser);
userRouter.get('/:id',isAuth,getUser);
userRouter.put('/:id',isAuth,updateUser)
userRouter.delete('/:id',isAuth,isAdmin,deleteUser)



export default userRouter;