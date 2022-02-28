const Course=require('../models/course');



module.exports.show=async function(req,res){
    try{
        let course=await Course.findById(req.params.id);


        return res.render('coursePage',{
        course:course
        });

    }catch(err){
        console.log("error occured:",err);
        return;

    }
    
}