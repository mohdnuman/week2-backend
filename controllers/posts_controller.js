const Post=require('../models/post');
const { authenticate } = require('passport');

module.exports.create=async function(req,res){
    try{
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        post = await post.populate('user','name');

        Post.uploadedImage(req,res,function(err){
            if(err)console.log("**********Multer Error :",err);
            console.log("here:");
            // user.username=req.body.name;
            // user.email=req.body.email;

            if(req.file){
                
                // if(post.image){
                    if(fs.existsSync(path.join(__dirname,'..',post.image))){
                    fs.unlinkSync(path.join(__dirname,'..',post.image));
                    }
                // }
                post.image=Post.avatarPath+'/'+req.file.filename;
            }
            post.save();
            // return res.redirect('back');

        })

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"post created!"
            })
        }

        
        return res.redirect('back');
    }catch(err){
        console.log("error:",err);
        return;
    }
   
}

module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        if(post.user==req.user.id){

            post.remove();

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"post deleted!"
                })
            }
            return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("error occurred:",err);
        return;
    }
}