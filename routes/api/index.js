const express=require('express');
const router=express.Router();
const usersApiController=require('../../controllers/api/user_api');




// router.use('/posts',require("./posts.js"));
router.use('/user',require("./user.js"));
router.get('/user/:id',usersApiController.fetchUser);
router.use('/connection',require("./connection.js"));


module.exports=router;