import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

import authRouter from "./routes/authRouter.js";
import hotelRouter from "./routes/hotelRouter.js";
import roomRouter from "./routes/roomRouter.js";
import cityRouter from "./routes/cityRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
 
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
mongoose.connect(`mongodb+srv://shovon:nwXHh1yt5Gj4fj7P@store-cluster.o7kflav.mongodb.net/booking-media?retryWrites=true&w=majority`).then(() => {
    console.log(`Connected to database`);
}).catch((err)=>{
    console.log(err , "Could not connect to the database.");
});

// routes
app.use("/api/auth" , authRouter);
app.use("/api/hotel" , hotelRouter);
app.use("/api/room" , roomRouter);
app.use("/api/city" , cityRouter);
app.use("/api/checkout" , paymentRouter);


//error middleware
app.use((err , req , res , next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success : false , 
        status: errorStatus,
        message : errorMessage , 
        stack : err.stack ,
    });
});

app.listen(5000 , ()=>{
    console.log( `Server is running on port 5000` );
});
