const Contact = require("../models/Contact")

module.exports = {
    contactMe: async (request,response)=>{

        try{

            await Contact.create({
                name: request.body.name, 
                email: request.body.email, 
                text: request.body.text
            });

            response.redirect("/");

        }catch(err){

            console.error(err);
            response.render("error/500");

        }
    }
}