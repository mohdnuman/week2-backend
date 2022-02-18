const express=require('express');
const router=express.Router();


const postsApiController=require('../../controllers/api/post_api');
router.post('/create',postsApiController.create);
router.post('/delete/:id',postsApiController.destroy);


module.exports=router;