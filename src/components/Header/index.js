import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link className="navbar-brand" to="/">Navbar</Link>
                <Nav className="mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signin">
                            Signin
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">
                            Signup
                        </NavLink>
                    </li>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header
