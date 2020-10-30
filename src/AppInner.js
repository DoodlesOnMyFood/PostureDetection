import React, { useState, Suspense } from "react";

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
    <div>
      <button 
        style={{
          borderRadius:"4px",
          color: "#fff",
          backgroundColor: "#000000"
          }} 
        onClick={()=>setPoseDetect(true)}>Start detecting</button>
    </div>
  )
}

export default App_inner;