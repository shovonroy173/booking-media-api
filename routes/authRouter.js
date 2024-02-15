import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  // res.status(200).send("ok")
  try {
    const { name, email, password, isAdmin } = req.body;
    // console.log(req.body);
    if (!name || !email || !password)
      return res.status(400).send("Insufficient Data");
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log("LINE AT 16", hashedPassword);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json("User not found!");
    } else {
      const validPassord = bcrypt.compareSync(password, user.password);
      if (!validPassord) return res.status(401).json("Wrong Password");
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT
      );
      //   const { oriPassword:password ,  ...otherDetails } = user._doc;
      return res.cookie("access_token", token).status(200).json(user._doc);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/user/booking", async (req, res) => {
  // console.log(req.body);
  const { userId, ...bookingDetails } = req.body;
  try {
    const bookingHotel = await User.findByIdAndUpdate(
      userId,
      {
        $push: { bookings: bookingDetails },
      },
      {
        new: true,
      }
    );
    res.status(200).json(bookingHotel);
  } catch (error) {
    next(error);
  }
});

router.get("/find/:id" , async(req , res)=>{
  try {
    const user = await User.findById({_id:req.params.id});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/delete/:hotelId/:userId" , async(req , res)=>{
  try {
    const item = await User.findByIdAndUpdate(req.params.userId , 
      { $pull: { "bookings": { "hotelId.id": req.params.hotelId } } }
     , {new:true});
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json(error);
  }
});


export default router;
