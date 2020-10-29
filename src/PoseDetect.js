import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet"; //포즈 인식 모델
import Webcam from "react-webcam";
import Status from "./Status"

function PoseDetect( { setPoseDetect } ) {
  const webcamRef = useRef(null);
  const [net, setNet] = useState(null)
  const [netLoaded, setNetLoaded] = useState(false)
  const [findingBaseLine, setFindingBaseLine] = useState(false)
  const [baseLine, setBaseLine] = useState(false)
  const [statusLog, setStatusLog] = useState([])
  let intervalRef 
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  const baseLineFinding = async () =>{
    setStatusLog((prev) => [ ...prev, "자세 바르게 잡으세요"])
    await sleep(3000)
    let i
    for(i = 0; i < 10; i++){
      let pose = await detect(net)
      sleep(300)
      console.log(pose)
    }
    setBaseLine(true)
    setStatusLog((prev) =>{
      let index = prev.indexOf("자세 바르게 잡으세요")
      prev.splice(index, 1)
      return [...prev]
    })
  }

  //  Load posenet
  const runPosenet = async () => {
    let temp =  await posenet.load({
      architechture:'MobileNetV', 
      inputResolution: { width: 320, height: 240 },
      multiplier: 0.5,
    })
    console.log("temp is", temp)
    return temp
  }
  
  const startDetect = () => {
    intervalRef = setInterval(() => {
      detect(net)
    }, 500);
    console.log(intervalRef)
  };
  useEffect(()=>{
    if(!netLoaded){
      runPosenet().then((rem) => {setNet(rem)})
        .then(()=>{setNetLoaded(true)})
    }
    if(!baseLine && !findingBaseLine && netLoaded){
      setFindingBaseLine(true)
      baseLineFinding()
        .then(() => {setFindingBaseLine(false)})
        .then(() => {startDetect()})
    }
  })

  const detect = async () => {
    if (//카메라 상태 체크
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // 이걸 왜하나 싶지만, 안하면 버그 난다고 합니다.
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      return net.estimateSinglePose(video);
      

      //drawCanvas(pose, video, videoWidth, videoHeight, canvasRef).catch((err) => console.log(err)) // error happens sometimes. Not critical so just catch and drop.
    }
  };

  // const drawCanvas = async (pose, video, videoWidth, videoHeight, canvas) => {
  //   const ctx = canvas.current.getContext("2d");
  //   canvas.current.width = videoWidth;
  //   canvas.current.height = videoHeight;

  //   drawKeypoints(pose["keypoints"], 0.6, ctx); //그리기
  //   drawSkeleton(pose["keypoints"], 0.7, ctx);
  // };

  


  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 320,//640,480
            height: 240,
          }}
        />
    
        <Status statusLog={statusLog} />

        <button style={{position: "absolute",bottom:"30%"}} onClick={()=>setPoseDetect(false)}>close</button>
      </header> 
    </div>
  );
}

export default PoseDetect;
