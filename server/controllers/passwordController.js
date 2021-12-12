import Token from '../models/Token.js';
import cryptoRandomString from 'crypto-random-string';
import sendEmail from '../config/sendEmail.js'
import User from '../models/User.js';
import { generateToken } from '../config/genarateToken.js';
import agron2 from 'argon2';
export const sendLink=async(req,res)=>{
    try {

        const user = await User.findOne({ username: req.body.username });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: generateToken(),
                
                
            })
        }
        await token.save()
        const link = `${process.env.BASE_URL}/reset-password/${user._id}/${token.token}`;
        await sendEmail(user.username, "Password reset",link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}

export const resetPassword=async(req,res)=>{
    try {
       
        const user = await User.findById(req.params.id);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = await agron2.hash(req.body.password);
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}