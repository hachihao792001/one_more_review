import Comment from '../models/Comment.js';
import Film from '../models/Film.js';

export const getComment=async(req,res)=>{
    try {
        const comment=await Comment.findById({_id:req.params.id});
        if(comment){
            return res.status(200).json({success:true,message:'finding successfully',comment});
        }
        else{
            return res.status(404).json({success:false,message:'comment not found'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Internal server error'});

    }
}

export const createComment=async(req,res)=>{
    try {
        const {idFilm,content}=req.body;
        const idUser=req.user._id;
        console.log(req.user)
        const newCommnet=new Comment({idFilm,idUser,content});
        
        try {
            await newCommnet.save()
            console.log(newCommnet)
            const films=await Film.find({})
            // console.log(films)
            for(let film of films){
                // console.log(film._id)
                // console.log(newCommnet.idFilm)
                if(film._id.toString()==newCommnet.idFilm.toString()){
                    console.log(film)
                    film.commentList.push(newCommnet._id)
                    await film.save();
                    break;
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(404).json({success:false,message:'insert fail'});
        }
        return res.status(200).json({success:true,message:'adding comment successfully',comment:newCommnet});

    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Internal server error'});
    }
}

export const updateComment=async(req,res)=>{
    try {
        const comment=await Comment.findById(req.params.id);
        
        if(comment){
            const {idFilm,idUser,content}=req.body;
            comment.idFilm=idFilm||comment.idFilm;
            comment.idUser=idUser||comment.idUser;
            comment.content=content||comment.content;

            const updatedComment=await comment.save();
           
            return res.status(200).json({success:true,message:'update successfully',comment:updatedComment});
        }
        else{
            return res.status(404).json({success:false,message:'Comment not found'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Internal server error'});

    }
}

export const deleteComment=async(req,res)=>{
    try {
        const comment=await Comment.findById(req.params.id);
        let film=await Film.findById(comment.idFilm);
        let arrComment=film.commentList;
        let resComment=[]
        console.log("comment ===");
        console.log(comment._id)
        for(let ele of arrComment){
            console.log("ele==")
            console.log(ele)
            if(ele.toString()!=comment._id.toString()){
                resComment.push(ele)
            }
        }
        console.log(resComment)
        if(!comment){
            
            return res.status(404).json({success:false,message:'comment not found'});
        }
        const deletedComment=await comment.remove();
        film.commentList=resComment;
        await film.save();
        return res.status(200).json({success:true,message:'delete comment successfully',comment:deletedComment});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Internal server error'});

    }
}
