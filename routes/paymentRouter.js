import express from "express";
const router = express.Router();
const KEY = process.env.KEY;
import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51N55v0SG4487ZVYHPGAAx9068xxjQu6YzDjUJX4u6MRPCxqGWBvUbAKbBRHXVX26ahTp2vMOwgY287c0NKhDbuv700Tq9HPoMK");

// const Stripe = stripe(KEY);
router.post("/payment", async (req, res) => {
console.log( "LINE AT 7" , req.body.selectedRooms);
//   const q = req.body.selectedRooms;
//   const len = q.length();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data:{
         currency:"inr" , 
         product_data:{
            name:req.body.hotelId.id
         } , 
         unit_amount:req.body.price*100
      } , 
      quantity:1 , 
    }],
    mode: "payment",
    success_url: `http://localhost:5173/success`,
    cancel_url: `http://localhost:5173/cancel`,
  });

  res.json({ id: session.id });
});

export default router;
