const express=require('express');
const router=express.Router();
const usersApiController=require('../../controllers/api/user_api');

router.post('/create-session',usersApiController.createSession);




module.exports=router;