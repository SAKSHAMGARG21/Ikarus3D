// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constrants.js";
import connectDB from "./db/index.js";
// import express from 'express';
// const app=express();
import { app } from "./app.js";

dotenv.config({
    path:'../.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`Server is running at the port : ${process.env.PORT}`);
    });
    app.on("Error :" ,(error)=>{
        console.error("Error :" ,error);
        throw error;
    })
})
.catch((error)=>{
    console.log(`MONGODB Connection is failed !!!`,error );
})

/*
import express from "express";
const app=express();
(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        app.on("Error :" ,(error)=>{
            console.error("Error :" ,error);
            throw error;
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening at Port :${process.env.PORT}`);
        })
    } catch (error) {
        console.error("Error Occured :" ,error);    
    }
})()
*/