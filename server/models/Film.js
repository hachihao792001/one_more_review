import mongoose from 'mongoose';


const filmSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    eng_name:{
        type:String,
        required:true,
        default:"english name",
    },
    type:{
        type:Boolean, // le hoac bo
        required:true,
        default:false,
    },
    gene:{
        type:String,  // the loai :tinh cam,kinh di,...
        default:"actions"
    },
    country:{
        type:String,
        required:true,
        default:"Viet Nam",
    },
    description:{
        type:String,
        default:"",
        maxlength:10000,
    },
    actors:{
        type:String,
        default:'',

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
    status:{
        type:String,
        default:'HD Vietsub',
    },
    director:{
        type:String,
        default:"Lee Quang"
    },
    duration:{
        type:String,
        default:"90"
    },
    year:{
        type:Number,
        default:2021
    },
    img:{
        type:String,
        default:"https://www.ssphim.net/static/5fe2d564b3fa6403ffa11d1c/61a0e3157e072c580d171d1e_phong-than-dat-ky.jpg"
    },
    poster:{
        type:String,
    },
    trailer: {
        type:String,
    },
	reviewChannel:{
        type:String,
    }


   
});


const Film=mongoose.model('Film',filmSchema);
export default Film;