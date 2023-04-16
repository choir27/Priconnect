const express = require("express");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const mainRoutes = require("./routes/main");
require("dotenv").config();
const User = require("./models/User");
const router = express.Router();
const passport = require("passport");

const {
    OAuth2Client,
  } = require('google-auth-library');

connectDB();

app.use(bodyParser.json());

app.use(cors())

app.use(cors({
    origin: [process.env.API_PORT_URL],
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
}));


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUnitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI})
}));

app.use(passport.initialize());
app.use(passport.session());

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage',
  );

  app.post('/auth/google', async (req, res) => {
    const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens    
    res.json(tokens);
  });

  app.post('/google/refresh-token', async(req, res, next) => {
    
    const user = new User({
        displayName: req.body.userInfo.name,
        firstName: req.body.userInfo.given_name,
        lastName: req.body.userInfo.family_name,
        image: req.body.userInfo.picure,
        email: req.body.userInfo.email,
        accessToken: req.body.tokenResponse.access_token,
    });
    
    User.findOne( { $or: [{email: req.body.userInfo.email,}] })
        .then(
            (err, existingUser) => {
                if (err) {
                  return next(err);
                }
                if (existingUser) {
                    res.status(500).send("User Already Exists");
                    return next(err);
                }
                user.save().then(
                    (err) => {
                    return next(err);
                    },
                    req.logIn(user, (err) => {
                    if (err) {
                      return next(err);
                    }
                    
                    if(user){
                        res.status(500).send({user});
                    } 
                    
                    else{
                      res.status(500).send("Invalid user data");
                      return next(err);
                        }           
                          
                  })
                );
                });
      
            })
    
app.use("/", mainRoutes);

app.listen(process.env.PORT,()=>{
console.log(`${process.env.PORT}`)
})


