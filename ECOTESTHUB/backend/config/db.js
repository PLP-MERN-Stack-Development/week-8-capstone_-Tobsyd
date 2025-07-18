const mongoose = require('mongoose');
const config = require('./index')

const connectDB= async()=>{
   try {
      await mongoose.connect(config.mongoUri, { 
        useNewUrlParser: true, useUnifiedTopology: true })
        console.log("MongoDB connected");
   } catch (err) {
      console.error("MongoDB connection Unsuccessfully", err);
      process.exit(1);
   }
};

module.exports = connectDB;