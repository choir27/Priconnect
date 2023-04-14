module.exports = {
    getAuth: async (req, res) => {
        passport.authenticate("google", {
            scope: ["profile"]
        })
    },
    getCallback: async (req, res) =>  {
        passport.authenticate("google", {
            failureRedirect: "/"
        }),
            (req,res)=>{
                res.redirect("/dashboard");
            }
    },
    getLogout: async (req, res, next) => {
        req.logout(function(err){
            if(err){ 
                return next(err);
            };
        res.redirect("/");
        });
    }
}