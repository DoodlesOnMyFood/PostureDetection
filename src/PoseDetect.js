import React, { useRef, useState, useEffect } from "react";
import "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet"; //포즈 인식 모델
import Webcam from "react-webcam";
import Status from "./Status"
import Button from 'react-bootstrap/Button'
import { AppBody } from "./styles";


function PoseDetect( { setPoseDetect } ) {
  const webcamRef = useRef(null);
  const [net, setNet] = useState(null)
  const [netLoaded, setNetLoaded] = useState(false)
  const [baseLine, setBaseLine] = useState(null)
  const [intervalRef, setIntervalRef] = useState(null)
  const [counter, incrementCounter] = useState(0)
  const [statusLog, setStatusLog] = useState([])
  const [tempBase, setTempBase] = useState(0.0)
  const [CBase, setCBase] = useState(0.0)
  const [tempPose, setTempPose] = useState(null)
  const [resultBP, setResultBP] = useState(0)
  const [resultGP, setResultGP] = useState(0)

  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  const baseLineFinding = async () =>{
    const comment = "Correct Your Posture!"
    const temp_count = counter

    incrementCounter((prev)=>prev+1)
    setStatusLog((prev) => [ ...prev, {log : comment, key : temp_count}])
    await sleep(3000)
    let i
    for(i = 0; i < 10; i++){
      let pose = await detect(net)
      sleep(300)
      console.log(pose)
      setTempBase((tempBase + (pose["keypoints"][5]["y"] + pose["keypoints"][6]["y"])/2))
    } //Add y coor of both shoulders and div by 2, repeat 10 times
    setBaseLine(tempBase/10 + 5) //div tempBase by 10 and add 5 to set BaseLine

    setStatusLog((prev) =>{
      let index = prev.indexOf({log : comment, key : temp_count})
      prev.splice(index, 1)
      return [...prev]
    })
    setBaseLine(1) // setBaseLine to value. Dummy value for now
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
    setIntervalRef(setInterval(() => {
        setTempPose(detect(net))
      }, 500)
    )
    setCBase((TempPose["keypoints"][5]["y"] + TempPose["keypoints"][6]["y"])/2)
    //get current shoulder height
    if(BaseLine > CBase){ //if shoulder is higher than baseline, incrent resultGP
      setResultGP(resultGP+1)
    }
    else{
      setResultBP(resultBP+1) //if lower, increment resultBP
    }
    if((resultGP+resultBP)/2 < .5){ //been in bad posture for more than 50% of the time
      //display message maybe?
    }
    else{
      //higher than .5, so maybe hide the video and display time?
    }
    console.log(intervalRef)
  };
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Try and fix this warning if you can.
  // eslint-disable-next-line
  useEffect(()=>{
    if(!netLoaded){
      runPosenet().then((rem) => {setNet(rem)})
        .then(()=>{setNetLoaded(true)})
    }
    if(baseLine === null && netLoaded){
      setBaseLine(true)// block this if statement
      if(intervalRef !== null){
        clearInterval(intervalRef)
      }
      baseLineFinding()
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
    <div style={AppBody}>
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
      
      <Button variant="secondary"
        style={{
          position:"absolute",
          bottom:"30%"
        }}
        onClick={()=>setPoseDetect(false)}>Close</Button>
    </div> 
  );
}

export default PoseDetect;