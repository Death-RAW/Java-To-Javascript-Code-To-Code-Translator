import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={"/translator"}>SyntaxSwap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link as={Link} to={"/home"}>Home</Nav.Link> */}
            <Nav.Link as={Link} to={"/translator"}>Code Translator</Nav.Link>
            {/* <Nav.Link as={Link} to={"/history"}>History</Nav.Link> */}
            {/* <Nav.Link as={Link} to={"/extractor"}>Code Extractor</Nav.Link> */}
            <Nav.Link as={Link} to={"/file_translator"}>File Translator</Nav.Link>
            <Nav.Link as={Link} to={"/about"}>About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
