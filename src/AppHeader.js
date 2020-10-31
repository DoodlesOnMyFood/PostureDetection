import React, { useState, Suspense } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const PoseDetect = React.lazy( () => import("./PoseDetect"))

function App_Header() {
  return(
    <div>
        <Container>
            <Row>
                <h2>교정교관</h2>
            </Row>
        </Container>
    </div>
  )
}

export default App_Header;