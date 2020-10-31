import React from "react";
import AppInner from "./AppInner";
import Container from 'react-bootstrap/Container'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

function App() {
  return(
    <Container fluid className="p-3">
      <header className="App-header">
        <h2>PoseSergeant</h2>
      </header>
      <div className="App-body">
        <AppInner />
      </div>

    </Container> 
  )
}

export default App