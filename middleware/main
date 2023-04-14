const Contact = require('../models/Contact')

module.exports = {
    contactEngineer: async (request,response)=>{
        try{
        await Contact.create({name: request.body.name, email: request.body.email, text: request.body.text})
        console.log('contact has been created')
        response.redirect('/main/received')
        }catch(err){
            console.error(err)
            response.render('error/500')
        }
}
}