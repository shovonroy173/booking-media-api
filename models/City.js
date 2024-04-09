import { Schema , model } from "mongoose";

const citySchema = Schema({
    name:{
        type:String
    } , 
    properties:{
        type:Number
    } , 
    img:{
        type:String
    } 
    
});

export default model ("City" , citySchema);