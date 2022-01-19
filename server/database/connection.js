const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(`connection success`)
        //console.log(conn)
    } catch (err) {
        console.log(`connection error:${err}`)
        process.exit(1);
    }
}

module.exports = connectDB