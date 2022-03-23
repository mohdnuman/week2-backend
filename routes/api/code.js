const express=require('express');
const router=express.Router();

const codesApiController=require("../../controllers/api/code_api.js");

router.get('/',codesApiController.index);
// router.get('/search',doubtsApiController.search);
// router.post('/create',doubtsApiController.create);
// router.post('/accept/:id',doubtsApiController.accept);
// router.post('/resolve/:id',doubtsApiController.resolve);
// router.get('/:id',doubtsApiController.show);

module.exports=router;