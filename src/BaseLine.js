import React, { useRef, useState, useEffect, isValidElement } from "react";
import "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet"; //포즈 인식 모델
import Webcam from "react-webcam";
import "./App.css";
import {AppBody, camMove, camInit} from "./styles"
import {detect, sleep, checkPose, Timer} from "./Helper"
const Time = React.lazy( () => import("./Time"))


export default ( { setPoseDetect } ) => {
    const webcamRef = useRef(null);
    const [netLoaded, setNetLoaded] = useState(false)
    const [net, setNet] = useState(null)
    const [comment, setComment] = useState(null)
<<<<<<< HEAD
    const [tempBase, setTempBase] = useState(0.0)
    let baseLine = {}
    
    const setBaseLine = (val) =>{
      baseLine.dummy = val
    }
=======
    const [dummy, setDummy] = useState(false)
    const [baseLine, setBaseLine] = useState(null)
>>>>>>> 1de409682b9371d854e4f058b0d600540c9706b3

    
    const baseLineFinding = async () =>{
        await sleep(4000)
        let i
        let head = 0
        let shoulders = 0
        for(i = 0; i < 10; i++){
            let pose = await detect(webcamRef, net)
            sleep(300)
            let temp = checkPose(pose)
            if (temp.error){
                console.log(temp.error)
                return false
            }
<<<<<<< HEAD
            tempBase = (tempBase + (pose["keypoints"][5]["y"] + pose["keypoints"][6]["y"])/2)
        }
        tempBase = tempBase/10 + 5

        setBaseLine(tempBase) // setBaseLine to value. Dummy value for now
        return true
=======
            console.log("one head : ", temp.head, "one shoulders : ", temp.shoulders)
            head +=temp.head
            shoulders +=temp.shoulders
        }
        console.log( "head average" , head/10, "shoulder average", shoulders / 10)
        return {head : head / 10, shoulders : shoulders / 10}
>>>>>>> 1de409682b9371d854e4f058b0d600540c9706b3
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
      let running = true
      if(!netLoaded){
        runPosenet().then((model) => {setNet(model)})
          .then(()=>{setNetLoaded(true)})
      }else if(netLoaded && baseLine === null){
        if (!comment){
          setComment("Correct Your Posture!") // memory leak happens. Try to fix this later
        }
        baseLineFinding()
        .then((result) => {
          if(running){
            console.log(result)
            if(result === null){
              console.log("end")
            }
            else if(result){
              console.log("Start animations")
              console.log(result)
              setBaseLine(result)
            }else{
              alert("Can't find person or shoulders") // modal maybe?
              if (dummy){
                setDummy((x) => !x)
              }else {
                setDummy((x) => !x)
              }
              
            }
          }
        }
        )
        .catch((e) => console.log("something happened : ", e))
      }
      
      return () => {running = false}
    })
    
    
    const cName = baseLine ? "test" : "init"


    // if(baseLine){ baseline for transition
    //   return <h1>Implement pose detection.</h1>
    // }
    return (
        <div style={{height:"100%"}}>
          <header style={AppBody}>
            { baseLine ? <Time /> : ""}
            <p>{comment === null ? "" : comment}</p>
            <div className={cName}>
              <Webcam
                ref={webcamRef}
                style={{ width : "100%", height : "100%"}}
                onClick={()=>{setPoseDetect(false)}}
              />
          </div>
          </header>  
        </div>
      );

}