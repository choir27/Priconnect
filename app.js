const path = require('path')
const express = require('express');
const app = express();
const morgan = require('morgan')
const passport = require('passport')
const { engine } = require('express-handlebars');
const methodOverride = require('method-override')
const { initialize } = require('passport');
const connectDB = require('./config/db');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const cors = require('cors')
require('dotenv').config({path: './config/config.env'})
const PORT = 8000

app.use(cors())

//Passport config
require('./config/passport')(passport)

connectDB()

// body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  }))


// handling
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// handlebars helpers

const { formatDate, stripTags, truncate, editIcon, select} = require('./helpers/hbs')

//Handlebars middleware
app.engine('.hbs', engine({ helpers: {
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select,
}, defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

//Sessions middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUnitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI
    })
    //cookie: { secure: true }
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('assets'))
app.use(express.static('assets/lyrical'))
app.use(express.static('assets/gourmet'))



//set global variable
app.use(function (req,res,next) {
    res.locals.user = req.user || null
    next()
})


//Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/characters', require('./routes/characters'))
app.use('/main', require('./routes/main'))

// || PORT
app.listen(process.env.PORT || PORT, ()=>{  
    console.log(`Server running on port`)
})