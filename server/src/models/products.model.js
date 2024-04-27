import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  // Assuming "ProductReview" is the correct model name
  review_id: {
    type: Schema.Types.ObjectId,
    ref: "ProductReview",
  },
});

const productSchema = new Schema(
  {
    added_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product_name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: 1,
    },
    product_title: {
      type: String,
      required: true,
      index: 1,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_status: {
      type: String,
      required: true,
      default: "in stock",
    },
    product_discount: {
      type: Number,
      required: true,
      default: 20,
    },
    product_quantity: {
      type: Number,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    product_brand: {
      type: String,
      required: true,
    },
    product_reviews: [reviewSchema],
    product_imageUrl: {
      type: String,
      required: true,
    },
    product_category:{
      type:String,
      required:true,
    }
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
