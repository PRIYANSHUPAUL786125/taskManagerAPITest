const jwt=require('jsonwebtoken');
const authUser=(req,res,next)=>{
    try{const token = req.cookies.token;
    if(!token){
        return res.status(400).json({message:"please login"});
    }
    const secret=process.env.SECRET_KEY;
    const decoded=jwt.verify(token,secret);
    req.user = decoded;
    console.log('verified user');
    next();
}
catch(error){
    console.log(error);
    return res.status(403).json({message:"please login again"});

    }
}
module.exports=authUser;