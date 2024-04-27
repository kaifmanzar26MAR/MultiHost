import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGetUser from "../hooks/getUserhook";

const Cart = () => {
  const [userCart, setUserCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const { user, loading } = useGetUser();
  const [loaderFlag, setLoaderFlag]=useState(true);
  const fetchUser = async () => {
    try {
      const cart = user?.cart;
      // Map each cart item to a promise of fetching its product
      const productPromises = cart.map(async (e) => {
        const product = await axios.post(
          "http://localhost:5000/product/getproductbyid",
          { product_id: e.product_id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        return {
          product: product.data.data,
          quantity: e.quantity,
        };
      });

      // Wait for all product fetch promises to resolve
      const resolvedProducts = await Promise.all(productPromises);

      // Update cartData array with resolved product data
      setUserCart(resolvedProducts);
      // setLoaderFlag(false)
      console.log(resolvedProducts);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }finally{
      setLoaderFlag(false)
    }
  };

  const removeFromCart = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/product/removeproductfromcart",
        { product_id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      if (response.status != 201) throw new Error("Error in updation of Cart");

      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo({top:0})
    setTimeout(()=>{
      fetchUser();
    },200)
    
  }, [user]);

  useEffect(() => {
    let cost = 0;
    userCart.forEach((item) => {
      cost +=
        (item.product.product_price -
          (item.product.product_price * item.product.product_discount) / 100) *
        item.quantity;
    });

    // Update totalCost state
    setTotalCost(cost);
  }, [userCart]);

  if(loaderFlag){
    return(
      <div className='w-full h-screen bg-white'>
        <img src="/basketLoader.gif" alt="loader"  className="w-full h-full object-contain"/>
      </div>
    )
  }


  return (
    <div className="w-full flex flex-col px-5 min-h-screen">
      <h1 className="text-2xl font-semibold">Cart Page</h1>
      <div className="w-full flex flex-col lg:flex-row gap-4">
        <div className="lsit w-full p-2 flex flex-col gap-y-2">
          {userCart.length > 0
            ? userCart?.map((item) => {
                {
                  /* setTotalCost(totalCost+ (item.product.product_price - (item.product.product_price * item.product.product_discount) / 100)); */
                }
                console.log("items", item);
                return (
                  <div
                    className="cart_items w-full h-42 p-2 border-2 rounded-lg flex gap-2"
                    key={item.product._id}
                  >
                    <img
                      src={item.product.product_imageUrl}
                      alt="product_image"
                      className="w-40 object-cover rounded-lg"
                    />
                    <div className="w-full flex flex-col">
                      <h1 className="text-red-600 font-semibold">
                        {item.product.product_category}
                      </h1>
                      <h1 className="text-lg font-bold ">
                        {item.product.product_title}
                      </h1>
                      <h1 className="font-semibold text-xl">
                        <span className="font-bold text-gray-700 line-through">
                          Rs. {item.product.product_price}
                        </span>{" "}
                        <span className="font-bold text-2xl">
                          Rs.{" "}
                          {item.product.product_price -
                            (item.product.product_price *
                              item.product.product_discount) /
                              100}{" "}
                        </span>{" "}
                        {item.product.product_price -
                          (item.product.product_price *
                            item.product.product_discount) /
                            100 >
                        500
                          ? "& Free Shipping"
                          : "& No Eligiable for Free Shipping"}
                      </h1>
                      <input
                        type="Number"
                        placeholder="Quantity"
                        value={item.quantity}
                        className="w-24 px-2 py-1 ring-1 ring-gray-400 rounded-full mt-1"
                      />
                      <div className="w-full flex gap-3 font-semibold text-cyan-600 mt-2">
                        <span
                          className="cursor-pointer hover:text-cyan-800"
                          onClick={() => removeFromCart(item.product._id)}
                        >
                          Remove
                        </span>{" "}
                        |
                        <Link
                          to={`/porductwithcategory/${item.product.product_category}`}
                        >
                          <span className="cursor-pointer hover:text-cyan-800">
                            See more
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            : "No product in Cart. Shop Now!!"}
          {/* <div className="cart_items w-full h-42 p-2 border-2 rounded-lg flex gap-2">
            <img
              src="/wiredheadphone.jpg"
              alt="product_image"
              className="w-40 object-cover rounded-lg"
            />
            <div className="w-full flex flex-col">
              <h1 className="text-red-600 font-semibold">Headphones</h1>
              <h1 className="text-lg font-bold ">
                boAt Wired Earphones - boAt{" "}
              </h1>
              <h1 className="font-semibold">$99/-</h1>
              <input
                type="Number"
                placeholder="Quantity"
                className="w-24 px-2 py-1 ring-1 ring-gray-400 rounded-full mt-1"
              />
              <div className="w-full flex gap-3 font-semibold text-cyan-600 mt-2">
                <span className="cursor-pointer hover:text-cyan-800">
                  Remove
                </span>{" "}
                |
                <span className="cursor-pointer hover:text-cyan-800">
                  See more
                </span>
              </div>
            </div>
          </div>

          <div className="cart_items w-full h-42 p-2 border-2 rounded-lg flex gap-2">
            <img
              src="/wiredheadphone.jpg"
              alt="product_image"
              className="w-40 object-cover rounded-lg"
            />
            <div className="w-full flex flex-col">
              <h1 className="text-red-600 font-semibold">Headphones</h1>
              <h1 className="text-lg font-bold ">
                boAt Wired Earphones - boAt{" "}
              </h1>
              <h1 className="font-semibold">$99/-</h1>
              <input
                type="Number"
                placeholder="Quantity"
                className="w-24 px-2 py-1 ring-1 ring-gray-400 rounded-full mt-1"
              />
              <div className="w-full flex gap-3 font-semibold text-cyan-600 mt-2">
                <span className="cursor-pointer hover:text-cyan-800">
                  Remove
                </span>{" "}
                |
                <span className="cursor-pointer hover:text-cyan-800">
                  See more
                </span>
              </div>
            </div>
          </div> */}
        </div>

        <div className="payment_details w-[40%] pt-2">
          <div className="border-2 min-h-32 rounded-lg p-2">
            <div className="font-semibold text-xl">
              <span>Grand Total: </span> <span>Rs. {totalCost}</span>
            </div>
            <div className="p-auto"></div>
            <div className="w-full text-center font-semibold bg-red-600 rounded-lg py-3 text-gray-200 cursor-pointer hover:bg-red-500">
              Proceed To Pay
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
