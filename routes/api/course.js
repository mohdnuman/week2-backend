const express=require('express');
const router=express.Router();

const coursesApiController=require('../../controllers/api/course_api');
router.get('/tech',coursesApiController.fetchTechCourses);
router.get('/nontech',coursesApiController.fetchNonTechCourses);
router.get('/skillbased',coursesApiController.fetchSkillBasedCourses);
router.get('/:id',coursesApiController.fetchCourse);

module.exports=router;