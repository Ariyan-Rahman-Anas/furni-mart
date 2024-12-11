import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    images: [
      {
        public_id: {
          type: String,
          required: [true, "Please provide the public ID for the image"],
        },
        url: {
          type: String,
          required: [true, "Please provide the URL for the image"],
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const BannerModel =
  mongoose.models.banners || mongoose.model("banners", bannerSchema);
export default BannerModel;