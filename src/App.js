import React from "react";
import AppInner from "./AppInner"


function App() {
  return(
    <div >
      <header className="App-header">
        <h2>PoseSergeant</h2>
      </header>
      <div className="App-body">
        <AppInner />
      </div>
      <div className="w3-row-padding w3-center w3-margin-top">
        <div className="w3-third">
          <button className="w3-card w3-container" style={{minHeight:"17vh"}} onClick={()=>setPoseDetect(true)}>Button1</button>
        </div>
        <div className="w3-third">
          <button className="w3-card w3-container" style={{minHeight:"17vh"}} onClick={()=>setPoseDetect(true)}>Button2</button>
        </div>
        <div className="w3-third">
          <button className="w3-card w3-container" style={{minHeight:"17vh"}} onClick={()=>setPoseDetect(true)}>Button3</button>
        </div>        
      </div>
    </div> 
  )
}

export default App