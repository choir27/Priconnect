const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const connectDB = require("./config/db");
const mainRoutes = require("./routes/main");
const authRoutes = require("./routes/auth");
require("dotenv").config();

connectDB();

app.use(cors());

app.use(cors({
    origin: [process.env.API_PORT_URL],
    methods: "GET, POST, PUT, DELETE, OPTIONS"
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

app.use("/", mainRoutes);
app.use("/google", authRoutes);

app.listen(process.env.PORT,()=>{
console.log(`${process.env.PORT}`)
})


