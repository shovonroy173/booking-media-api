import express from "express"
import { createCityProperties, getcities } from "../controllers/city.js";
const router = express.Router();

router.post("/post" , createCityProperties);
router.get("/" , getcities);

export default router;