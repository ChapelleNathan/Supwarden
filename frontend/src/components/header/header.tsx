import { Nav, Navbar } from "react-bootstrap";
import './header.scss'
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomModal from "../modal/customModal";
import FriendModal from "../modal/friend-modal/friendModal";

export default function Header() {
    const navigate = useNavigate();

    const handleDeconnection = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/login');
    }

    const handleNav = () => {
        return localStorage.getItem('token') ? true : false;
    }

    function renderNav(showNav: boolean) {
        if (!showNav) {
            return (<></>)
        }

        return (
            <Navbar.Collapse className="">
                <Nav className="me-auto align-items-center w-100 justify-content-end">
                    <Nav.Link href="/groupes">Groupes</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <Nav.Link>
                        <CustomModal size="lg" header="Ajouter des amis" buttonText="Amis" isLink={true}>
                            <FriendModal/>
                        </CustomModal>
                    </Nav.Link>
                    <Nav.Link onClick={handleDeconnection}>Deco</Nav.Link>
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
        </>
    );
}