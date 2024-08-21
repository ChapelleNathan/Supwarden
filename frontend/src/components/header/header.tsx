import { Nav, Navbar, Offcanvas, OffcanvasBody, OffcanvasHeader } from "react-bootstrap";
import './header.scss'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordForm from "../password/password-form/PasswordForm";

export default function Header() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleDeconnection = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/login');
    }

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);
    const handleNav = () => {
        return localStorage.getItem('token') ? true: false;
    }

    function renderNav(showNav: boolean) {
        if (!showNav) {
            return (<></>)
        }

        return (
            <Navbar.Collapse>
                <Nav className="me-auto align-items-center w-100 justify-content-end">
                    <Nav.Link href="/groupes">Groupes</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <Nav.Link onClick={handleDeconnection}>Deco</Nav.Link>
                    <Nav.Link 
                        className="fs-2 link-underline link-underline-opacity-0"
                        onClick={handleShow}
                    >
                        +
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        )
    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary navbar">
                <Navbar.Brand className="ms-3" href="/home">Supwarden</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {renderNav(handleNav())}
            </Navbar>
            <Offcanvas show={show} onHide={handleHide} placement="end">
                <OffcanvasHeader closeButton>
                    <h2>Créer un mot de passe</h2>
                </OffcanvasHeader>
                <OffcanvasBody>
                    <PasswordForm />
                </OffcanvasBody>
            </Offcanvas>
        </>
    );
}