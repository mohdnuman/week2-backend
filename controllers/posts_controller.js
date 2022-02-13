const Post=require('../models/post');
const { authenticate } = require('passport');

module.exports.create=async function(req,res){
    try{
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        post = await post.populate('user','name');

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