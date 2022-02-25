const Course=require('../models/course');
// const User=require('../models/user');

module.exports.create=async function(req,res){
    try{
        Course.uploadedAvatar(req,res,async function(err){
            if(err)console.log("**********Multer Error :",err);
            
            let course=await Course.create({
                name:req.body.name,
                description:req.body.description,
                category:req.body.category
            });

            if(req.file){
                if(course.avatar){
                    if(fs.existsSync(path.join(__dirname,'..',course.avatar))){
                    fs.unlinkSync(path.join(__dirname,'..',course.avatar));
                    }
                }
                course.avatar=Course.avatarPath+'/'+req.file.filename;
            }
            course.save();
            return res.redirect('back');

        })


        if(req.xhr){
            return res.status(200).json({
                data:{
                    course:course
                },
                message:"course created!"
            })
        }

        
        // return res.redirect('back');
    }catch(err){
        console.log("error:",err);
        return;
    }
   
}

// module.exports.destroy=async function(req,res){
//     try{
//         let post=await Post.findById(req.params.id);
//         if(post.user==req.user.id){

//             post.remove();

//             if(req.xhr){
//                 return res.status(200).json({
//                     data:{
//                         post_id:req.params.id
//                     },
//                     message:"post deleted!"
//                 })
//             }
//             return res.redirect('back');
            
//         }else{
//             return res.redirect('back');
//         }
//     }
//     catch(err){
//         console.log("error occurred:",err);
//         return;
//     }
// }