import React from "react";
import AppInner from "./AppInner";


function App() {
  return(
    <div >
      <header className="App-header">
        <h2>PoseSergeant</h2>
      </header>
      <div className="App-body">
        <AppInner />
      </div>
      <div className="w3-row-padding w3-center w3-theme" style={{minHeight:"20vh", alignItems:"center"}}>
        <div className="w3-third">
          <button className="w3-card w3-container w3-round-medium" style={{minWidth:"50vh",minHeight:"17vh",color:"#fff",backgroundColor:"#282c34"}} onClick={()=>1+1}>Button1</button>
        </div>
        <div className="w3-third">
          <button className="w3-card w3-container w3-round-medium" style={{minWidth:"50vh",minHeight:"17vh",color:"#fff",backgroundColor:"#282c34"}} onClick={()=>1+1}>Button2</button>
        </div>
        <div className="w3-third">
          <button className="w3-card w3-container w3-round-medium" style={{minWidth:"50vh",minHeight:"17vh",color:"#fff",backgroundColor:"#282c34"}} onClick={()=>1+1}>Button3</button>
        </div>        
      </div>
    </div> 
  )
}

export default App