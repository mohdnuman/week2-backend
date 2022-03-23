const express=require('express');
const router=express.Router();

const mcqsApiController=require("../../controllers/api/mcq_api.js");

router.get('/',mcqsApiController.index);
// router.get('/search',doubtsApiController.search);
// router.post('/create',doubtsApiController.create);
// router.post('/accept/:id',doubtsApiController.accept);
// router.post('/resolve/:id',doubtsApiController.resolve);
// router.get('/:id',doubtsApiController.show);

module.exports=router;