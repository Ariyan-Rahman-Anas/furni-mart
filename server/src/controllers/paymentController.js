import sslcommerz from "sslcommerz-lts";
import { ObjectId } from "mongodb";
import UserModel from "./../models/userModel.js";
import ProductModel from "./../models/productModel.js";
import PaymentTransactionModel from "../models/paymentTransactionModel.js";
import { OrderModel } from "../models/orderModel.js";

export const createPaymentWithSSL = async (req, res, next) => {
  // console.log("body", req.body);

  const store_id = process.env.SSL_STORE_ID;
  const store_passwd = process.env.SSL_STORE_PASS;
  const is_live = false; // true for live, false for sandbox

  try {
    const userInfo = await UserModel.findById(req.body.billingInfo.userId);
    const shippingInfo = req.body.shippingInfo;
    const orderedItems = req.body.orderedItems;
    const transactionId = new ObjectId().toString();

    const productsIdsArray = orderedItems.map((item) => item._id);

    // Fetch the products from the database
    const products = await ProductModel.find({
      _id: { $in: productsIdsArray },
    });

    // Calculate total price based on the ordered variants
    let calculatedTotal = 0;

    for (const item of orderedItems) {
      const product = products.find((p) => p._id.toString() === item._id);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product with ID ${item._id} not found`,
        });
      }

      // Find the specific variant
      const variant = product.variants.find(
        (v) => v._id.toString() === item.variantId
      );
      if (!variant) {
        return res.status(400).json({
          success: false,
          message: `Variant with ID ${item.variantId} not found for product ${product.name}`,
        });
      }

      // Add the variant price multiplied by quantity
      calculatedTotal += variant.price * item.quantity;
    }

    // Subtract discount from the calculated total
    calculatedTotal -= req.body.discount;

    // Compare calculated total with the total in the request
    if (calculatedTotal !== req.body.total) {
      return res.status(400).json({
        success: false,
        message: `Calculated total (${calculatedTotal}) does not match provided total (${req.body.total})`,
      });
    }

    // Proceed with payment if totals match
    const initiateData = {
      total_amount: req.body.total,
      currency: req.body.currency,
      tran_id: transactionId,
      success_url: `${process.env.SERVER_URL}/api/payments/success`,
      fail_url: `${process.env.SERVER_URL}/api/payments/failed`,
      cancel_url: `${process.env.SERVER_URL}/api/payments/cancel`,
      cus_name: userInfo.name,
      cus_email: userInfo.email,
      cus_add1: shippingInfo.address,
      cus_state: shippingInfo.state,
      cus_city: shippingInfo.city,
      cus_postcode: shippingInfo.zipCode,
      cus_country: shippingInfo.country,
      cus_phone: shippingInfo.mobile,
      shipping_method: "NO",
      product_name: orderedItems.map((item) => item.name).join(", "),
      product_category: orderedItems.map((item) => item.category).join(", "),
      discount_amount: req.body.discount,
      product_profile: orderedItems.map((item) => item.image).join(", "),
      product_type: JSON.stringify(orderedItems),
      ship_country: shippingInfo.country,
      multi_card_name: "mastercard,visacard,amexcard",
    };

    // Save transaction details in a database
    await PaymentTransactionModel.create({
      transactionId,
      initiateData,
      status: "PENDING",
    });

    const sslcz = new sslcommerz(store_id, store_passwd, is_live);
    sslcz
      .init(initiateData)
      .then((apiRes) => {
        const GatewayPageURL = apiRes.GatewayPageURL;
        res.send({ url: GatewayPageURL });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Payment initialization failed",
          error: error.message,
        });
      });
  } catch (error) {
    next(error);
  }
};


export const paymentSuccess = async (req, res, next) => {
  const { status, tran_id } = req.body;
  // console.log("body:", req.body)

  try {
    if (status === "VALID") {
      const transaction = await PaymentTransactionModel.findOne({
        transactionId: tran_id,
        status: "PENDING",
      });

      if (!transaction) {
        return res.status(404).json({
          success: false,
          message: "Transaction not found or already processed",
        });
      }

      // Mark transaction as "COMPLETED"
      transaction.status = "COMPLETED";
      await transaction.save();

      // Call Order API with the initiateData
      const { initiateData } = transaction;
      console.log("initiateData", initiateData);

      // Check stock before placing the order
      // for (let i = 0; i < orderedItems.length; i++) {
      //   const order = orderedItems[i];
      //   const product = await ProductModel.findById(order.productId).session(
      //     session
      //   );

      //   if (!product) {
      //     throw new ErrorHandler(
      //       `Product not found: ${order.name}, Id: ${order.productId}`,
      //       404
      //     );
      //   }

      //   if (product.stock < order.quantity) {
      //     throw new ErrorHandler(`Not enough stock for ${product.name}`, 400);
      //   }

      //   // Adjust stock within the same transaction
      //   product.stock -= order.quantity;
      //   await product.save({ session });
      // }

      // Create an order using the stored initiateData
      await OrderModel.create({
        user: initiateData.cus_email,
        paymentInfo: initiateData,
        status: "Confirmed",
      });

      console.log("Payment successful and order placed");

      // res.status(200).json({
      //   success: true,
      //   message: "Payment successful and order placed",
      //   order,
      // });
      res.redirect(`${process.env.CLIENT_URL}/payment-success`);
    } else {
      res.status(400).json({
        success: false,
        message: "Payment not valid",
      });
    }
  } catch (error) {
    next(error);
  }
};



export const paymentFailed = async (req, res, next) => {
  try {
    console.log("Payment Failed:", req.body);
    res.redirect(`${process.env.CLIENT_URL}/payment-failed`);
  } catch (error) {
    next(error);
  }
};



export const paymentCancel = async (req, res, next) => {
  try {
    console.log("Payment Cancelled:", req.body);
    res.redirect(`${process.env.CLIENT_URL}/payment-cancel`);
  } catch (error) {
    next(error);
  }
};