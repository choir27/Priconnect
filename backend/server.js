const express = require("express");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const connectDB = require("./config/db");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
require("dotenv").config();

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
    
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/", postRoutes);

app.listen(process.env.PORT,()=>{
console.log(`${process.env.PORT}`)
})


