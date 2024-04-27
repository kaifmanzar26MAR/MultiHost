import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CardSection = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product/getallproductcategory");
      const allCategories = response.data.data;
      console.log(allCategories);
  
      const data = await Promise.all(
        allCategories.map(async (category) => {
          const categoryImageResponse = await axios.get(`http://localhost:5000/product/getproductimagebycategory/${category}`);
          const categoryImage = categoryImageResponse.data.data; // Assuming you want the actual image data here
          return {
            category,
            categoryImage
          };
        })
      );
  
      console.log(data);
      setCategoriesData(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  
  
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="py-5 flex flex-wrap justify-center items-start gap-5">
      {categoriesData?.map((e) => {
        return (
          <div className="card w-80 h-80 bg-base-100 shadow-xl image-full">
            <figure>
              <img src={e.categoryImage} alt="Shoes" />
            </figure>
            <div className="card-body w-full h-full flex gap-y-1 justify-center items-start">
              <h1 className="font-semibold text-gray-200 text-opacity-65">
                Enjoy
              </h1>
              <h1 className=" text-white text-3xl font-bold">with</h1>
              <h2 className="card-title font-bold uppercase text-3xl text-red-600 text-opacity-80">
                {e.category}!
              </h2>
              <div className="card-actions justify-end pt-5">
                <Link to={`porductwithcategory/${e.category}`}>
                  {" "}
                  <button className="bg-red-700 hover:bg-red-800 p-2 rounded-full w-32 font-semibold">
                    View Category
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}

{/*       
      <div className="card w-80 h-80 bg-base-100 shadow-xl image-full">
        <figure>
          <img src="/wiredheadphone.jpg" alt="Shoes" />
        </figure>
        <div className="card-body w-full h-full flex gap-y-1 justify-center items-start">
          <h1 className="font-semibold text-gray-200 text-opacity-65">Enjoy</h1>
          <h1 className=" text-white text-3xl font-bold">with</h1>
          <h2 className="card-title font-bold uppercase text-4xl text-gray-600 text-opacity-80">
            HeadPhones!
          </h2>
          <div className="card-actions justify-end pt-5">
            <Link>
              {" "}
              <button className="bg-red-700 hover:bg-red-800 p-2 rounded-full w-32 font-semibold">
                View Category
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="card w-80 h-80 bg-base-100 shadow-xl image-full">
        <figure>
          <img src="/watch.webp" alt="watch" />
        </figure>
        <div className="card-body w-full h-full flex gap-y-1 justify-center items-start">
          <h1 className="font-semibold text-gray-200 text-opacity-65">Never</h1>
          <h1 className=" text-white text-3xl font-bold">weare</h1>
          <h2 className="card-title font-bold uppercase text-4xl text-orange-600 text-opacity-80">
            GAD!
          </h2>
          <div className="card-actions justify-end pt-5">
            <button className="bg-gray-300 hover:bg-gray-400 p-2 rounded-full w-32 font-semibold text-gray-800 bg-opacity-60">
              View Category
            </button>
          </div>
        </div>
      </div>

      <div className="card w-80 h-80 bg-base-100 shadow-xl image-full">
        <figure>
          <img src="/laptop.avif" alt="laptop" />
        </figure>
        <div className="card-body w-full h-full flex gap-y-1 justify-center items-start">
          <h1 className="font-semibold text-gray-200 text-opacity-65">Work</h1>
          <h1 className=" text-white text-3xl font-bold">with</h1>
          <h2 className="card-title font-bold uppercase text-4xl text-red-600 text-opacity-50">
            Vievobooks!
          </h2>
          <div className="card-actions justify-end pt-5">
            <button className="bg-red-500 hover:bg-red-600 p-2 rounded-full w-32 font-semibold text-gray-200 ">
              View Category
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CardSection;
