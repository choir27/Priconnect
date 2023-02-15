const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const Post = require('../models/Post');

// @desc login/landing page
// @route get/
router.get('/', ensureGuest, (req,res) => {
    res.render('login', {
        layout: 'login'
    });
})

// @desc dashboard
// @route get /dashboard
router.get('/dashboard', ensureAuth, async (req,res)=>{
    try{
        const post = await Post.find({ 
            user: req.user.id
        }).lean();
        res.render('dashboard', {
            layout: 'post',
            name: req.user.firstName,
            post
        })
    }catch(err){
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router