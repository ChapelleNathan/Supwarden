import { Nav, Navbar } from "react-bootstrap";
import './header.scss'
import React from "react";

export default function Header() {

    const handleDeconnection = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.clear();
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary navbar">
            <Navbar.Brand  className="ms-3" href="#home">Supwarden</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <Nav.Link onClick={handleDeconnection}>Deco</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}