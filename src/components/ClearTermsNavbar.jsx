import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function ClearTermsNavbar() {
    return (
        <Navbar bg="light" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    <strong>ClearTerms</strong>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="clearterms-nav" />
                <Navbar.Collapse id="clearterms-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" end>
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/dashboard">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/history">
                            History
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/resources">
                            Resources
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/how-it-works">
                            How it works
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}