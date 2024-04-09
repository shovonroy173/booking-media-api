import { json } from "express";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async(req , res , next)=>{
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(
            req.params.id 
        );
        res.status(200).json("Hotel is deleted!");
    } catch (error) {
        next(error);
    };
};

export const getHotel = async(req ,res , next) =>{
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    };
};

export const getHotels = async(req , res , next) => {
    const {min , max , limit , city , ...others } = req.query;
    // console.log(others);
    try {
        const hotels = await Hotel.find({
            ...others , 
            city:{ $regex: city || "" , $options:"i" } , 
            cheapestPrice :{$gt: min | 1 , $lt:max || 999} , 
        }).limit(limit);
        res.status(200).json(hotels);
    } catch (error) {
        next(error);
    };
};

export const countByCity = async(req , res , next)=>{
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(
            cities.map((city)=>{
                return  Hotel.countDocuments({city:city});
            })
        ) ;
        res.status(200).json(list);
    } catch (error) {
      next(error);
    };
};

export const countByType = async(req , res , next)=>{
    try {
        const hotelCount = await Hotel.countDocuments({type:"hotel"});
        const apartmentCount = await Hotel.countDocuments({type:"apartment"});
        const resortCount = await Hotel.countDocuments({type:"resort"});
        const villaCount = await Hotel.countDocuments({type:"villa"});
        const cabinCount = await Hotel.countDocuments({type:"cabin"});

        const hotel = await Hotel.findOne({type:"hotel"});
        const apartment = await Hotel.findOne({type:"apartment"});
        const resort = await Hotel.findOne({type:"resort"});
        const villa = await Hotel.findOne({type:"villa"});
        const cabin = await Hotel.findOne({type:"cabin"});

res.status(200).json([
    {type:"hotel" , count: hotelCount , photo:hotel?.photos[1]} , 
    {type:"apartment" , count: apartmentCount , photo:apartment?.photos[1]} , 
    {type:"resort" , count: resortCount , photo:resort?.photos[1]} , 
    {type:"villa" , count: villaCount , photo:villa?.photos[1]} , 
    {type:"cabin" , count: cabinCount , photo:cabin?.photos[1]} , 
]);
    } catch (error) {
        next(error)
    }
};

export const getHotelRooms = async(req , res , next) =>{
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((id)=>{
                return Room.findById(id);
            })
        );
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
};