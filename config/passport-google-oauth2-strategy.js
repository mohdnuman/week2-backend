const passport=require("passport");
const googleStrategy=require("passport-google-oauth").OAuth2Strategy;
const crypto=require("crypto");
const User=require("../models/user");
// const env=require('../config/environment');

passport.use(new googleStrategy({
    clientID: "842567579196-vnpl9b7mmdtqirej7jjas4gnia0h795n.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/user/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("error in google strategy passport:",err);
                return;
            }
            // console.log(profile);

            if(user)
            {
                return done(null,user);
            }else{
                let names=profile.displayName.split(" ");
                User.create({
                    username:profile.displayName,
                    firstName: names[0],
                    lastName:names[1],
                    email:profile.emails[0].value,
                    password: crypto.randomBytes(20).toString("hex"),
                    role:'student',
                    grade:'a'

                },function(err,user){
                    if(err){
                        console.log("error in google strategy passport:",err);
                        return;
                    }
                    else
                    return done(null,user);
                });
            }
        });
    }

));