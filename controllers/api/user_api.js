const User=require('../../models/user');
const Post=require('../../models/post');
const jwt=require('jsonwebtoken');


module.exports.createSession=async function(req,res){
    try{
        let user=await User.findOne({email:req.body.email}).populate('following').populate('followers').populate('posts');

        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:"wrong username or password!"
            });
        }
        return res.json(200,{
            message:"sign in successful! here is your token. please keep it safe!",
            success:true,
            data:{
                user:user,
                token:jwt.sign(user.toJSON(),'genie',{expiresIn:'100000'}) //'genie' is the secret ke to encrypt user
            }

        })


    }catch(error){
        console.log("error occurred:",error);
        return res.json(500,{

            message:"internal server error!"
        });
    }
}

module.exports.fetchUser=async function(req,res){
    try{
        // console.log(req);
        let user=await User.findById(req.params.id).populate('followers').populate('following').populate('posts');
        // console.log(user);
        return res.json(200,{
            message:"here is the user",
            success:true,
            data:{
                user:user
            }
        })

    }catch(error){
        console.log("error occurred:",error);
        return res.json(500,{

            message:"internal server error!"
        });
    }
}