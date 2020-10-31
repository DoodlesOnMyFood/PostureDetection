import React from "react";
import AppInner from "./AppInner";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function App() {
  return(
    <Container fluid>
      <Row> 
        <Col>
          <AppHeader />
        </Col>
      </Row>
      <Row>
        <Col>
          <AppInner />
        </Col>
      </Row>
      <Row>
        <Col>Footer
          <AppFooter />
        </Col>
      </Row>
    </Container> 
  )
}

export default App