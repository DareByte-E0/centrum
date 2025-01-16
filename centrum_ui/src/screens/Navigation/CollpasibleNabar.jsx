import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './customnav.css'
import { FaUpload, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const CollapsibleNavBar = () => {
    return (
        <Navbar className='Navbar' bg="light" expand="lg" fixed='top'>
            <Container>
                <Navbar.Brand as={Link} to="/">BrandName</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav id='font-s' className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/feed">Status</Nav.Link>
                        <Nav.Link as={Link} to="/upload"> <FaUpload size={15} color="blue" /> upload</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link className='user-icon' as={Link} to="/profile"><FaUser className='icon'/></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CollapsibleNavBar;
