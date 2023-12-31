import express from "express";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//update users
router.put("/:id", verifyUser, async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
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
      .json({ message: "Successfully updated user!", updatedUser });
  } catch (error) {
    next(error);
  }
});

//find all users
router.get("/", verifyAdmin, async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
});

//find one user
router.get("/:id", verifyUser, async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id);
    res.status(200).json({ message: "Found user!", foundUser });
  } catch (error) {
    error.message = "Cannot find user";
    next(error);
  }
});

//delete users
router.delete("/:id", verifyUser, async (req, res, next) => {
  try {
    const deletedUser = await User.findOneAndDelete(req.params.id);

    res.status(200).json({ message: "Succesfully deleted user", deletedUser });
  } catch (error) {
    next(error);
  }
});

export default router;
