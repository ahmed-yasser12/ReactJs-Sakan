import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./Componants/Layout/Layout";
import Home from "./Componants/Home/Home";
import ProductDetails from "./Componants/ProductDetails/ProductDetails";
import GetProducts from "./Componants/GetProduts/GetProducts";
import Notfound from "./Componants/Notfouond/Notfound";
import Filter from "./Componants/Filter/Filter";
import Myzone from "./Componants/Myzone/Myzone";

import MyAd from "./Componants/MyAd/MyAd";
import Register from "./Componants/Register/Register";
import Login from "./Componants/Login/Login";
import { useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import About from "./Componants/About/About";
import Contacts from "./Componants/Contact/Contact";
import UpdateProperty from "./Componants/UpdateProperty/UpdateProperty";
import ConfirmEmail from "./Componants/ConfirmEmail/ConfirmEmail";
import ConfirmFaile from "./Componants/ConfirmFaile/ConfirmFaile";
import Message from "./Componants/Message/Message";
import { FilterProducts } from "./Context/FilterProducts";

function App() {
  // decode token

  let token = localStorage.getItem("user");
  let { setExpired, userData, setuserData } =
    useContext(FilterProducts);

  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      let decode = jwtDecode(token);
      console.log(decode);
      if (!userData) {
        setExpired(false);
      }
      setuserData(decode);
      console.log(userData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const Routes = createHashRouter([
    {
      path: "",  
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "productdetails/:name/:id", element: <ProductDetails /> },
        { path: "getProducts/:name/:id", element: <GetProducts /> },
        { path: "filter", element: <Filter /> },
        { path: "myzone/:id", element: <Myzone /> },
        { path: "myad", element: <MyAd /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contacts /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "message", element: <Message /> },
        { path: "confirmation-success", element: <ConfirmEmail /> },
        { path: "confirmation-failure", element: <ConfirmFaile /> },
        { path: "updateProperty/:id", element: <UpdateProperty /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return <RouterProvider router={Routes} />;
}

export default App;
