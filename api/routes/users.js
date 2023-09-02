import express from "express";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//check authenticated user
router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.status(200).json({ message: "User Authenticated!" });
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.status(200).json({ message: "You are Authenticated!" });
});

//update users
router.put("/:id", async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ message: "Found users!", users });
  } catch (error) {
    next(error);
  }
});

//find one user
router.get("/:id", async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id);
    res.status(200).json({ message: "Found user!", foundUser });
  } catch (error) {
    error.message = "Cannot find user";
    next(error);
  }
});

//delete users
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete(req.params.id);

    res.status(200).json({ message: "Succesfully deleted user", deletedUser });
  } catch (error) {
    next(error);
  }
});

export default router;
