import mongoose from "mongoose";
import {Express} from "express";
/* Mongoose setup */

/* ENV Variables */
export default function connectDB(app:Express):void {

    mongoose.connect('mongodb://127.0.0.1:27017/vsmediadb').then(()=>{
        app.listen(5000,()=>console.log("Server listing on port 5000"))    
    }).catch((error)=>console.log("not Connect to DB",error));

}


