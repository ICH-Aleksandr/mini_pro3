import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import balanceRoutes from "./routes/balanceRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/balance", balanceRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
