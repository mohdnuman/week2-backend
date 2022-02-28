const express=require('express');
const router=express.Router();
const passport=require('passport');

const lectureController=require('../controllers/lecture_controller');
router.post('/create',passport.checkAuthentication,lectureController.create);
// router.post('/destroy/:id',passport.checkAuthentication,courseController.destroy);

module.exports=router;