import mongoose from 'mongoose';


const filmSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },

    type:{
        type:Boolean, // le hoac bo
        required:true,
        default:false,
    },
    gene:{
        type:String,  // the loai :tinh cam,kinh di,...
    },
    country:{
        type:String,
        required:true,
        default:"Viet Nam",
    },
    isCinema:{
        type:Boolean,
        default:false,
    },
    description:{
        type:String,
        default:"",
        maxlength:10000,
    },
    actors:{
        type:[String],
        default:[],

    },
    avgRating:{
        type:Number,
        default:4,
    },
    url:{
        type:String,
        required:true,
        default:"https://youtube.com",
    },
    commentList:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Comment',
        default:[],
    },
    reviewList:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Review',
        default:[],
    },
    createdAt: {
        type: Number,
        default: new Date().getTime(),
      },
});


const Film=mongoose.model('Film',filmSchema);
export default Film;