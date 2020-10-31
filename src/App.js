import React from "react";
import AppInner from "./AppInner";
import Container from 'react-bootstrap/Container'


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