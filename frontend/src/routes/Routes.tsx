import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "../pages/home/home";

const routes = createBrowserRouter([
    {
        path: "",
        element: <App/>,
        children: [
            {
                path:"/home",
                element: <Home/>
            }
        ]
    }
])

export default routes;