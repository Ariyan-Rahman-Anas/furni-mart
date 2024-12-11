import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "./src/utils/connectDB.js";
import { errorsMiddleware } from "./src/middlewares/errors.js";

dotenv.config();

// all routes
import userRouter from "./src/routes/userRoute.js";
import productRouter from "./src/routes/productRoute.js";
import paymentRouter from "./src/routes/paymentRoute.js"
import orderRouter from "./src/routes/orderRoute.js"
import couponRouter from "./src/routes/couponRoute.js"
import reviewRouter from "./src/routes/reviewRoute.js"
import bannerRouter from "./src/routes/bannerRoute.js"



const port = process.env.PORT || 5001;
const app = express();

// Middleware
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5174"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running perfectly.",
    availableRoutes: [
      "/api/user",
      "/api/product",
      "/api/order",
      "/api/payment",
      "/api/admin",
    ],
  });
});

// Use routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/orders", orderRouter);
app.use("/api/coupons", couponRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/banners", bannerRouter);



// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Error handling middleware
app.use(errorsMiddleware);

// Start server only if DB is connected
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Fixed syntax
  });