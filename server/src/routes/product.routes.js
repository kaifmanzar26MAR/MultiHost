import { Router } from "express";
import {
  AddProduct,
  AddReview,
  GetAllProducts,
  UpdateProduct,
  GetProductbyId,
  SearchProdcut,
  AddProductToCart,
  GetProdcutReviews,
  GetAllProductCategory,
  GetProductImageByCategory,
  GetProductsByCategory,
  RemoveProductFromCart,
} from "../controllers/product.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
//admin
router.route("/addproduct").post(AddProduct);
router.route("/updateproduct").post(UpdateProduct);

//user
router.route("/addreview").post(verifyJWT,AddReview);
router.route("/getallproducts").get(GetAllProducts);
router.route("/getproductbyid").post(GetProductbyId);
router.route("/getprodcutreviewbyid").post(GetProdcutReviews);
router.route("/search").post(SearchProdcut);
router.route("/addtocart").post(verifyJWT,AddProductToCart);
router.route("/getallproductcategory").get(GetAllProductCategory);
router
  .route(`/getproductimagebycategory/:category`)
  .get(GetProductImageByCategory);
router.route(`/getproductswithcategory/:category`).get(GetProductsByCategory);
router.route("/removeproductfromcart").post(verifyJWT,RemoveProductFromCart);
export default router;
