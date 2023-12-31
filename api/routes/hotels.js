import express from "express";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create hotel
router.post("/", verifyAdmin, async (req, res, next) => {
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
router.put("/:id", verifyAdmin, async (req, res, next) => {
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
router.get("/", async (req, res, next) => {
  const { min, max, ...others } = req.query;

  try {
    const Hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gte: min || 1, $lte: max || 999 },
    }).limit(req.query.limit);

    res.status(200).json(Hotels);
    return Hotels;
  } catch (error) {
    next(error);
  }
});

//find hotels by city
router.get("/countByCity", async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => Hotel.countDocuments({ city }))
    );

    res.status(200).json(list);

    return list;
  } catch (error) {
    next(error);
  }
});

//find hotels by Type
router.get("/countByType", async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "Apartment" });
    const resortCount = await Hotel.countDocuments({ type: "Resort" });
    const villaCount = await Hotel.countDocuments({ type: "Villa" });
    const cabinCount = await Hotel.countDocuments({ type: "Cabin" });
    const cottageCount = await Hotel.countDocuments({ type: "Cottage" });
    const vacationhomeCount = await Hotel.countDocuments({
      type: "Vacation home",
    });
    const guesthouseCount = await Hotel.countDocuments({ type: "Guest house" });
    const motelCount = await Hotel.countDocuments({ type: "Motel" });

    const data = [
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
      { type: "cottage", count: cottageCount },
      { type: "vacation home", count: vacationhomeCount },
      { type: "guest house", count: guesthouseCount },
      { type: "motel", count: motelCount },
    ];

    res.status(200).json(data);
    return data;
  } catch (error) {
    next(error);
  }
});

//get hotel rooms
router.get("/room/:id", async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => Room.findById(room))
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
});

//find one hotel
router.get("/search/:id", async (req, res, next) => {
  try {
    const foundHotel = await Hotel.findById(req.params.id);
    res.status(200).json(foundHotel);
  } catch (error) {
    error.message = "Cannot find hotel";
    next(error);
  }
});

//delete hotel
router.delete("/:id", verifyAdmin, async (req, res, next) => {
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
