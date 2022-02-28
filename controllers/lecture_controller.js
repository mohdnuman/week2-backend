const Lecture=require('../models/lecture');
const Course=require('../models/course');
// const User=require('../models/user');
const { authenticate } = require('passport');

module.exports.create=async function(req,res){
    try{
        


        Lecture.uploadedVideo(req,res,async function(err){
            if(err)console.log("**********Multer Error :",err);
            
            let lecture=await Lecture.create({
                name:req.body.name
            });
            let course=await Course.findById(req.body.id);
            // console.log(user);
            course.lectures.push(lecture);
            course.save();
            // post = await post.populate('user','name');
            // post.content=req.body.conetnt;
            // user.email=req.body.email;
            if(req.file){
                
                if(lecture.video){
                    if(fs.existsSync(path.join(__dirname,'..',lecture.video))){
                    fs.unlinkSync(path.join(__dirname,'..',lecture.video));
                    }
                }
                lecture.video=Lecture.videoPath+'/'+req.file.filename;
            }
            lecture.save();
            return res.redirect('back');

        })


        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"lecture created!"
            })
        }

        
        // return res.redirect('back');
    }catch(err){
        console.log("error:",err);
        return;
    }
   
}
