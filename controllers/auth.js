const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/auth');
const {validationResult}=require('express-validator')
const registerPost=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        console.log(password,name,email);
        const errorVal=validationResult(req);
        if(errorVal.isEmpty()){const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ message: 'User already exists' });
        }
        const hashedPass=await bcrypt.hash(password,12);
        const newUser=await User.create({name,email,password:hashedPass});
        const payLoad={id: newUser._id,email:newUser.email};
        const token=jwt.sign(payLoad,process.env.SECRET_KEY,{
            expiresIn:'7d'
        });
        res.cookie('token',token,{
            httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true if in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(201).json({
      message: 'User registered successfully',
      User: { name: newUser.name, email: newUser.email },
      token, // optionally send token in response too
    });}
    else{
        res.status(400).json({
        message: 'Validation failed',
      errors: errorVal.array()
});
    }
    }
    catch(error){
        res.status(500).json({error:'sorry this is currently not working'});
        console.log(error);
    }
}
const loginPost=async (req,res)=>{
try{const {email,password}=req.body;
const errorVal=validationResult(req);
if(!errorVal.isEmpty()){
    res.status(400).json({
        message:'Validation failed',
        err:errorVal.array()
    })
}
else{const reqdUser=await User.findOne({email});
if(!reqdUser){
    return res.status(400).json({error:'invalid email or password'})
}
const realUser=await bcrypt.compare(password,reqdUser.password);
if(!realUser){
    return res.status(400).json({error:'invalid email or password'})
}
const payLoad={id: reqdUser._id,email:reqdUser.email};
    const token=jwt.sign(payLoad,process.env.SECRET_KEY,{
        expiresIn:'7d'
    });
    res.cookie('token',token,{
        httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true if in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json({
        message:'successfully logged in',
        User:{name:reqdUser.name,email:reqdUser.email},
        token
    })
    }
}    catch(error){
        res.status(500).json({Error:'sorry it is a server side error'})
        console.log(error);
    }
}
//{"name":"paul","email":"tskpriyanshu2005@gmail.com","password":"sigmamale"}

const logoutPost=async (req,res)=>{
    res.clearCookie('token',{
        httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
       sameSite: 'strict',
    path: '/', 
    });
    res.status(200).json({message:'logged out sucessfully'})
}

module.exports={registerPost,loginPost,logoutPost}