const express = require('express');
const router = express.Router();
const {ensureGuest } = require('../middleware/auth');
const contact = require('../middleware/main');

// @desc login/landing page
// @route get/
router.get("/about", ensureGuest, (req,res) => {
    res.render('main/about', {
        layout: 'index'
    })
})


// @desc login/landing page
// @route get/
router.get('/comics', ensureGuest, (req,res) => {
    res.render('main/comics', {
        layout: 'comics'
    })
})



// @desc login/landing page
// @route get/
router.get('/contact', ensureGuest, (req,res) => {
    res.render('main/contact', {
        layout: 'index'
    })
})

router.post('/contactMe', contact.contactMe);

module.exports = router