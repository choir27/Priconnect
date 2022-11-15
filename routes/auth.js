const express = require('express')
const app = express()
const passport = require('passport')
const router = express.Router()

// @desc auth with google
// @route get /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile']}))

// @desc google auth callback
// @route get /auth/google/callback
router.get(
    '/google/callback', 
    passport.authenticate('google', {failureRedirect: '/'}), 
    (req,res)=>{
    res.redirect('/dashboard')
}
)

app.use(passport.initialize());
app.use(passport.session());

// @desc logout user
// @route /auth/logout
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });


module.exports = router