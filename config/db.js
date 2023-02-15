const mongoose = require("mongoose")

const connectDB = async ()=>{
    try{
        mongoose.set("strictQuery", false);
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB Connected: ${connection.connection.host}`)
    }catch(err){
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB