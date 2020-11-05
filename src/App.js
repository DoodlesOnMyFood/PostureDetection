import React from "react";
import AppInner from "./AppInner";
import AppHeader from "./AppHeader";


const temp = {height : "100%"}

function App() {
  return(
    <div style={temp}>
      <div style={{position : 'fixed', right : '0px', top:'0px', left : '0px', bottom : "80%"}} >
      <AppHeader />
      </div>
      <AppInner />  
    </div> 
  )
}

export default App