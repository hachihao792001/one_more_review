import express from 'express';
import Film from '../models/Film.js';

import { isAuth,isAdmin } from '../middleware/auth.js';

const filmRouter=express.Router();


// Adding a film  (Create)
filmRouter.post('/',isAuth,isAdmin,async(req,res)=>{
       
    try {
        const {name,type,gene,country,isCinema,description,actors,avgRating,url}=req.body;
        if(!name){
            return res.status(401).json({success:false,message:'missing film name'});
        }
        const film=await Film.findOne({name});
        if(film){
            return res.status(404).json({success:false,message:'film name is already existed'});

        }
        const newFilm=new Film({name,type,gene,country,isCinema,description,actors,avgRating,url});
        try {
            await newFilm.save();
        } catch (error) {
            console.log(error);
            return res.status(404).json({success:false,message:"error at creating film"});

        }
        return res.status(200).json({success:true,message:'Adding film successfully',film:newFilm});

    }catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Internal server error'});

    }
});

// Find the film by Id (Read)
filmRouter.get('/:id',isAuth,async(req,res)=>{
    try {
        const film=await Film.findById(req.params.id); // search by value _id in mongoose
        if(film){
            return res.status(200).json({success:true,message:'finding successfully',film:film});

        }
        return res.status(404).json({success:false,message:'Incorret Id'});

    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Internal server error'}); 
    }
})


//update Film
filmRouter.put('/:id',isAuth,isAdmin,async(req,res)=>{
    try {
        const film=await Film.findById(req.params.id);
        if(!film){
            return res.status(404).json({success:false,message:'Film not found'});
        }
        const {name,type,gene,country,isCinema,description,actors,avgRating,url,commentList,reviewList}=req.body;
        film.name=name||film.name;
        film.type=type||film.type;
        film.gene=gene||film.gene;
        film.country=country||film.country;
        film.isCinema=isCinema||film.isCinema;
        film.description=description||film.description;
        film.actors=actors||film.actors;
        film.avgRating=avgRating||film.avgRating;
        film.url=url||film.url;
        film.commentList=commentList||film.commentList;
        film.reviewList=reviewList||film.reviewList;
        let updatedFilm=null;
       try {
            updatedFilm=await film.save();  //  check If the name is unique?
       } catch (error) {
           console.log(error);
           return res.status(404).json({success:false,message:'Name must be unique'});
       }
        
        return res.status(200).json({success:true,message:'update film successfully',film:updatedFilm});

        
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Internal server error'});

    }
})

filmRouter.delete('/:id',isAuth,isAdmin,async(req,res)=>{
    try {
        const film=await Film.findById(req.params.id);
        if(!film){
            return res.status(404).json({success:false,message:'film not found'});
        }
        const deletedFilm=await film.remove();
        return res.status(200).json({success:true,message:'delete successfully',film:deletedFilm});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Internal server error'});

    }
});

// find film by name
filmRouter.get('/:name',isAuth,async(req,res)=>{
    try {
        const film=await Film.findOne({name:req.params.name}); // find the Film with name
        if(film){
            return res.status(200).json({success:true,message:'find successfully',film:film});

        }
        return res.status(401).json({success:false,message:'Incorrect film Name'});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Internal server error'});
    }
});

export default filmRouter;