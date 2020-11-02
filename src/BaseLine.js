import React, { useRef, useState, useEffect, isValidElement } from "react";
import "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet"; //포즈 인식 모델
import Webcam from "react-webcam";
import "./App.css";
import {detect, sleep, checkPose} from "./Helper"



export default ( { setPoseDetect } ) => {
    const webcamRef = useRef(null);
    const [baseLineFound, baseLineFinder ] = useState(false)
    const [netLoaded, setNetLoaded] = useState(false)
    const [intervalRef, setIntervalRef ] = useState(null)
    const [net, setNet] = useState(null)
    const [comment, setComment] = useState(null)
    let baseLine = {}
    
    const setBaseLine = (val) =>{
      baseLine.dummy = val
    }

    const baseLineFinding = async () =>{
        await sleep(4000)
        let i
        for(i = 0; i < 10; i++){
            let pose = await detect(webcamRef, net)
            sleep(300)
            if (!checkPose(pose)){
                return false
            }
        }
        setBaseLine(1) // setBaseLine to value. Dummy value for now
        return true
    }

    const runPosenet = async () => {
        let temp =  await posenet.load({
          architechture:'MobileNetV', 
          inputResolution: { width: 320, height: 240 },
          multiplier: 0.5,
        })
        console.log("temp is", temp)
        return temp
      }

    useEffect(()=>{
      if(!netLoaded){
        runPosenet().then((model) => {setNet(model)})
          .then(()=>{setNetLoaded(true)})
      }
      if(!baseLineFound && netLoaded){
        baseLineFinder(true)// block this if statement
        if(intervalRef !== null){
          clearInterval(intervalRef)
        }
        setComment("Correct Your Posture!") // memory leak happens. Try to fix this later
        baseLineFinding()
        .then((result) => {
          if(result === null){
            console.log("end")
          }
          else if(result){
            console.log("Start animations")
          }else{
            alert("Can't find person or shoulders")
            baseLineFinder(false)
          }
        })
      }
      })
    
    return (
        <div className="App">
          <header className="App-body">
            <p>{comment === null ? "" : comment}</p>
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
              onClick={()=>{setPoseDetect(false)}}
            />
        
          </header>  
        </div>
      );

}