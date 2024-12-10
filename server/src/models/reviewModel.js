import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        rating: {
            type: Number,
            required: [true, "Please provide a rating between 1 and 5"],
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            maxlength: 1000,
            required: true,
        },
    },
    { timestamps: true }
);

const ReviewModel =
    mongoose.models.reviews || mongoose.model("reviews", reviewSchema);
export default ReviewModel;
