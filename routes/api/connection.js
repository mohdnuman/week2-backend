const express=require('express');
const router=express.Router();


const connectionsApiController=require('../../controllers/api/connection_api');
router.post('/follow/:followerId/:followingId',connectionsApiController.follow);
router.post('/unfollow/:followerId/:followingId',connectionsApiController.unfollow);


module.exports=router;