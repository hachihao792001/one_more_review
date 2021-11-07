import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: "anonymous user",
  },
  image: {
    type: String,
    required: true,
    default:
      "https://scontent.fdad4-1.fna.fbcdn.net/v/t1.6435-1/p240x240/170037124_2893095897599822_5904461396917872750_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=7206a8&_nc_ohc=CgQfN9G0adAAX_apTgA&_nc_oc=AQmihWsQuJIU2Jh9t_3LmWnRT9rHsoc3G6DFm91LWq1e9hkkt2A7I5PNiEpLs3YNpQ4&_nc_ht=scontent.fdad4-1.fna&oh=37d2b1e76988afdd57af942086214886&oe=61AB8F4F",
  },

  age: {
    type: Number,
    min: 10,
    max: 100,
  },
  gender: {
    type: Boolean,
    default: true,
  },
  isAdmin:{
      type:Boolean,
      default:false,
  },
  country:{
      type:String,
      required:true,
      default:"Viet Nam",
      
  },
  createdAt: {
    type: Number,
    default: new Date().getTime(),
  },
});

const User=mongoose.model('User',userSchema);
export default User;