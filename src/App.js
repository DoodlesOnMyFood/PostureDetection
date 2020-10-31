import React from "react";
import AppInner from "./AppInner";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function App() {
  return(
    <Container fluid className="p-3">
      <Row>
        <Col>교정교관</Col>
      </Row>
      <Row>
        <Col>
          <AppInner />
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container> 
  )
}

export default App