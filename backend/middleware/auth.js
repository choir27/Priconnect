module.exports = {
    ensureAuth: function(req,res,next){
        return req.isAuthenicated ? next() : res.redirect("/"); 
    },
    ensureGuest: function(req,res,next){
        return req.isAuthenicated ? res.redirect("/dashboard") : next();
    }
}