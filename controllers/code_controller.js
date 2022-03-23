const Code=require('../models/code');

module.exports.create=async function(req,res){
    try{
        let code=await Code.create({
            question:req.body.question,
            test1:req.body.test1,
            answer1:req.body.answer1,
            test2:req.body.test2,
            answer2:req.body.answer2
        });
        return res.redirect('back');
    }catch(err){
        console.log("error:",err);
        return;
    }
   
}