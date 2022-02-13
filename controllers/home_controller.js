const User=require('../models/user');
const Post=require('../models/post');


module.exports.home=async function(req,res){
    try{
        let users=await User.find({});
        let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user');

        return res.render('home',{
        users:users,
        posts:posts
        });

    }catch(err){
        console.log("error occured:",err);
        return;

    }
    
}