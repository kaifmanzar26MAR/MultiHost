import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductListCard from "../components/ProductListCard";

const CategoryProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const { category } = useParams();
  const [loader, setLoader]=useState(true);
  const fetchProducts = async (source) => {

    try {
      const response = await axios.get(
        `https://multihost.onrender.com/product/getproductswithcategory/${category}`,
        { cancelToken: source.token }
      );
      if (response.status != 201) {
        throw new Error("Error in geting poduct related to the category");
      }
      setAllProducts(response.data.data);
      setLoader(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.scrollTo({top:0})
    const source = axios.CancelToken.source();
    setTimeout(()=>{
      fetchProducts(source);
    },200)
    
    return () => {
      source.cancel("Request canceled due to component unmounting");
    };
  }, []);

  if(loader){
    return(
      <div className='w-full h-screen bg-white'>
        <img src="/basketLoader.gif" alt="loader"  className="w-full h-full object-contain"/>
      </div>
    )
  }
  return (
    <div className="flex gap-y-2 flex-col p-4">
      {allProducts.length > 0
        ? allProducts.map((e) => {
            return <ProductListCard props={e} />;
          })
        : "No Product to Show"}
    </div>
  );
};

export default CategoryProduct;
