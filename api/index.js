import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import cookierParser from "cookie-parser";
import cors from "cors";

//instances
dotenv.config();
const app = express();
const port = 3000;

//mongoose connection

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongodb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from Mongodb");
});

// MIDDLEWARES //

// //configure cors options
// const corsOptions = {
//   origin: "http://localhost:3000",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// };

//enable cors
app.use(cors());

//parse-cookies
app.use(cookierParser());

//parse json requests
app.use(express.json());

//routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/hotels", hotelsRoute);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;

  const errorMesasge = error.message || "An error occured";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMesasge,
    stack: error.stack,
  });
});

//connect to mongodb database
connectToDatabase();

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
