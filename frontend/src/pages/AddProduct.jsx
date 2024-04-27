import axios from "axios";
import React, { useState } from "react";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    product_name: "",
    added_by: "",
    product_title: "",
    product_price: "",
    product_discount: "",
    product_quantity: "",
    product_description: "",
    product_brand: "",
    product_imageUrl: "",
    product_category:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productData);
    try {
      const response = await axios.post(
        'http://localhost:5000/product/addproduct',
        productData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log("Data added successfully:", response.data);
    } catch (error) {
      console.error("Error occurred while adding data:", error);
    }
  };

  return (
    <div className="w-full p-2 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex p-2 flex-col gap-y-2 w-1/2">
        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          value={productData.product_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="product_category"
          placeholder="Product Category"
          value={productData.product_category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="added_by"
          placeholder="Added By"
          value={productData.added_by}
          onChange={handleChange}
        />
        <input
          type="text"
          name="product_title"
          placeholder="Product Title"
          value={productData.product_title}
          onChange={handleChange}
        />
        <input
          type="number"
          name="product_price"
          placeholder="Product Price"
          value={productData.product_price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="product_discount"
          placeholder="Product Discount"
          value={productData.product_discount}
          onChange={handleChange}
        />
        <input
          type="number"
          name="product_quantity"
          placeholder="Product Quantity"
          value={productData.product_quantity}
          onChange={handleChange}
        />
        <input
          type="text"
          name="product_description"
          placeholder="Product Description"
          value={productData.product_description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="product_brand"
          placeholder="Product Brand"
          value={productData.product_brand}
          onChange={handleChange}
        />
        <input
          type="text"
          name="product_imageUrl"
          placeholder="Product Image URL"
          value={productData.product_imageUrl}
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddProduct;
