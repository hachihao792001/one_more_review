import jwt from 'jsonwebtoken';


export const genarateToken=user=>{
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      process.env.ACCESS_TOKEN,{
            expiresIn:'30d',
      },
      
    );
}

export const isAuth=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader&&authHeader.split(' ')[1];

    if(token==null) return res.status(401).json({success:false,message:'no token'});

    jwt.verify(token,process.env.ACCESS_TOKEN ,(err,decode)=>{
        if (err) return res.json({success:false,message:'Invalid token'});
        else{
            req.user = decode;
            next();
        }
           
    })
}

export const isAdmin =(req,res,next)=>{
  if(req.user&&req.user.isAdmin){
    next();
  }
  else{
    return res.status(401).json({success:false,message:'invalid token Admin'})
  }
}