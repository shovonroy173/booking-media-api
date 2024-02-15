import City from "../models/City.js";

export const createCityProperties = async(req , res , next)=>{
    try {
        const newProperty = new City(req.body);
        const savedProperty = await newProperty.save();
        res.status(200).json(savedProperty);
    } catch (error) {
        next(error);
    }
}

export const getcities = async(req , res , next)=>{
    try {
        const cities = await City.find();
        res.status(200).json(cities);
    } catch (error) {
        next(error);
    }
};