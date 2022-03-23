const Mcq=require('../models/mcq');

module.exports.create=async function(req,res){
    try{
        let mcq=await Mcq.create({
            question:req.body.question,
            options:[req.body.option1,req.body.option2,req.body.option3,req.body.option4],
            answer:req.body.answer
        });
        return res.redirect('back');
    }catch(err){
        console.log("error:",err);
        return;
    }
   
}