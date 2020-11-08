import React, { useState, Suspense } from "react";
import { AppBody } from "./styles";
import Button from 'react-bootstrap/Button'
import Webcam from "react-webcam";

const PoseDetect = React.lazy( () => import("./BaseLine"))

function App_inner() {
  const [showPoseDetect, setPoseDetect] = useState(false)

  if (showPoseDetect){
    return(
      <Suspense fallback={
        <div style={AppBody}>
      {/* <img src={} alt= "Placeholder" style={placeHolder}/> */}
      <div className="init">
        <Webcam
          style={{ width : "100%", height : "100%"}}
        />
      </div>
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
      {/* <img src={Outline} alt= "Placeholder" style={placeHolder}/>  */}
      <div className="init">
        <Webcam
          style={{ width : "100%", height : "100%"}}
        />
      </div>
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