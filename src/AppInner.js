import React, { useState, Suspense } from "react";

const PoseDetect = React.lazy( () => import("./PoseDetect"))

function App_inner() {
  const [showPoseDetect, setPoseDetect] = useState(false)

  if (showPoseDetect){
    return(
      <div className="App-header">
        <Suspense fallback={<div>Loading...</div>}>
          <PoseDetect setPoseDetect={setPoseDetect}/>
        </Suspense>
      </div>
    )
  }
  return(
    <div className="App-header">
      <button onClick={()=>setPoseDetect(true)}>Start detecting</button>
    </div>
  )
}

export default App_inner;