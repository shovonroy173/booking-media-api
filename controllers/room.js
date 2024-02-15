import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoomAvailability = async(req , res , next)=>{

    try {
        const updatedRoom = await Room.findOneAndUpdate(
            {"roomNumbers._id": req.body.roomId} , 
            { $addToSet: { "roomNumbers.$[elem].unavailableDates": req.body.dates } },
            { arrayFilters: [{ "elem._id": "roomNumbers._id" }], new: true }
            
        );
        res.status(200).json(updatedRoom);
    } catch (error) {
      console.log(error);
        next(error);
    }
};

export const deleteRoom = async(req , res , next) =>{
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId , {
                $pull: {rooms:req.params.id}
            });
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
};

export const getRoom = async(req , res , next) =>{
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
};

export const getRooms = async(req , res , next) =>{
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
};

export const getBookedRoomsClear = async(req , res , next) =>{
  try {
      const room = await Room.findOneAndUpdate({"roomNumbers._id":req.params.roomId} , 
      {
        $unset:
        {"roomNumbers.$[elem].unavailableDates":1}
      } , {new:true , arrayFilters: [{ "elem._id": req.body.roomId } ]}
      );
      console.log(room);
      res.status(200).json(room);
  } catch (error) {
      next(error);
  }
};

