import sslcommerz from "sslcommerz-lts";
import { ObjectId } from "mongodb";
import UserModel from "./../models/userModel.js";
import ProductModel from "./../models/productModel.js";
import PaymentTransactionModel from "../models/paymentTransactionModel.js";

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
      cus_add2: shippingInfo.address,
      cus_city: shippingInfo.city,
      cus_state: shippingInfo.state,
      cus_postcode: shippingInfo.zipCode,
      cus_country: shippingInfo.country,
      cus_phone: shippingInfo.mobile,
      shipping_method: "NO",
      product_name: orderedItems.map((item) => item.name).join(", "),
      product_category: orderedItems.map((item) => item.category).join(", "),
      discount_amount: req.body.discount,
      product_profile: orderedItems.map((item) => item.image).join(", "),
      ship_name: userInfo.name,
      ship_add1: shippingInfo.address,
      ship_add2: shippingInfo.address,
      ship_city: shippingInfo.city,
      ship_state: shippingInfo.state,
      ship_postcode: shippingInfo.zipCode,
      ship_country: shippingInfo.country,
      multi_card_name: "mastercard,visacard,amexcard",
    };

    // Save transaction details in a database
    await PaymentTransactionModel.create({
      transactionId,
      initiateData,
      status: "PENDING", // Initial status
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

  try {
    // Verify that the payment status is "VALID"
    if (status === "VALID") {
      // Retrieve the transaction details from the database
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

      // Call your Order API with the initiateData
      // const response = await axios.post(`${process.env.ORDER_API_URL}`, {
      //   ...transaction.initiateData,
      // });

      res.status(200).json({
        success: true,
        message: "Payment successful and order placed",
        // orderResponse: response.data,
      });
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





export const paymentSuccess2 = async (req, res, next) => {
  try {
    // const data = req.body
    // console.log("Payment Successful:", req.body);

    // if (data.status === "VALID") {

    // }
      res.redirect(`${process.env.CLIENT_URL}/payment-success`);
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