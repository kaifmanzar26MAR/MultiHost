import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero lg:min-h-screen h-fit bg-gradient-to-r from-gray-300 to-gray-100 rounded-xl z-30 relative">
      <img
        src="/headphone1.png"
        alt="headphone"
        className="absolute lg:top-[5%] lg:right-[25%] right-[5%] top-[14%] w-[38%] z-10"
      />
      <div className="hero-content w-[85%] flex flex-col items-start justify-start">
        <div className="max-w-md flex flex-col items-start justify-start">
          <h1 className="text-4xl font-semibold">Boat Headphones</h1>
          <h1 className="text-5xl font-bold ">Wireless </h1>
          <h1 className="text-[14vmin] lg:text-[25vmin] font-bold text-white stroke-gray-500 ">
            Headphone
          </h1>
          <Link to={`/productview/660152f212decafb3b84712b`}><button className=" w-fit px-4 py-2 text-xl rounded-full bg-red-600 font-semibold text-white hover:bg-red-700">
            View product
          </button></Link>
        </div>
        <div className="w-full flex justify-end items-end">
          <div className="w-56 text-right">
            <h1 className="font-bold ">Discription</h1>
            <p>
              Boat Wireless Headphone, with high base and noise cancelation.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
