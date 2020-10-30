import React, { useState, Suspense } from "react";
import sitright from './sitright.png';

const PoseDetect = React.lazy( () => import("./PoseDetect"))

function App_inner() {
  const [showPoseDetect, setPoseDetect] = useState(false)

  if (showPoseDetect){
    return(
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <PoseDetect setPoseDetect={setPoseDetect}/>
        </Suspense>
      </div>
    )
  }
  return(
    <div className="App">
      <div className="App-body">
        <img src={sitright} alt= "Placeholder" style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          width: 320,
          height: 240
        }}/>
        <button 
          style={{
            borderRadius:"4px",
            color: "#fff",
            position: "absolute",
            bottom:"30%",
            backgroundColor: "#000000"
            }} 
          onClick={()=>setPoseDetect(true)}>Start detecting</button>
      </div>
    </div>
  )
}

export default App_inner;