const User=require('../models/user');
const Post=require('../models/post');
const Course=require('../models/course');



module.exports.home=async function(req,res){
    try{
        let users=await User.find({});
        let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user');
        let courses=await Course.find({})



        return res.render('home',{
        users:users,
        posts:posts,
        courses:courses
        });

    }catch(err){
        console.log("error occured:",err);
        return;

    }
    
}