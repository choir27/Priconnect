const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
const cors = require('cors')
const fs = require('fs')
const bodyParser = require('body-parser')
require('dotenv').config()
var request = require('request');
const { Router } = require('express')
const router = express.Router();

let db = 'priconne'
let dbName = 'priconne'


MongoClient.connect(process.env.DATABASE_URL, { useUnifiedTopology: true })
    .then(client => {

        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static('views'))
app.use(express.static('assets'))
//lets ejs files to view nested files lyrical and gourmet
app.use(express.static('assets/lyrical'))
app.use(express.static('assets/comics'))

app.use(express.static('assets/gourmet'))
app.use(express.static('home'))

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/',(request, response)=>{
    db.collection('priconne').find().toArray()
    .then(data =>{
        db.collection('characterNames').find().toArray()
            .then(info=>{
                response.render('home.ejs', {data,info})
            }).catch(err=>console.error(err))
    })
    .catch(err => console.error(err))
})


app.get(`/add`,(request, response)=>{
    db.collection('priconne').find().toArray()
    .then(data =>{
        db.collection('characterNames').find().toArray()
            .then(info=>{
                response.render('add.ejs', {data,info})
            }).catch(err=>console.error(err))
    })
    .catch(err => console.error(err))})


app.get(`/search`,(request, response)=>{
    db.collection('priconne').find().toArray()
        .then(result=>{
            db.collection('search').find().toArray()
                .then(data=>{
                    db.collection('characterNames').find().toArray()
                        .then(info=>{
                            db.collection('websiteContent').find().toArray()
                                .then(content=>{
                        response.render('search.ejs', {data,info, result, content})
                            }).catch(err=>console.error(err))
                        }).catch(err=>console.error(err))
                }).catch(err=>console.error(err))
}).catch(error=>console.error(error))
})


app.get('/comics',(request,response)=>{
    db.collection('priconne').find().toArray()
    .then(data=>{
        db.collection('characterNames').find().toArray()
        .then(info=>{
        response.render('comics.ejs', {data,info})
        }).catch(err=>console.error(err))
    })
.catch(err => console.error(err))
})

app.get('/received',(request,response)=>{
 response.render('received.ejs')
})
    
app.get('/contact',(request,response)=>{
    db.collection('priconne').find().toArray()
    .then(data =>{
        db.collection('characterNames').find().toArray()
            .then(info=>{
            response.render('contact.ejs', {data,info})
        }).catch(err=>console.error(err))
})
.catch(err => console.error(err))
})

app.get('/about',(request,response)=>{
    db.collection('priconne').find().toArray()
    .then(data =>{
        db.collection('characterNames').find().toArray()
        .then(info=>{
    response.render('about.ejs',{data,info})
        }).catch(err=>console.error(err))
})
.catch(err => console.error(err))
})
    
app.get('/api',(request,response)=>{
    db.collection('priconne').find().toArray()
    .then(data => {
     response.json(data)
   })
    .catch(error => console.error(error))
})

app.get('/api/characters',(request,response)=>{
db.collection('characterNames').find().toArray()
.then(data => {
    response.json(data)
  })
   .catch(error => console.error(error))
})


app.get(`/api/search`,(request, response)=>{
    db.collection('search').find().toArray()
    .then(data =>{
        response.json(data)
    })
    .catch(err => console.error(err))})

//send name values : inputted values as key-value pairs to our priconne custom database and redirect to home page
app.post('/characters', (request,response)=>{
    db.collection('priconne').insertOne({
name: request.body.name, nickname: request.body.nickname, unionName: request.body.unionName, guild: request.body.guild, 
    text: request.body.text, text2: request.body.text2, card: request.body.card
 ,image: request.body.image, sprite: request.body.sprite, guildImage: request.body.guildImage,
union: request.body.union, chibi: request.body.chibi})
        .then(result => {
            response.redirect('/')

        })
    .catch(error => console.error(error))
})

app.post('/search', (request,response)=>{
    db.collection('search').insertOne({
search: request.body.search})
        .then(result => {
            response.redirect('/search')

        })
    .catch(error => console.error(error))
})


app.post('/characterNames', (request,response)=>{
    db.collection('characterNames').insertOne({
        characterNames: request.body.characterNames
    })
        .then(result => {
            db.collection('characterNames').find().toArray()
                .then(data=>{
            let characterPage = data[data.length-1].characterNames.toLowerCase()
            response.redirect(`/home/${characterPage}`)
                })
                .catch(err => console.error(err))
        })
    .catch(error => console.error(error))
})

app.post('/contact', (request,response)=>{
    db.collection('contact').insertOne({
name: request.body.name, email: request.body.email, text: request.body.text})
        .then(result => {
            response.redirect('/received')
        })
    .catch(error => console.error(error))
})


//Checks if the parameter query id (string value inputed after home/) is equal to lowercased nickname value in our custom priconne database (kyaru)
//if we find a match, we have the variable info set to that specific content (Kyaru pictures, Kyaru text, Kyaru name etc.) and render template
app.get('/home/:id', async(request, response)=>{
    db.collection('priconne').find().toArray()
    .then(result => {
        db.collection('characterNames').find().toArray()
            .then(data=>{
        let query = request.params.id // Your lookup to find Kiruya's data.  In this, req.params.id would be helpful.
        for(let i = 0;i<result.length;i++){
           if(result[i].nickname.toLowerCase()===query){
           let info = result[i]
            response.render('template.ejs', {info, result, data})
           }
        }
    }).catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})

app.listen(process.env.PORT || PORT, ()=>{  
    console.log(`Server running on port ${PORT}`)
})