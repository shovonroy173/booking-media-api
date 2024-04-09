import { Schema, model } from "mongoose";

const hotelSchema = new Schema({
  name: {
    type: String,
    // reqiured:true,
  },
  type: {
    type: String,
  },
  city: {
    type: String,
  },
  address: { type: String },
  distance:{type:String} , 
  photos:{type:[String]} , 
  title:{
    type : String
  } , 
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  featuredPhoto:{
    type:String
  }
} , {
  timestamps:true
});

export default model("Hotel" , hotelSchema);
