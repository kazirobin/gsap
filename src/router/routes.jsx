import { createBrowserRouter } from "react-router";
import Home from "../pages/home/home.page";
import Error from "../pages/error/error.page";


export const router = createBrowserRouter([
  {
    path:"/",
    errorElement:<Error/>,
    element:<Home/>
  }
])