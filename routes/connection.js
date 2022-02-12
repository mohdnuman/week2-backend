const express=require('express');
const router=express.Router();
const passport=require("passport");


const connectionController=require('../controllers/connection_controller');
router.post('/follow/:id',passport.checkAuthentication,connectionController.follow);
router.post('/unfollow/:id',passport.checkAuthentication,connectionController.unfollow);


module.exports=router;