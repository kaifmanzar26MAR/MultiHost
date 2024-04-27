import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import CategorySuggition from "../components/View/CategorySuggition";

const ProductView = () => {
  const { id } = useParams();
  // console.log(id);
  const [data, setData] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const {user,loading}= useGetUser();

  const fetchProduct = async (product_id, source) => {
    console.log(product_id);

    try {
      const response = await axios.post(
        "https://multihost.onrender.com/product/getproductbyid",
        { product_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          cancelToken: source.token,
        }
      );

      if (response.status !== 201) {
        throw new Error("Product not found");
      }

      console.log(response.data.data);
      setData(response.data.data);
      const reviewsArr = response.data.data.product_reviews;

      const reviewsPromises = reviewsArr.map(async (review_id) => {
        const review = await axios.post(
          "https://multihost.onrender.com/product/getprodcutreviewbyid",
          review_id,
          {
            headers: {
              "Content-Type": "application/json",
            },
            cancelToken: source.token,
          }
        );
        console.log(review.data.data);
        return review.data.data;
      });

      const reviewsData = await Promise.all(reviewsPromises);
      setAllReviews([...allReviews, ...reviewsData]);
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error; // Re-throw the error to handle it elsewhere if needed
    }
  };

  const addReview = async () => {
    console.log(reviewText);
    
    const source = axios.CancelToken.source();
    try {
      const res = await axios.post(
        "https://multihost.onrender.com/product/addreview",
        {
          product_id: data._id,
          reviewtext: reviewText,
          ratings: 4,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials:true,
          cancelToken: source.token,
        }
      );
      console.log(res);
      if (res.status != 201) {
        throw new Error("Review no added");
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    console.log(quantity);
    
    const source = axios.CancelToken.source();
    try {
      const response = await axios.post(
        "https://multihost.onrender.com/product/addtocart",
        {
          // user_id: "65e4a52a6a691876ff3a2fea",
          product_id: data._id,
          quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials:true,
          cancelToken: source.token,
        }
      );

      if (response.status === 201) {
        alert(response.data.message);
        window.location.reload();
      } else {
        throw new ApiError(500, "Error in adding Prodcut to cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo({top:0})
    const source = axios.CancelToken.source();
    setAllReviews([]);
    setReviewText("");
    setQuantity(1);
    setTimeout(()=>{
    fetchProduct(id, source);
    },200)
    

    return () => {
      source.cancel("Request canceled due to component unmounting");
    };
  }, [id]);

  if(!data){
    return(
      <div className='w-full h-screen bg-white'>
        <img src="/basketLoader.gif" alt="loader"  className="w-full h-full object-contain"/>
      </div>
    )
  }
 
  const {
    product_id,
    product_imageUrl,
    product_name,
    product_title,
    product_price,
    product_discount,
    product_quantity,
    product_description,
    product_brand,
    product_category,
  } = data;
  return (
    <div className="w-full p-4 flex flex-col justify-start items-start">
      <div className="heroview w-full flex flex-col lg:flex-row gap-5 justify-center items-center">
        <div className="image bg-red-500 rounded-xl w-full lg:w-[800px]  overflow-hidden">
          <img src={product_imageUrl} alt="product" className="aspect-auto" />
        </div>
        <div className="dis rounded-xl w-full min-h-[476px]">
          <h1 className="text-red-600 font-semibold">{product_category}</h1>
          <h1 className="text-3xl font-bold ">{product_title} </h1>
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
          <p>{product_description}</p>
          <br />
          <div className="flex gap-7">
            <input
              type="Number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              placeholder="Quantity"
              className="w-32 px-4 py-2 ring-1 ring-black rounded-full"
            />
            <div
              className="w-32 px-4 py-2 rounded-full bg-red-500 ring-1 ring-black text-center text-gray-200 cursor-pointer"
              onClick={addToCart}
            >
              Add to Cart
            </div>
          </div>
          <br />
          <hr />
          <h1 className="font-semibold">
            Category:{" "}
            <span className="text-red-600 font-semibold">
              {product_category}
            </span>
          </h1>
          <h1>Free shipping on orders over Rs.500!</h1>
          <ul>
            <li className="flex gap-2 justify-start items-center">
              <FaRegCheckCircle />
              No-Risk Money Back Guarantee!
            </li>
            <li className="flex gap-2 justify-start items-center">
              <FaRegCheckCircle />
              No Hassle Refunds
            </li>
            <li className="flex gap-2 justify-start items-center">
              <FaRegCheckCircle />
              Secure Payments
            </li>
          </ul>
        </div>
      </div>

      <div className="review w-full">
        <hr />
        <br />
        <h1 className="font-bold text-xl">Reviews</h1>
        <div className="reviewbox flex flex-col gap-y-2 justify-start items-start pl-2">
          {allReviews?.map((review, i) => {
            const { _id, user_name, ratings, createdAt, reviewtext } = review;
            let num = ratings * 2;
            return (
              <div
                className="review border rounded-lg w-full lg:w-1/2"
                key={_id}
              >
                <div className="flex gap-2 items-center justify-start p-2">
                  <p className="font-semibold">{user_name}</p>
                  <div className="rating rating-sm rating-half">⭐⭐⭐⭐</div>
                </div>
                <p className="pl-4 -mt-2">{reviewtext}</p>
                <p>Date: {createdAt}</p>
              </div>
            );
          })}

          {/* 
          <div className="review border rounded-lg w-full lg:w-1/2">
            <div className="flex gap-2 items-center justify-start p-2">
              <p className="font-semibold">Kaif Manzar</p>
              <div className="rating rating-sm rating-half">
                <input
                  type="radio"
                  name="rating-10"
                  className="rating-hidden"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-1"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-2"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-1"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-2"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-1"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-2"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-1"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-2"
                  checked
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-1"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-2"
                  disabled
                />
              </div>
            </div>

            <p className="pl-4 -mt-2">This product is OSM!</p>
          </div>


          <div className="review border rounded-lg w-full lg:w-1/2">
            <div className="flex gap-2 items-center justify-start p-2">
              <p className="font-semibold">Kaif Manzar</p>
              <div className="rating rating-sm rating-half">
                <input
                  type="radio"
                  name="rating-10"
                  className="rating-hidden"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-1"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-2"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-1"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-2"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-1"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-2"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-1"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-2"
                  checked
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-1"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-500 mask mask-star-2 mask-half-2"
                  disabled
                />
              </div>
            </div>

            <p className="pl-4 -mt-2">This product is OSM!</p>
          </div> */}
        </div>
        <br />

        <div className="input_review border flex flex-col gap-y-2 p-2 rounded-xl w-full lg:w-1/2">
          <h1 className="font-bold">Give Your Valueable Review!</h1>
          {/* <h1>Rate the product</h1> */}
          {/* <div className="rating rating-sm rating-half">
            <input type="radio" name="rating-10" className="rating-hidden" />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-1"
              checked
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-2"
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-2"
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-2"
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-2"
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-2"
            />
          </div> */}
          <textarea
            id="newreviewtext"
            placeholder="Write your Review!"
            class="textarea textarea-bordered textarea-sm w-full max-w-xs"
            vlaue={reviewText}
            onChange={(e) => {
              setReviewText(e.target.value);
            }}
          ></textarea>
          <button className="btn btn-success w-fit px-8" onClick={addReview}>
            Submit
          </button>
        </div>
      </div>
      <br />
      { data.product_category ? <CategorySuggition category={data?.product_category} current_product={data?._id}/>: ""}
    </div>
  );
};

export default ProductView;
