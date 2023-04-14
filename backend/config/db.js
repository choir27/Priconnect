const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`Connected to server ${conn.connection.host}`)
    }catch(error){
        console.error(error);      
        process.exit(1);
    }
}

module.exports = connectDB