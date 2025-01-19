import ErrorHandler from "../utils/errorHandler.js";


export const isSuperAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return next(new ErrorHandler("User not authenticated", 401));
    }
    if (req.user.role !== "superAdmin") {
      return next(new ErrorHandler("Only Super Admin can take this action.", 403));
    }
    next();
  } catch (error) {
    next(error);
  }
};


export const isAdminOrSuperAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return next(new ErrorHandler("User not authenticated", 401));
    }

    if (req.user.role !== "admin" && req.user.role !== "superAdmin") {
      return next(new ErrorHandler("Access denied: Admins only", 403));
    }

    next();
  } catch (error) {
    next(error);
  }
};