import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetUser from "../hooks/getUserhook.js";



const Navbar = () => {
  // const [user, setUser] = useState(null);
  // const fetchUser = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/user/getuserbyid/65e4a52a6a691876ff3a2fea"
  //     );
  //     if (response.status != 201) {
  //       throw new Error("Not getting user response");
  //     }
  //     setUser(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const { user, loading } = useGetUser();
  const [products,setProducts]=useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const LogoutUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/logout");
      if (res.status != 200) {
        throw new Error("Error in logout");
      }
      alert("user Logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(user)

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if(term===''){
      setSearchResults([]);
      return;
    }

    const results = products.filter(
      (product) =>
        product.product_title.toLowerCase().includes(term.toLowerCase()) ||
        product.product_category.toLowerCase().includes(term.toLowerCase()) ||
        product.product_description.toLowerCase().includes(term.toLowerCase())
    );



    setSearchResults(results);
    // console.log(results)
  };

  useEffect(() => {
    console.log(user);
    const fetchProdcuts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/product/getallproducts", {
            // cancelToken: source.token
          }
        );
        if (!response) {
          throw new ApiError(500, "Error in fetching prodcut");
        }
        console.log(response.data);
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProdcuts();
  }, [user]);

  

  return (
    <div className="navbar bg-base-100 text-gray-400 sticky top-0 h-[40px] z-50">
      <div className="flex-1">
        <div className="flex-none lg:hidden">
          <label
            htmlFor="my-drawer-3"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <Link to={"/"}>
          <a className="btn btn-ghost text-xl text-red-600">MultiCom</a>
        </Link>
        <Link to={"/"}>
          <a className="btn btn-ghost text-xl flex-none hidden lg:flex text-gray-900">
            Home
          </a>
        </Link>
        <Link>
          <a className="btn btn-ghost text-xl flex-none hidden lg:flex">
            About Us
          </a>
        </Link>
      {searchTerm!='' ? <ul className="absolute top-16 w-[90%] mx-12 bg-gray-50 rounded-lg p-2 max-h-screen overflow-auto flex flex-col gap-y-2" style={{}}>
          {searchResults.length>0 ? searchResults.map((product) => (
            <Link to={`/productview/${product._id}`}><li onClick={()=>{setSearchTerm('');}} key={product._id} className="border-2 border-gray-400 rounded-lg p-2 flex gap-2 hover:bg-red-500 hover:text-white cursor-pointer">
              <h3>{product.product_title}</h3>
              <p>{product.product_category}</p>
              <p className="w-60 truncate">{product.product_description}</p>
            </li></Link>
          )): <p>No Data Found!!</p>}
        </ul> : ""}
        <label className="input flex items-center gap-2 outline-none mx-2 ">
          
          <input
            type="text"
            className="grow w-28 lg:w-52"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <div className="flex-none">
        <div className="dropdown dropdown-end flex-none hidden lg:block">
          <Link to={"/cart"}>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {user?.cart.length}
                </span>
              </div>
            </div>
          </Link>
          {/*<div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
             <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div> 
          </div>*/}
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              {user ? (
                <p onClick={LogoutUser}>Logout</p>
              ) : (
                <Link to={"/login"}>
                  <p>Login</p>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
