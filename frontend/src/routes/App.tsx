import { Outlet } from "react-router-dom";
import Header from "../components/header/header";
import './App.scss'

export default function App() {
    return (
        <>
            <Header />
            <div className="content m-3 d-flex">
                <Outlet />
            </div>
        </>
    )
}