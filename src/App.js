import React from "react";
import AppInner from "./AppInner"


function App() {
  return(
    <div >
      <p>Outer</p>
      <AppInner />
      <p>Outer</p>
    </div> 
  )
}

export default App