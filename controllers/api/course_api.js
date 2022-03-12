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

module.exports.fetchCourse=async function(req,res){
    try{
        // console.log(req);
        let course=await Course.findById(req.params.id).populate('lectures');
        // console.log(user);
        return res.json(200,{
            message:"here is the course",
            success:true,
            data:{
                course:course
            }
        })

    }catch(error){
        console.log("error occurred:",error);
        return res.json(500,{

            message:"internal server error!"
        });
    }
}

module.exports.create = async function (req, res) {
    try {
      Course.uploadedAvatar(req, res, async function (err) {
        if (err) console.log("**********Multer Error :", err);
  
        let course = await Course.create({
          name: req.body.name,
          description: req.body.description,
          category: req.body.category
        });
       
        // course = await post.populate("user", "name");
  
        if (req.file) {
          if (course.avatar) {
            if (fs.existsSync(path.join(__dirname, "..", course.avatar))) {
              fs.unlinkSync(path.join(__dirname, "..", course.avatar));
            }
          }
          course.avatar = Course.avatarPath + "/" + req.file.filename;
        }
        course.save();
        // return res.redirect('back');
        return res.status(200).json({
          data: {
            course: course,
          },
          statusText: "course created!",
        });
      });
    } catch (err) {
      console.log("error occurred:", err);
      return res.json(500, {
        message: "internal server error!",
      });
    }
  };