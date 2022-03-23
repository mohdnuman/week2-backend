const express=require('express');
const router=express.Router();

const fillsApiController=require("../../controllers/api/fill_api.js");

router.get('/',fillsApiController.index);
// router.get('/search',doubtsApiController.search);
// router.post('/create',doubtsApiController.create);
// router.post('/accept/:id',doubtsApiController.accept);
// router.post('/resolve/:id',doubtsApiController.resolve);
// router.get('/:id',doubtsApiController.show);

module.exports=router;