import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongodb successfully")
    }
    catch(err){
        console.log('Error connecting to mongodb ', err.message);
        process.exit(1);
    }
}