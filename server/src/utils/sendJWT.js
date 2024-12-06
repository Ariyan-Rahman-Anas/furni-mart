// import jwt from "jsonwebtoken";

// export const sendJwtToken = (res, payload) => {
//   // Create token
//   const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
//     expiresIn: process.env.JWT_TOKEN_EXPIRY,
//   });

//   // Calculate cookie expiration date (7 days)
//   const cookieExpiryDate = new Date();
//   cookieExpiryDate.setSeconds(
//     cookieExpiryDate.getSeconds() + parseInt(process.env.JWT_COOKIE_EXPIRY)
//   );

//   // Cookie options
//   const options = {
//     httpOnly: true,
//     expires: cookieExpiryDate, // Set cookie
//     secure: true,
//     sameSite: "None",
//   };

//   // Set the cookie with token
//     res.cookie("token", token, options);
    
//     return token
// };



import jwt from "jsonwebtoken";

export const sendJwtToken = (res, payload) => {
  console.log("payload", payload)
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRY, // e.g., "15m"
  });

  const cookieExpiryDate = new Date();
  cookieExpiryDate.setSeconds(
    cookieExpiryDate.getSeconds() + parseInt(process.env.JWT_COOKIE_EXPIRY) // e.g., 604800 for 7 days
  );

  // const options = {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production", // Enable in production only
  //   sameSite: "None",
  //   expires: cookieExpiryDate,
  // };

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only for HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Adjust for dev
      expires: cookieExpiryDate,
    };

  res.cookie("token", token, options);
  return token;
};