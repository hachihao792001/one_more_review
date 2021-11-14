import mongoose from 'mongoose';

const commentSchema=new mongoose.Schema({
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
    createdAt: {
        type: Number,
        default: new Date().getTime(),
      },
});

const Comment=mongoose.model('Comment',commentSchema);
export default Comment;
