import express from "express";
import cors from "cors";
import logger from "morgan";
import indexRouter from "./routes/gptapi.js"
import auth from "./routes/auth.js";
import mongoose from 'mongoose';
import './models/database.js';
import 'dotenv/config';
const app=express();
app.use(cors());

 app.use(express.json());


app.use(logger("dev"));
const password = process.env.MONGODB_PASSWORD; // Get the password from environment variables
// MongoDB connection URL
console.log(password);
const MONGO_URL = `mongodb+srv://harpreetsinghthechamp:${password}@cluster0.y8wsvnt.mongodb.net/`;

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.get("/",(req,res)=>{
res.json("hello from the server side");
})
app.use("/",indexRouter);
app.use("/",auth);


app.listen(3000,()=>{
    console.log("server started");
})