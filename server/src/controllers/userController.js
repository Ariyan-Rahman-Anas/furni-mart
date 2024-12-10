import ErrorHandler from "../utils/errorHandler.js";
import { sendJwtToken } from "../utils/sendJWT.js";
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
      return next(new ErrorHandler("Address must not exceed 20 characters",400));
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


// export const login = async(req, res, next)=>{
//     try {
//       const { email, password } = req.body;

//       if (!email || !password) {
//         return next(new ErrorHandler("All fields are required", 400));
//       }

//       const user = await UserModel.findOne({ email });
//       if (!user) {
//         return next(
//           new ErrorHandler("User does not exist with this email", 404)
//         );
//       }

//       const validPassword = await bcrypt.compare(password, user.password);

//       if (!validPassword) {
//         return next(new ErrorHandler("Invalid password", 401));
//       }

//       const token = sendJwtToken(res, {
//         _id: user._id,
//         email: user.email,
//       });

//       // Return success response
//       res.status(200).json({
//         success: true,
//         message: `Welcome back, ${user.name}`,
//         token,
//         user,
//       });

//     } catch (error) {
//         next(error);
//     }
// }

// export const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return next(new ErrorHandler("All fields are required", 400));
//     }

//     const user = await UserModel.findOne({ email }).select("+password");
//     if (!user) {
//       return next(new ErrorHandler("Invalid email or password", 401)); // Generic error message
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return next(new ErrorHandler("Invalid email or password", 401));
//     }

//     // Generate JWT token and set cookie
//     const token = sendJwtToken(res, { _id: user._id, email: user.email });

//     // Remove sensitive fields from the user object
//     const { password: _, ...filteredUser } = user.toObject();

//     // Send response
//     res.status(200).json({
//       success: true,
//       message: `Welcome back, ${user.name}`,
//       token,
//       user: filteredUser,
//     });
//   } catch (error) {
//     next(error);
//   }
// };



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
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day in milliseconds
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



export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out Successfully" });
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
      message: "All users retrieved successfully",
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
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}