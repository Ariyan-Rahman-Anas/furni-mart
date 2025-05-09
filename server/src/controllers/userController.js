import ErrorHandler from "../utils/errorHandler.js";
import { generateToken, sendTokenInCookie } from "../utils/generateJWT.js";
import UserModel from './../models/userModel.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registration = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (phone?.toString().length > 11) {
      return next(
        new ErrorHandler("Phone number must not exceed 11 digits", 400)
      );
    }
    if (phone?.toString().length < 11) {
      return next(
        new ErrorHandler("Phone number must be exactly 11 digits", 400)
      );
    }
    if (address.length > 20) {
      return next(new ErrorHandler("Address must not exceed 20 characters", 400));
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return next(
        new ErrorHandler(
          `You're already registered with ${email}, please log in`,
          409
        ));
    }


    // Step 1: Check for minimum length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Step 2: Check for at least one letter (uppercase or lowercase)
    if (!/[A-Za-z]/.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least one letter",
      });
    }

    // Step 3: Check for at least one number
    if (!/\d/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one number",
      });
    }

    // Step 4: Check for at least one special character
    if (!/[@$!%*?&]/.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least one special character",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with isVerified: false
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
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


export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return next(
        new ErrorHandler("Please provide both email and password", 400)
      );
    }

    // Find user by email
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    // Compare passwords
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRY || "1d",
    });

    // Set the token in an HTTP-only cookie
    const cookieExpiryDays = parseInt(process.env.COOKIE_EXPIRY) || 7;
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
      maxAge: cookieExpiryDays * 24 * 60 * 60 * 1000,
    });

    // Send response
    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}`,
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};


export const googleAuth = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {
      // Generate JWT token
      const token = generateToken(user._id.toString());

      // Set the token in an HTTP-only cookie
      sendTokenInCookie(res, user._id.toString());

      // Send response
      res.status(200).json({
        success: true,
        message: `Welcome back, ${user.name}`,
        token,
        user,
      });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      const newUser = await UserModel.create({
        name: req.body.name, 
        email: req.body.email,
        password: hashedPassword, 
      });

      const token = generateToken(newUser._id.toString());
      sendTokenInCookie(res, newUser._id.toString());
      return res.status(200).json({
        success: true,
        message: `Welcome ${newUser.name}`,
        user: newUser,
        token,
      });
    }
  } catch (error) {
    next(error)
  }
}


export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged Out" });
  } catch (error) {
    next(error)
  }
}


export const allUser = async (req, res, next) => {
  try {
    const users = await UserModel.find({})
    if (users.length < 1) {
      return next(new ErrorHandler("There is no user yet", 404));
    }
    return res.status(200).json({
      success: true,
      message: "All Users Retrieved",
      totalUser: users.length,
      users
    })
  } catch (error) {
    next(error)
  }
}


export const deleteUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    await user.deleteOne();
    return res.status(200).json({
      success: true,
      message: "User Deleted",
    });
  } catch (error) {
    next(error);
  }
}