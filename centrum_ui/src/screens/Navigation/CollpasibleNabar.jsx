import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './customnav.css'
import { FaUpload } from 'react-icons/fa';

const CollapsibleNavBar = () => {
    return (
        <Navbar className='Navbar' bg="light" expand="lg" fixed='top'>
            <Container>
                <Navbar.Brand href="/">BrandName</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav id='font-s' className="ms-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/upload"> <FaUpload size={15} color="blue" /> upload</Nav.Link>
                        <Nav.Link href="/shelf">shelf</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CollapsibleNavBar;
