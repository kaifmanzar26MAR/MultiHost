import React from "react";
import { Link } from "react-router-dom";

const ProductListCard = (data) => {
  console.log(data);
  const {
    product_category,
    product_title,
    product_price,
    product_discount,
    product_name,
    product_description,
    product_imageUrl,
    product_status,
    product_quantity,
    _id
  } = data.props;
  return (
    <div className="cart_items w-full lg:w-2/3 h-42 p-2 border-2 rounded-lg flex gap-2">
      <img
        src={product_imageUrl}
        alt="product_image"
        className="w-40 object-cover rounded-lg"
      />
      <div className="w-full flex flex-col">
        <h1 className="text-red-600 font-semibold">{product_category}</h1>
        <h1 className="text-lg font-bold ">{product_title} </h1>
        <h1 className="font-semibold text-xl">
          <span className="font-bold text-gray-700 line-through">
            Rs. {product_price}
          </span>{" "}
          <span className="font-bold text-2xl">
            Rs. {product_price - (product_price * product_discount) / 100}{" "}
          </span>{" "}
          {product_price - (product_price * product_discount) / 100 > 500
            ? "& Free Shipping"
            : "& No Eligiable for Free Shipping"}
        </h1>
        <h1>
          <span>{product_quantity} </span>
          <span>{product_status}</span>
        </h1>
        <div className="w-full flex gap-3 font-semibold text-cyan-600 mt-2">
          <Link to={`/productview/${_id}`}>
            <div class="badge badge-outline p-5 bg-red-500 font-semibold text-white hover:bg-red-600 cursor-pointer">
              View Details
            </div>
          </Link>
          <div class="badge badge-outline p-5 font-semibold hover:bg-gray-200 cursor-pointer min-w-32">
            Buy
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;
