const Course=require('../models/course');



module.exports.show=async function(req,res){
    try{
        let course=await Course.findById(req.params.id).populate('lectures');


        return res.render('coursePage',{
        course:course
        });

    }catch(err){
        console.log("error occured:",err);
        return;

    }
    
}