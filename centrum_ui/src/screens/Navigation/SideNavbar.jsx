import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 

const SidebarNavBar = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const handleClose = () => setShowSidebar(false);
    const handleShow = () => setShowSidebar(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <FaBars />
            </Button>

            <Offcanvas show={showSidebar} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Professor</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* Place your navigation links here */}
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default SidebarNavBar;
