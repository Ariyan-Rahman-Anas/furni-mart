import { OrderModel } from "../models/orderModel.js"
import PaymentTransactionModel from "../models/paymentTransactionModel.js";
import ErrorHandler from './../utils/errorHandler.js';

export const allOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find({});
    if (orders.length < 1) {
      return next(new ErrorHandler("There's no orders right now", 404));
    }
    return res.status(200).json({
      success: true,
      message: "All Order Retrieved",
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
}

export const getSingleOrder = async (req, res, next) => {
  try {
    const order = await OrderModel.findById(req.params.id)
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id",404))
    }
    return res.status(200).json({
      success: true,
      message: "An order details retrieved",
      order
    })
  } catch (error) {
    next(error)
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
      message: "User's orders retrieved",
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
}

export const deleteAnOrder = async (req, res, next) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }
    await order.deleteOne();
    return res.status(200).json({
      success: true,
      message: "An order deleted",
    });
  } catch (error) {
    next(error);
  }
};

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
      message: "Pending order retrieved",
      totalPendingOrders:pendingOrders.length,
      pendingOrders
    })
  } catch (error) {
    next(error)
  }
}

export const deletePendingTransaction = async (req, res, next) => {
  try {
    const pendingTransaction = await PaymentTransactionModel.findById(req.params.id)
    if (!pendingTransaction) {
      return next(new ErrorHandler("Transaction not found", 404));
    }
    await pendingTransaction.deleteOne()
    return res.status(200).json({
      success: true,
      message:"Pending transaction deleted"
    })
  } catch (error) {
    next(error)
  }
}