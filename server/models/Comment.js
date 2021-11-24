import mongoose from 'mongoose';

const commentSchema=new mongoose.Schema({
 
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
