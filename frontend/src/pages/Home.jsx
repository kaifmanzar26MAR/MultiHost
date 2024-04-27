import React, { useEffect } from "react";
import Hero from "../components/Home/Hero";
import CardSection from "../components/Home/CardSection";
import AllProductCara from "../components/Home/AllProductCara";
import axios from 'axios'
const Home = () => {
  useEffect(()=>{
    window.scrollTo({top:0})
    const fetchData= async ()=>{
      try {
        const res=await axios.get('http://127.0.0.1:5000/')
      console.log(res.data);
      } catch (error) {
        console.log(error);
      }
      
    }
    fetchData();
  },[])
  return (
    <div className="bg-white px-5">
      <Hero/>
      <CardSection/>
      <AllProductCara/>
    </div>
  );
};

export default Home;
