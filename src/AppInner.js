import React, { useState, Suspense } from "react";
import sitright from './Images/sitright.png';
import { AppBody } from "./styles";
import Button from 'react-bootstrap/Button'

const PoseDetect = React.lazy( () => import("./BaseLine"))

function App_inner() {
  const [showPoseDetect, setPoseDetect] = useState(false)

  if (showPoseDetect){
    return(
      <Suspense fallback={
        <div style={AppBody}>
          <h1>Loading...</h1>
        </div>
      }>
        <PoseDetect setPoseDetect={setPoseDetect}/>
      </Suspense>
    )
  }
  return(
    <div style={AppBody}>
      <img src={sitright} alt= "Placeholder" className="cam_style"/>
      <Button variant="secondary"
        style={{
          position:"absolute",
          bottom:"30%"
        }}
        onClick={()=>setPoseDetect(true)}>Start Detecting</Button>
    </div>
  )
}

export default App_inner;