import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Hello, this is users endpoint");
});

export default router;
