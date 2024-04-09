import mongoose, { model } from "mongoose";

const roomSchema = new mongoose.Schema({
    title:{
        type:String , 
    } , 
    price:{
        type:Number , 
    } , 
    maxPeople:{
        type:Number , 
    } ,
    desc:{
        type:String, 
    }, 
    roomNumbers: [{number:Number , unavailableDates : {type: [Date]}}],  
});

export default model("Room" , roomSchema);