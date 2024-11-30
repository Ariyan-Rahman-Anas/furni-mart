import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const protectRoute = async (req, res, next) => {
  try {
    // get the token--
    const token = req.cookies.token;
    // check token exists or not--
    if (!token) {
      return next(new ErrorHandler("Unauthorized", 401));
    }
    // decode or get data from token--
    const decoded = jwt.verify(token, TOKEN_SECRET.JWT_SECRET_KEY);
    // find the user--
    const user = await UserModel.findById(decoded.id).select("-password");
    // save the user to request object--
    req.user = user;
    // call the next middleware--
    next();
  } catch (err) {
    return next(new ErrorHandler("Unauthorized", 500));
  }
};