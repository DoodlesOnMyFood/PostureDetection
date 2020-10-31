import React from "react";
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {brand_style, ImageIconStyle} from "./styles"


function App_Header() {
  return(
      <Container fluid className="p-0">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Navbar.Brand href="#home" style={brand_style}>교정교관</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href="settings">
                    <Image
                    source={require('./Images/cog(gray).png')}
                    style={ImageIconStyle}/>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      </Container>
  )
}

export default App_Header;