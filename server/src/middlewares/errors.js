export const errorsMiddleware = (err, req, res, next) => {
  let message;
  console.log("err isss", err)
  if (err.name === "CastError") err.message = "Invalid ID123";
  message = err.message || "Internal server error";
  const statusCode = err.statusCode || 500;
  console.log(err);
  return res.status(statusCode).json({
    success: false,
    message,
  });
};