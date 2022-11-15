const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Search = require('../models/Search')

const Character = require('../models/Character')
// @desc login/landing page
// @route get/
router.get('/', ensureGuest, (req,res) => {
    res.render('login', {
        layout: 'received'
    })
})

// @desc dashboard
// @route get /dashboard
router.get('/dashboard', ensureAuth, async (req,res)=>{
    try{
        const character = await Character.find({ user: req.user.id}).lean()
        res.render('dashboard', {
            layout: 'character',
            name: req.user.firstName,
            character
        })
    }catch{
        console.error(err)
        res.render('error/500')
    }
  
})

module.exports = router