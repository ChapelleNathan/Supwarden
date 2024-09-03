import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "../pages/home/home";
import Login from "../pages/auth/login/login";
import Signin from "../pages/auth/signin/signin";
import Groups from "../pages/groups/groups";

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
            },
            {
                path:"/groupes",
                element: <Groups/>
            }
        ]
    }
])

export default routes;