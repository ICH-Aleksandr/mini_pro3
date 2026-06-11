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

router.post("/add-balance", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (amount === undefined || amount === null) {
      return res
        .status(400)
        .json({ success: false, message: "Amount is required" });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be a positive number" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.currentBalance += amount;
    user.transactions.push({ type: "income", amount });

    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/add-expense", async (req, res) => {
  try {
  } catch (error) {}
});

router.get("/balance", async (req, res) => {
  try {
  } catch (error) {}
});

export default router;
