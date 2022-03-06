import React from 'react'
import Header from '../Header'
import { NavLink } from 'react-router-dom';
import { Container,Row, Col } from 'react-bootstrap'

const Layout = (props) => {
    return (
        <>
            <Header />
            {
                props.sidebar ?
                <Container fluid>
                <Row>
                    <Col md={2}>
                        <li> <NavLink to="/"> Home </NavLink> </li>
                        <li> <NavLink to="/page"> page </NavLink> </li>
                        <li> <NavLink to="/products"> Products </NavLink> </li>
                        <li> <NavLink to="/category"> Category </NavLink> </li>
                    </Col>
                    <Col md={10}>
                    {props.children}
                    </Col>
                </Row>
            </Container>
            :
            props.children
            }
           
        </>
    )
}

export default Layout
