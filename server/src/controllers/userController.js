import ErrorHandler from "../utils/errorHandler.js";
import { sendJwtToken } from "../utils/sendJWT.js";
import UserModel from './../models/userModel.js';
import bcrypt from "bcryptjs";

export const registration = async(req, res, next)=>{
  try {
      const { name, email, password } = req.body;
      // const { name, email, password } = reqBody;
    //   if (!name || !email || !password) {
    //     return next(new ErrorHandler("All fields are required", 400));
    //   }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
          return next(
            new ErrorHandler(
              `You're already registered with ${email}, please log in`,
              409
            ));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with isVerified: false
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    await newUser.save();

    // Send verification email
    // await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });
      
      return res.status(201).json({
        success: true,
        message: `Welcome, ${newUser.name}`,
      });

  } catch (error) {
    next(error);
  }
}


export const login = async(req, res, next)=>{
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("All fields are required", 400));
      }

      const user = await UserModel.findOne({ email });
      if (!user) {
        return next(
          new ErrorHandler("User does not exist with this email", 404)
        );
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return next(new ErrorHandler("Invalid password", 401));
      }

      const token = sendJwtToken(res, {
        _id: user._id,
        email: user.email,
      });
        
      // Return success response
      res.status(200).json({
        success: true,
        message: `Welcome back, ${user.name}`,
        token,
        user,
      });
        
    } catch (error) {
        next(error);
    }
}


export const logout = async (req, res, next) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "Logged out Successfully" });
    } catch (error) {
        next(error)
    }
}