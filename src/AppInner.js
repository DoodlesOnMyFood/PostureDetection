import React, { useState, Suspense } from "react";
import sitright from './sitright.png';

const PoseDetect = React.lazy( () => import("./PoseDetect"))

function App_inner() {
  const [showPoseDetect, setPoseDetect] = useState(false)

  if (showPoseDetect){
    return(
      <div>
        <Suspense fallback={
          <div className="App">
            <div className="App-body">
              <h1>Loading...</h1>
            </div>
          </div>
        }>
          <PoseDetect setPoseDetect={setPoseDetect}/>
        </Suspense>
      </div>
    )
  }
  return(
    <div className="App">
      <div className="App-body">
        <img src={sitright} alt= "Placeholder" className="cam_style"/>
        <button 
          className="open_button" 
          onClick={()=>setPoseDetect(true)}>Start detecting</button>
      </div>
    </div>
  )
}

export default App_inner;