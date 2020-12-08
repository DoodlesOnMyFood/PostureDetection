import React, { useState } from "react";
import AppInner from "./AppInner";
import AppHeader from "./AppHeader";


const temp = {height : "100%"}

const currentSensitivity = React.createContext()

export {currentSensitivity}

function App() {
  const [sensitivity, setSensitivity] = useState(10)

  return(
    <div style={temp}>
      <currentSensitivity.Provider value={sensitivity}>
        <div style={{position : 'fixed', right : '0px', top:'0px', left : '0px', bottom : "80%"}} >
        <AppHeader setSensitivity={setSensitivity}/>
        </div>
        <AppInner />
      </currentSensitivity.Provider>  
    </div> 
  )
}

export default App