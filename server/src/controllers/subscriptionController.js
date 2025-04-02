import SubscriptionModel from "../models/subscriptionModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const makeSubscribed = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return next(new ErrorHandler("Please provide both name and email", 400))
        }

        const existingSubscriber = await SubscriptionModel.findOne({ email })
        if (existingSubscriber) {
            return next(new ErrorHandler("You are already subscribed", 400))
        }

        const newSubscriber = await SubscriptionModel.create({
            name,
            email
        })

        res.status(201).json({
            success: true,
            message: "Subscribed",
            newSubscriber
        })
    } catch (error) {
        next(error)
    }
}




export const getSubscribers = async (req, res, next) => {
    try {
        const subscribers = await SubscriptionModel.find({})
        if (subscribers.length < 1) {
            return next(new ErrorHandler("No subscribers found", 404))
        }
        
        res.status(200).json({
            success: true,
            message: "Subscribers Retrieved",
            totalSubscribers: subscribers.length,
            subscribers
        })
    } catch (error) {
        next(error)
    }
}


export const getSingleSubscriber = async (req, res, next) => {
    try {
        const subscriber = await SubscriptionModel.findOne({ email: req.params.email })
        if (!subscriber) {
            return next(new ErrorHandler("Subscriber not found", 404))
        }
        res.status(200).json({
            success: true,
            message: "Subscriber Retrieved",
            subscriber
        })
    } catch (error) {
        next(error)
    }
}