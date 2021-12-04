import Comment from '../models/Comment.js';

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
        const {idFilm,idUser,content}=req.body;
        const newCommnet=new Comment({idFilm,idUser,content});
        
        try {
            await newCommnet.save()
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
        if(!comment){
            return res.status(404).json({success:false,message:'comment not found'});
        }
        const deletedComment=await comment.remove();
        return res.status(200).json({success:true,message:'delete comment successfully',comment:deletedComment});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Internal server error'});

    }
}