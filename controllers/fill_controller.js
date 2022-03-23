const Fill=require('../models/fill');

module.exports.create=async function(req,res){
    try{
        let fill=await Fill.create({
            question:req.body.question,
            answer:req.body.answer
        });
        return res.redirect('back');
    }catch(err){
        console.log("error:",err);
        return;
    }
   
}