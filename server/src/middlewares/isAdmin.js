import ErrorHandler from "../utils/errorHandler.js";

export const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return next(new ErrorHandler("User not authenticated", 401));
    }

    if (req.user.isAdmin !== true) {
      return next(new ErrorHandler("Access denied: Admins only", 403));
    }

    next();
  } catch (error) {
    next(error);
  }
};