import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
//const mongoose = require('mongoose');
import mongoose from "mongoose"
import foodRouter from "./routes/foodRoute.js";
//app config
const app=express();
const port=4000;

//middleware
app.use(express.json());
app.use(cors())

//db connection
  connectDB();
// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb+srv://amitstack:Amit#7488@cluster0.2pd5e5e.mongodb.net/food-del');
//   console.log('database connected');
// }
//api end point
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))



app.get("/",(req,res)=>{
    res.send("API WORKING")
})
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
})
 