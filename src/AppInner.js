import React, { useState, Suspense } from "react";
import sitright from './Images/sitright.png';
import { AppBody, placeHolder } from "./styles";
import Button from 'react-bootstrap/Button'

const PoseDetect = React.lazy( () => import("./BaseLine"))

function App_inner() {
  const [showPoseDetect, setPoseDetect] = useState(false)

  if (showPoseDetect){
    return(
      <Suspense fallback={
        <div style={AppBody}>
      <img src={sitright} alt= "Placeholder" style={placeHolder}/>
      <Button variant="secondary"
        style={{
          position : "fixed",
          bottom : "0px",
          left : "50%",
          transform: "translate(-50%, -50%)"
        }}
        onClick={()=>{console.log("?")}}>Start Detecting
      </Button>
    </div>
      }>
        <PoseDetect setPoseDetect={setPoseDetect}/>
      </Suspense>
    )
  }
  return(
    <div style={AppBody}>
      <img src={sitright} alt= "Placeholder" style={placeHolder}/>
      <Button variant="secondary"
        style={{
          position : "fixed",
          bottom : "0px",
          left : "50%",
          transform: "translate(-50%, -50%)"
        }}
        onClick={()=>setPoseDetect(true)}>Start Detecting
      </Button>
    </div>
  )
}

export default App_inner;