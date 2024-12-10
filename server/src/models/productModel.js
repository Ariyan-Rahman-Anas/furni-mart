import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the product name"],
    },
    description: {
      type: String,
      required: [true, "Please enter the product description"],
    },
    category: {
      type: String,
      enum: ["Home Furniture", "Office Furniture"],
      required: [true, "Please select a product category"],
    },
    subCategory: {
      type: String,
      enum: [
        "Almirah",
        "Bed",
        "Bed Side Table",
        "Bed Room Chair",
        "Chest Of Drawer",
        "Center Table",
        "Dressing Table",
        "Dining Table",
        "Dining Chair",
        "Divan",
        "Showcase",
        "Sofa",
        "TV Trolly",
        "Side Board",
        "Rocking Chair",
        "Reading Table",
        "Shoe Shelf",
        "Telephone Table",
        "Tea Trolly",
        "Oven Stand",
        "Coat Stand",
        "Iron Stand",
        "Magazine Shelf & Trolly",
        "Showpiece Stand",
        "Chair Seater",
        "Side Rack",
        " Conference Table",
        "Director Table",
        "Drawer Unit",
        "Office Sofa",
        "Office Table",
        "File Cabinet",
        "Work Station",
        "Computer Table",
        "Visitor Chair",
        "Swivel Chair",
        "Waiting Chair",
        "Auditorium Chair",
        "Classroom Chair",
      ],
      required: [true, "Please select a product sub category"],
    },
    brand: {
      type: String,
      required: [true, "Please enter the product's brand"],
    },
    color: {
      type: String,
      required: [true, "Please select at least one color for the product"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    variants: [
      {
        size: {
          type: String,
        },
        price: {
          type: Number,
          required: [true, "Please enter the price for this variant"],
        },
        stock: {
          type: Number,
          required: [true, "Please enter the stock quantity"],
          default: 1,
        },
        dimensions: {
          length: {
            type: Number,
            required: [true, "Please enter the length of the product"],
          },
          width: {
            type: Number,
            required: [true, "Please enter the width of the product"],
          },
          height: {
            type: Number,
            required: [true, "Please enter the height of the product"],
          },
        },
        weight: {
          type: Number,
          required: [true, "Please enter the weight of the product"],
        },
        materials: {
          primary: {
            type: String,
            required: [true, "Please specify the primary material"],
          },
          secondary: {
            type: String,
          },
        },
      },
    ],
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
    averageRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const ProductModel =
  mongoose.models.products || mongoose.model("products", productSchema);
export default ProductModel;