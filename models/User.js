import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String,  },
    email: { type: String, }, //email should be unique for every user.
    password: { type: String,  },
    isAdmin: {
      type: String,
      default: "user",
    },
     bookings:{type:Array}
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
