const Course=require('../../models/course');

module.exports.fetchTechCourses=async function(req,res){
    try{
        // console.log(req);
        let courses=await Course.find({category:'tech'});
        // console.log(user);
        return res.json(200,{
            message:"here are the course",
            success:true,
            data:{
                courses:courses
            }
        })

    }catch(error){
        console.log("error occurred:",error);
        return res.json(500,{

            message:"internal server error!"
        });
    }
}
module.exports.fetchNonTechCourses=async function(req,res){
    try{
        // console.log(req);
        let courses=await Course.find({category:'nontech'});
        // console.log(user);
        return res.json(200,{
            message:"here are the course",
            success:true,
            data:{
                courses:courses
            }
        })

    }catch(error){
        console.log("error occurred:",error);
        return res.json(500,{

            message:"internal server error!"
        });
    }
}
module.exports.fetchSkillBasedCourses=async function(req,res){
    try{
        // console.log(req);
        let courses=await Course.find({category:'skillbased'});
        // console.log(user);
        return res.json(200,{
            message:"here are the course",
            success:true,
            data:{
                courses:courses
            }
        })

    }catch(error){
        console.log("error occurred:",error);
        return res.json(500,{

            message:"internal server error!"
        });
    }
}