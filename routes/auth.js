const express=require('express');
const router=express.Router();
const authData=require('../controllers/auth')
router.post('/auth/register',authData.registerPost);
router.post('/auth/login',authData.loginPost)
router.post('/auth/logout',authData.logoutPost);

module.exports=router;