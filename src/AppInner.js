import React, { useState, Suspense } from "react";
import sitright from './Images/sitright.png';
import { AppBody } from "./styles";

const PoseDetect = React.lazy( () => import("./PoseDetect"))

function App_inner() {
  const [showPoseDetect, setPoseDetect] = useState(false)

  if (showPoseDetect){
    return(
      <div>
        <Suspense fallback={
          <div className="App">
            <div style={AppBody}>
              <h1>Loading...</h1>
            </div>
          </div>
        </div>
      }>
        <PoseDetect setPoseDetect={setPoseDetect}/>
      </Suspense>
    )
  }
  return(
    <div className="App">
      <div style={AppBody}>
        <img src={sitright} alt= "Placeholder" className="cam_style"/>
        <button 
          className="open_button" 
          onClick={()=>setPoseDetect(true)}>Start detecting</button>
      </div>
    </div>
  )
}

export default App_inner;