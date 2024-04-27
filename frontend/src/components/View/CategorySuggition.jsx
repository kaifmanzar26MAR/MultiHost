import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const CategorySuggition = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const navigate= useNavigate();
  const fetchProdcuts = async (source) => {
    try {
      console.log(props)
        const response = await axios.get(
          `http://localhost:5000/product/getproductswithcategory/${props.category}`,
          { cancelToken: source.token }
        );
        if (response.status != 201) {
          throw new Error("Error in geting poduct related to the category");
        }
        const products= response.data.data.filter((e)=> e._id!= props.current_product)
        setAllProducts(products);
      } catch (error) {
        console.log(error);
      }
  };

  const addToCart = async (product_id) => {
    // console.log(quantity);
    
    const source = axios.CancelToken.source();
    try {
      const response = await axios.post(
        "http://localhost:5000/product/addtocart",
        {
          product_id,
          quantity:1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
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
    // window.scrollTo(0, 0); // Scroll to the top of the window
    const source = axios.CancelToken.source();
    fetchProdcuts(source);
    return () => {
      source.cancel('Request canceled due to component unmounting');
    };
  }, []);
  if(allProducts.length===0){
    return <div>
      <p>No Related Product in the list!!</p>
    </div>
  }
  return (
    <div className="w-full relative flex flex-col items-center justify-center z-30 ">
      <div className="w-full h-fit">
        <h1 className="text-3xl">You May ALso Like</h1>
        <div className="carousel carousel-center w-full p-4 space-x-4 rounded-box">
          {allProducts.map((e) => {
            return (
              <div className="carousel-item w-96 h-[500px]" key={e._id}>
                <div class="card w-full bg-base-100  shadow-xl">
                  <figure>
                    <img
                      src={e.product_imageUrl}
                      alt="product image"
                      className="w-full h-80 object-contain overflow-hidden"
                    />
                  </figure>
                  <div class="card-body">
                    <h2 class="card-title">
                      {e.product_category}<div class="badge bg-gray-800 text-white">NEW</div>
                    </h2>
                    <p>
                      {e.product_title}
                    </p>
                    <div class="card-actions w-fit flex pt-8">
                  
                        <div class="badge badge-outline p-5 bg-red-500 font-semibold text-white hover:bg-red-600 cursor-pointer" onClick={()=>{
                          navigate(`/productview/${e._id}`);
                          window.location.reload();
                        }}>
                          View Details
                        </div>
                      <div class="badge badge-outline p-5 font-semibold hover:bg-gray-200 cursor-pointer" onClick={()=>addToCart(e._id)}>
                        Add To Cart
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          
        </div>
      </div>
    </div>
  );
};

export default CategorySuggition;
