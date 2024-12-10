import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("user from is auth", req.user)

    if (!token) {
      return next(
        new ErrorHandler("You must log in to access this resource", 401)
      );
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await UserModel.findById(decoded.id);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(
        new ErrorHandler("Session expired. Please log in again.", 401)
      );
    }
    next(error);
  }
};