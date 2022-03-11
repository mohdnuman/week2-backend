const express=require('express');
const router=express.Router();

const lecturesApiController=require('../../controllers/api/lecture_api');
router.post('/create',lecturesApiController.createLecture);

module.exports=router;