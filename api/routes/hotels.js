import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

const router = express.Router();

//create hotel
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res
      .status(200)
      .json({ message: "Successfully added a new hotel!", newHotel });
  } catch (error) {
    next(error);
  }
});

//update hotels
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "Successfully updated hotel!", updatedHotel });
  } catch (error) {
    next(error);
  }
});

//find all hotels
router.get("/", async (req, res) => {
  try {
    const Hotels = await Hotel.find();

    res.status(200).json({ message: "Found Hotels!", Hotels });
  } catch (error) {
    next(error);
  }
});

//find one hotel
router.get("/:id", async (req, res, next) => {
  try {
    const foundHotel = await Hotel.findById("a");
    res.status(200).json({ message: "Found hotel!", foundHotel });
  } catch (error) {
    error.message = "Cannot find hotel";
    next(error);
  }
});

//delete hotel
router.delete("/:id", async (req, res) => {
  try {
    const deletedHotel = await Hotel.findOneAndDelete(req.params.id);

    res
      .status(200)
      .json({ message: "Succesfully deleted hotel", deletedHotel });
  } catch (error) {
    next(error);
  }
});

export default router;
