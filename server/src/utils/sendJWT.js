// import jwt from "jsonwebtoken";

// export const sendJwtToken = (res, payload) => {
//   // create token--
//   const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
//     expiresIn: process.env.JWT_TOKEN_EXPIRY,
//   });
//   // option for cookie--
//   const options = {
//     httpOnly: true,
//     expiresIn: process.env.JWT_COOKIE_EXPIRY,
//     secure: true,
//     sameSite: "None",
//   };

//   // Set the cookie options
//   res.cookie("token", token, options);
// };





import jwt from "jsonwebtoken";

export const sendJwtToken = (res, payload) => {
  // Create token with 7-day expiry
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRY, // 7 days expiry
  });    

  // Calculate cookie expiration date (7 days)
  const cookieExpiryDate = new Date();
  cookieExpiryDate.setSeconds(
    cookieExpiryDate.getSeconds() + parseInt(process.env.JWT_COOKIE_EXPIRY)
  );

  // Cookie options
  const options = {
    httpOnly: true,
    expires: cookieExpiryDate, // Set cookie expiry to 7 days
    secure: true,
    // secure: process.env.NODE_ENV === "production", // Only set `secure: true` in production
    sameSite: "None", // Allow cross-site cookies (for subdomains or cross-site)
  };

  // Set the cookie with token
    res.cookie("token", token, options);
    
    return token
};