import jwt from "jsonwebtoken";
// import UserModel from "../models/userModel.js";
// import ErrorHandler from "../utils/errorHandler.js";

import ErrorHandler from "../utils/errorHandler.js";

// export const protectRoute = async (req, res, next) => {
//   try {
//     // get the token--
//     const token = req.cookies.token;
//     console.log("token from backend protected route", token)
//     // check token exists or not--
//     if (!token) {
//       return next(new ErrorHandler("Unauthorized", 401));
//     }
//     // decode or get data from token--
//     const decoded = jwt.verify(token, TOKEN_SECRET.JWT_SECRET_KEY);
//     // find the user--
//     const user = await UserModel.findById(decoded.id).select("-password");
//     // save the user to request object--
//     req.user = user;
//     // call the next middleware--
//     next();
//   } catch (err) {
//     return next(new ErrorHandler("Unauthorized", 500));
//   }
// };





export const protectRoute = async (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req.cookies.token;
    console.log("Token from cookies:", token);

    if (!token) {
      return next(new ErrorHandler("Unauthorized access", 401));
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded token:", decoded);

    // Find the user and attach to the request object
    const user = await UserModel.findById(decoded._id).select("-password");
    console.log("vai user", user);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Error in protectRoute:", err.message);
    return next(new ErrorHandler("Unauthorized access", 401));
  }
};