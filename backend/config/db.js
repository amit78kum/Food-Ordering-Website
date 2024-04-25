import mongoose from "mongoose";

 export const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://food-del:amit7488@cluster0.zhpmf8n.mongodb.net/food-del").then(()=>console.log("db connected"))           
};