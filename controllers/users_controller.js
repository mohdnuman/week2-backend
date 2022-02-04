const User=require('../models/user');
const fs=require('fs');
const path=require('path');

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            return;
        }
        return res.render('profile',{
            profile_user:user
        });

    });
}

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile/'+req.user.id);
    }
    return res.render('user-sign-up');
}

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile/'+req.user.id);
    }
    return res.render('user-sign-in');
}

module.exports.create=function(req,res){
    //todo
   
    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email : req.body.email},function(err,user){
        if(err){
            console.log("error occurred while finding user in sign up");
            return;
        }
        if(!user){
            User.create(req.body,function(err,newUser){
                if(err){
                    console.log("error occurred while creatin new user");
                    return;
                }
                console.log("*****",newUser);
                return res.redirect('/user/sign-in');
            });
        }
        else{
            res.redirect('back');
        }
    });
}

module.exports.createSession=function(req,res){
    res.redirect('/user/profile/'+req.user.id);
}

module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect('/');
}