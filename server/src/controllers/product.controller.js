import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/products.model.js";
import { User } from "../models/user.model.js";
import { ProductReview } from "../models/productReview.model.js";

const AddProduct = asyncHandler(async (req, res) => {
  const {
    product_name,
    added_by,
    product_title,
    product_price,
    product_discount,
    product_quantity,
    product_description,
    product_brand,
    product_imageUrl,
    product_category,
  } = req.body;
  // console.log(
  //   product_name,
  //   added_by,
  //   product_title,
  //   product_price,
  //   product_discount,
  //   product_quantity,
  //   product_description,
  //   product_brand,
  //   product_imageUrl,
  //   product_category
  // )
  if (
    [
      product_name,
      added_by,
      product_title,
      product_description,
      product_brand,
      product_imageUrl,
      product_category,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (product_quantity <= 0) {
    throw new ApiError(500, "Product quantity cant be less or equal to 0");
  }
  if (product_discount <= 0) {
    throw new ApiError(500, "Product discount cant be less or equal to 0");
  }
  if (product_price <= 0) {
    throw new ApiError(500, "Product price cant be less or equal to 0");
  }

  const isProducteists = await Product.findOne({ product_name });
  if (isProducteists) {
    throw new ApiError(500, "Prodcut already exists");
  }

  const isuserexists = await User.findOne({ _id: added_by });
  if (!isuserexists) {
    throw new ApiError(500, "User not found");
  }

  const newProduct = await Product.create({
    product_name,
    added_by,
    product_title,
    product_price,
    product_discount,
    product_quantity,
    product_description,
    product_brand,
    product_imageUrl,
    product_category,
  });

  if (!newProduct) {
    throw new ApiError(500, "Something went worng in creating Product");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, newProduct, "Prodcut created Successfully"));
});

const UpdateProduct = asyncHandler(async (req, res) => {
  const { _id, datatoupdate } = req.body;

  const isProductexists = await Product.findOne({ _id });
  if (!isProductexists) {
    throw new ApiError(500, "Prodcut not Found");
  }

  const updatedProduct = await Product.findOneAndUpdate({ _id }, datatoupdate, {
    new: true,
  });

  if (!updatedProduct) {
    throw new ApiError(500, "Something went wrong in updation of Prodcut");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, updatedProduct, "Prodcut updated Successfully"));
});

const AddReview = asyncHandler(async (req, res) => {
  const { product_id, reviewtext, ratings } = req.body;

  if ([product_id, reviewtext].some((field) => field?.trim() === "")) {
    throw new ApiError(500, "All fields must be filled properly");
  }

  const isuserexists = await User.findOne({ _id: req.user_id });
  if (!isuserexists) {
    throw new ApiError(500, "User not found");
  }

  const isproductexists = await Product.findOne({ _id: product_id });
  if (!isproductexists) {
    throw new ApiError(500, "Product not found");
  }

  const newreview = await ProductReview.create({
    user_id: req.user_id,
    product_id,
    reviewtext,
    ratings,
    user_name: isuserexists.username,
  });

  if (!newreview) {
    throw new ApiError(
      500,
      "Something went wrong in the creation of the review"
    );
  }

  const review_id = newreview._id;

  const addReviewResult = await Product.updateOne(
    { _id: product_id },
    { $push: { product_reviews: { review_id } } }
  );

  if (!addReviewResult) {
    throw new ApiError(500, "Something went wrong in updating review result");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, addReviewResult, "Review added successfully"));
});

const GetProdcutReviews = asyncHandler(async (req, res) => {
  const { review_id } = req.body;
  const review = await ProductReview.findOne({ _id: review_id });
  if (!review) {
    throw new ApiError(500, "No Review found as per the id");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, review, "Review Found Successfully"));
});

const GetAllProducts = asyncHandler(async (req, res) => {
  const allprodcuts = await Product.find();
  return res
    .status(201)
    .json(new ApiResponse(200, allprodcuts, "Successfully got all prodcut"));
});

const GetProductbyId = asyncHandler(async (req, res) => {
  const { product_id } = req.body;
  // console.log("back", product_id.toString());
  const product = await Product.findOne({ _id: product_id });
  // console.log(product);
  if (!product) {
    throw new ApiError(500, "Product not found");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, product, "Successfully got the product"));
});

const SearchProdcut = asyncHandler(async (req, res) => {
  const { key } = req.body;
  const allprodcuts = await Product.find();
  const filteredProducts = allprodcuts.filter((product) =>
    product.product_name.toLowerCase().includes(key.toLowerCase())
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        filteredProducts,
        "Successfully got the prodcut with key"
      )
    );
});

const AddProductToCart = asyncHandler(async (req, res) => {
  const { product_id, quantity } = req.body;

  if ([product_id].some((field) => field?.trim() === "")) {
    throw new ApiError(500, "Please fill the required fields");
  }
  // console.log(req.user_id.toString());
  const isUser = await User.findOne({ _id: req.user_id });

  if (!isUser) {
    throw new ApiError(500, "User Not Found ");
  }

  const isProductInCart = isUser.cart.find(
    (product) => product.product_id.toString() === product_id.toString()
  );
  // console.log(isProductInCart, isUser, isUser.cart)
  if (!isProductInCart) {
    isUser.cart.push({ product_id, quantity });

    const saveUser = await isUser.save();
    if (!saveUser) {
      throw new ApiError(500, "Something went worng in adding of product");
    }
    return res
      .status(201)
      .json(
        new ApiResponse(200, saveUser, "Prodcut added to cart Successfully")
      );
  } else {
    const indexOfCartElement = isUser.cart.findIndex(
      (items) => items.product_id.toString() === product_id.toString()
    );
    isUser.cart[indexOfCartElement] = {
      product_id,
      user_id: req.user_id,
      quantity,
    };
    const updatedElement = await isUser.save();
    console.log(updatedElement);
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          updatedElement,
          "Product updated in the cart successfully"
        )
      );
  }
});

const GetAllProductCategory = asyncHandler(async (req, res) => {
  const allproducts = await Product.find();
  if (!allproducts) {
    throw new ApiError(500, "Error in getting Products");
  }

  const categoriesSet = new Set(
    allproducts.map((product) => {
      return product.product_category;
    })
  );
  const categories = [...categoriesSet];
  // console.log(categories)
  return res
    .status(201)
    .json(new ApiResponse(200, categories, "got all categories successfully"));
});

const GetProductImageByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;

  if ([category].some((field) => field.trim() === ""))
    throw new ApiError(500, "Couldn't find category");
  // console.log(category);
  const productWithCategory = await Product.findOne({
    product_category: category,
  });
  if (!productWithCategory) {
    throw new ApiError(500, "Couldn't find Products with category ", category);
  }
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        productWithCategory.product_imageUrl,
        "Got product image successfully"
      )
    );
});

const GetProductsByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;
  if ([category].some((field) => field.trim() === ""))
    throw new ApiError(500, "Couldn't find category");

  const allprodcuts = await Product.find({ product_category: category });
  if (!allprodcuts) {
    throw new ApiError(500, "Not Found Products!!");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, allprodcuts, "Got all product as per Category"));
});

const RemoveProductFromCart = asyncHandler(async (req, res) => {
  const { product_id } = req.body;
  // console.log(user_id, product_id)
  const user = await User.findOne({ _id: req.user_id });

  if (!user) throw new ApiError(500, "Couldn't find User");

  const userCart = user.cart;

  const updatedCart = userCart.filter((item) => item.product_id != product_id);

  // console.log(updatedCart);

  const updateResponse = await User.findOneAndUpdate(
    { _id: req.user_id },
    { cart: updatedCart },
    { new: true } // Return the updated document
  );

  if (!updateResponse) throw new ApiError(500, "Error in updation of Cart");

  return res
    .status(201)
    .json(new ApiResponse(200, updatedCart, "Cart Updated Successfully"));
});

export {
  AddProduct,
  UpdateProduct,
  AddReview,
  GetAllProducts,
  GetProductbyId,
  SearchProdcut,
  AddProductToCart,
  GetProdcutReviews,
  GetAllProductCategory,
  GetProductImageByCategory,
  GetProductsByCategory,
  RemoveProductFromCart,
};
