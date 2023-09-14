import express from "express";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create Room
router.post("/:hotelid", async (req, res, next) => {
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
});

//update room
router.put("/:id", verifyAdmin, async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
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
      .json({ message: "Successfully updated room!", updatedRoom });
  } catch (error) {
    next(error);
  }
});

//update avaialable rooms
router.put("/availability/:id", async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.date,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
});

//delete room
router.delete("/:hotelid/:id", verifyAdmin, async (req, res, next) => {
  const hotelId = req.params.hotelid;

  try {
    const deletedRoom = await Room.findOneAndDelete(req.params.id);

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: deletedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json({ message: "Succesfully deleted room", deletedRoom });
  } catch (error) {
    next(error);
  }
});

//find all rooms
router.get("/", async (req, res, next) => {
  try {
    const Rooms = await Room.find();

    res.status(200).json({ message: "Found Rooms!", Rooms });
  } catch (error) {
    next(error);
  }
});

//find one room
router.get("/:id", async (req, res, next) => {
  try {
    const foundRoom = await Room.findById(req.params.id);
    res.status(200).json({ message: "Found room!", foundRoom });
  } catch (error) {
    error.message = "Cannot find room";
    next(error);
  }
});

export default router;
