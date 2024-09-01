import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header/header";
import './App.scss'
import { useEffect } from "react";
import { ToastProvider } from "../context/ToastContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const clientId = '282928748602-jvjsus7ci73pgdtkohkd77kdlc7nqj8m.apps.googleusercontent.com';

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            switch (location.pathname) {
                case "/register":
                    navigate("/register");
                    break;
                default:
                    navigate('/login');
                    break;
            }
        } else {
            if (location.pathname == '/') {
                navigate('home');
            } else {
                navigate(location.pathname);
            }
        }
    }, [navigate])
    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <ToastProvider>
                    <Header />
                    <div className="content m-3 d-flex">
                        <Outlet />
                    </div>
                </ToastProvider>
            </GoogleOAuthProvider>
        </>
    )
}