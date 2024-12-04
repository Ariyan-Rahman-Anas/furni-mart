import { OrderModel } from "../models/orderModel.js"
import PaymentTransactionModel from "../models/paymentTransactionModel.js";
import ErrorHandler from './../utils/errorHandler.js';

export const allOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find({});
    if (orders.length < 1) {
      return next(new ErrorHandler("There's no order yet", 404));
    }
    return res.status(200).json({
      success: true,
      message: "All order retrieved successfully",
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
}

export const anUserOrders = async (req, res, next) => {
  try {
    const userEmail = req.query.email;
    if (!userEmail) {
      return next(new ErrorHandler("Please provide your email"));
    }
    const orders = await OrderModel.find({ user: userEmail });
    if (orders.length < 1) {
      return next(new ErrorHandler("You've not made any order yet", 404));
    }
    return res.status(200).json({
      success: true,
      message: "User's orders retrieved successfully",
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
}


export const getTransactionPendingOrders = async (req, res, next) => {
  try {
    const pendingOrders = await PaymentTransactionModel.find({
      status: "PENDING",
    });
    if (pendingOrders.length < 1) {
      return next(
        new ErrorHandler("There is no pending orders right now", 404)
      );
    }
    return res.status(200).json({
      success: false,
      message: "Pending order retrieved successfully",
      pendingOrders
    })
  } catch (error) {
    next(error)
  }
}