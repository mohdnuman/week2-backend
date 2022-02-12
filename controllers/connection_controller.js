const User=require('../models/user');

module.exports.follow=async function(req,res){
    
    try{
    let follower=await User.findById(req.user.id);
    let following=await User.findById(req.params.id);

    follower.following.push(following);
    following.followers.push(follower);

    follower.save();
    following.save();

    return res.redirect('back');
    }catch(error){
        console.log(error);
        return;
    }
   
}


module.exports.unfollow=async function(req,res){
    
    try{
    let follower=await User.findById(req.user.id);
    let unfollowing=await User.findById(req.params.id);

    follower.following.pull(unfollowing);
    unfollowing.followers.pull(follower);

    follower.save();
    unfollowing.save();

    return res.redirect('back');
    }catch(error){
        console.log(error);
        return;
    }
   
}