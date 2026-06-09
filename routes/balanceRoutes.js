import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/set-balance", async (req, res) => {
  try {
    const { initialBalance } = req.body;

    if (initialBalance === undefined || initialBalance === null) {
      return res
        .status(400)
        .json({ success: false, message: "Initial balance is required" });
    }

    if (typeof initialBalance !== "number") {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect opening balance" });
    }

    if (initialBalance < 0) {
      return res.status(400).json({
        success: false,
        message: "Initial balance cannot be negative",
      });
    }

    const user = new User({
      initialBalance,
      currentBalance: initialBalance,
      transactions: [],
    });

    await user.save();

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
