const User=require('../models/user');

module.exports.home=async function(req,res){
    try{
        let users=User.find({});

        return res.render('home',{
        users:users
        });

    }catch(err){
        console.log("error occured:",err);
        return;

    }
    
}