const mongoose = require('mongoose');
const dbconnect = async() =>{
    const dbconnect = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
    )
    if(dbconnect)
    {
        console.log("Database connected successfuly")
    }
    else
    {
        console.log("Database NOT connected")
    }
 }

module.exports = { dbconnect };
