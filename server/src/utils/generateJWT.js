import jwt from "jsonwebtoken";

const JwtSecret = process.env.TOKEN_SECRET || "my_secret_key";
const jwtExpiry = process.env.JWT_TOKEN_EXPIRY || "1h";
const cookieExpiry = parseInt(process.env.COOKIE_EXPIRY || "7", 10); 

// Function to generate a JWT token
export const generateToken = (userId) => {
    try {
        return jwt.sign({ id: userId }, JwtSecret, { expiresIn: jwtExpiry });
    } catch (err) {
        console.error("Error generating JWT token:", err);
        throw new Error("Token generation failed");
    }
};

// Function to send the token as a cookie
export const sendTokenInCookie = (res, userId) => {
    const token = generateToken(userId);

    // Send token in cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
        maxAge: cookieExpiry * 24 * 60 * 60 * 1000,
    });
};