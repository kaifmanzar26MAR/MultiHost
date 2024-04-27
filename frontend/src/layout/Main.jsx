import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <div className="bg-background-0 font-roboto flex">
      {/* <Sidebar /> */}
      <div className="flex flex-col w-full bg-background-0 ">
        <Navbar />
        <Outlet />
        <Footer/>
      </div>
    </div>
  );
};

export default Main;
