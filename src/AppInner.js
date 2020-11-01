import React, { useState, Suspense } from "react";
import sitright from './Images/sitright.png';
import { AppBody } from "./styles";
import Button from 'react-bootstrap/Button'

const PoseDetect = React.lazy( () => import("./PoseDetect"))

function App_inner() {
  const [showPoseDetect, setPoseDetect] = useState(false)

  if (showPoseDetect){
    return(
        <Suspense fallback={
          <div className="App">
            <div style={AppBody}>
              <h1>Loading...</h1>
            </div>
          </div>
      }>
        <PoseDetect setPoseDetect={setPoseDetect}/>
      </Suspense>
    )
  }
  return(
    <div style={AppBody}>
      <img src={sitright} alt= "Placeholder" className="cam_style"/>
      <Button varaint='secondary'
        onClick={()=>setPoseDetect(true)}>Start Detecting</Button>
    </div>
  )
}

export default App_inner;