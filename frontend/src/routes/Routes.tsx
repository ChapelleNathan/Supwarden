import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "../pages/home/home";
import Login from "../pages/auth/login/login";
import Signin from "../pages/auth/signin/signin";

const routes = createBrowserRouter([
    {
        path: "",
        element: <App/>,
        children: [
            {
                path:"/home",
                element: <Home/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/signin",
                element: <Signin/>
            }
        ]
    }
])

export default routes;