import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductView from "../pages/ProductView";
import Cart from "../pages/Cart";
import AddProduct from "../pages/AddProduct";
import CategoryProduct from "../pages/CategoryProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:'/productview/:id',
        element:<ProductView/>
      },
      {
        path:'/cart',
        element:<Cart/>
      },
      {
        path:'/addproduct',
        element:<AddProduct/>
      },
      {
        path:`porductwithcategory/:category`,
        element:<CategoryProduct/>
      }
    ],
  },
  {
    path: "/",
    element: <Login />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router