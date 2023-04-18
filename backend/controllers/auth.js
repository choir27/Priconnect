const {OAuth2Client} = require('google-auth-library');
const User = require("../models/User");

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "postmessage",
);

module.exports = {
    refreshToken: async(req, res) => {
        try{
            const user = await User.create({
                displayName: req.body.userInfo.name,
                firstName: req.body.userInfo.given_name,
                lastName: req.body.userInfo.family_name,
                image: req.body.userInfo.picure,
                email: req.body.userInfo.email,
                accessToken: req.body.tokenResponse.access_token,
            });

            if(user){
                res.json({user});
            }
      
        }catch(err){
            console.error(err);
        }
    },
    getToken: async (req, res) => {
        try{
             // exchange code for tokens
            const { tokens } = await oAuth2Client.getToken(req.body.code);
            res.json(tokens);
        }catch(err){
            console.error(err);
        }
    },
    loginUser: async (req, res) => {
        try{
            const {email} = req.body.userInfo;

            const user = await User.findOne({email});

            res.json({user});
    
        }catch(err){
            console.error(err);
        }
    }
};