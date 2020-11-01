import React from "react";
import AppInner from "./AppInner";
import AppHeader from "./AppHeader";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function App() {
  return(
    <Container fluid className="p-0" style={{height:'100%'}}>
      <Row > 
        <Col >
          <AppHeader />
        </Col>
      </Row>
      <Row style={{height:'100%'}}>
        <Col>
          <AppInner />
        </Col>
      </Row>
    </Container> 
  )
}

export default App