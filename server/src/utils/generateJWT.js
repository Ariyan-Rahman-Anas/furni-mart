import jwt from "jsonwebtoken";

const cookieExpiry = parseInt(process.env.COOKIE_EXPIRY || "7", 10); 

// Function to generate a JWT token
export const generateToken = (userId) => {
    try {
        return jwt.sign({ id: userId }, process.env.TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRY});
    } catch (err) {
        console.error("Error generating JWT token:", err);
        throw new Error("Token generation failed");
    }
};

// Function to send the token as a cookie
export const sendTokenInCookie = (res, userId) => {
    const token = generateToken(userId);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
        maxAge: cookieExpiry * 24 * 60 * 60 * 1000,
    });
};