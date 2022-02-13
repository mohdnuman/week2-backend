const express=require('express');
const router=express.Router();



const homeController=require('../controllers/home_controller.js');
router.get('/',homeController.home);
router.use('/user', require('./user.js'));
router.use('/connection',require('./connection.js'));
router.use('/post',require('./post.js'));


module.exports=router;