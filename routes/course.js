const express=require('express');
const router=express.Router();
const passport=require('passport');

const courseController=require('../controllers/courses_controller');
router.post('/create',passport.checkAuthentication,courseController.create);
// router.post('/destroy/:id',passport.checkAuthentication,courseController.destroy);

module.exports=router;