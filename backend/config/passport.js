const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')
require("dotenv").config();

module.exports = function(passport){
    passport.use(new GoogleStrategy(
        {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, callback) =>{
        callback(profile)
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }
        try{
            let user = await User.findOne({ googleId: profile.id })

            if(user){
                done(null, user)
            }else{
                user = await User.create(newUser)
                done(null, user)
            }
        }catch(err){
            console.error(err)
        }
    }
    ))

    passport.serializeUser((user, done)=>{
      if(user._id){
        done(null, user._id);
      }
    });

    passport.deserializeUser((id, done)=>{
      if(id){
        User.findById(id, (err, user)=>{
          done(err, user);
      });
      }

    });
}