import mongoose, { mongo } from 'mongoose';

const reviewSchema=new mongoose.Schema({
    filmName:{
        type:String,
        required:true,
        default:"anonymous",
    },
    userName:{
        type:String,
        required:true,
        default:'anonymous',
    },
    idFilm:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Film',
        required:true,

    },
    idUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },

    content:{
        type:String,
        required:true,
        default:"",
        maxlength:1000,
    },
    rating:{
        type:Number,
        required:true,
        default:0,
        min:0, 
        max:5,
    },
    createdAt: {
        type: Number,
        default: new Date().getTime(),
      },
});

const Review =mongoose.model('Review',reviewSchema);
export default Review;