import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

//register route

router.post("/register", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully!", newUser });
  } catch (error) {
    next(error);
  }
});

//login route

router.post("/login", async (req, res, next) => {
  const username = req.body.username;
  const userPassword = req.body.password;

  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) return next(createError(401, "No user found"));

    const isPasswordCorrect = await bcrypt.compare(
      userPassword,
      foundUser.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Incorrect Credentials"));

    const token = jwt.sign(
      { id: foundUser._id, isAdmin: foundUser.isAdmin },
      process.env.JWT_KEY
    );

    const { password, isAdmin, ...userDetails } = foundUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ message: "successfully signed in!", ...userDetails });
  } catch (error) {
    next(error);
  }
});

export default router;
