// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     const mongoUri = process.env.MONGO_URI;

//     // Check if DB_URI is defined
//     if (!mongoUri) {
//       throw new Error("DB_URI is not defined in environment variables.");
//     }

//     // Attempt to connect to MongoDB
//     await mongoose.connect(mongoUri);
//     console.log("MongoDB connected Successfully!");

//     // Optionally enable mongoose debugging in development
//     // if (process.env.NODE_ENV === 'development') {
//     //     mongoose.set('debug', true);  // Logs MongoDB queries
//     // }
//   } catch (error) {
//     console.error("MongoDB connection error: ", error);
//     process.exit(1);
//   }
// };


import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Fixed syntax
  }
};