const User=require('../../models/user');

module.exports.follow=async function(req,res){
    
    try{
    let follower=await User.findById(req.params.followerId);
    let following=await User.findById(req.params.followingId);

    follower.following.push(following);
    following.followers.push(follower);

    follower.save();
    following.save();

    return res.json(200,{
        message:"user followed",
        success:true,
        data:{
            user:follower
        }
    })
    }catch(error){
        console.log("error occurred:",error);
        return res.json(500,{

            message:"internal server error!"
        });
    }
   
}


module.exports.unfollow=async function(req,res){
    
    try{
    let follower=await User.findById(req.params.followerId);
    let unfollowing=await User.findById(req.params.followingId);

    follower.following.pull(unfollowing);
    unfollowing.followers.pull(follower);

    follower.save();
    unfollowing.save();

    return res.json(200,{
        message:"user unfollowed",
        success:true,
        data:{
            user:follower
        }
    })
    }catch(error){
        console.log("error occurred:",error);
        return res.json(500,{

            message:"internal server error!"
        });
    }
   
}