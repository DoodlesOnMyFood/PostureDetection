import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import {brand_style} from "./styles"



function App_Header() {
  return(
      <div style={{height : '100%',}}>
          <Navbar collapseOnSelect style={{height:"100%", padding: "0px", margin: "0px", }} sticky='bottom' expand="lg" bg="dark" variant="dark" >
            <Navbar.Brand href="#home" style={brand_style}>교정교관</Navbar.Brand>
          </Navbar>
      </div>
  )
}

export default App_Header;