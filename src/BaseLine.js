import React, { useRef, useState, useEffect } from "react";
import "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet"; //포즈 인식 모델
import Webcam from "react-webcam";
import "./App.css";
import {AppBody} from "./styles"
import {detect, sleep, checkPose} from "./Helper"
const Time = React.lazy( () => import("./Time"))
const Instructor = React.lazy( () => import("./Instructor"))


export default ( { setPoseDetect } ) => {
    const webcamRef = useRef(null);
    const intervalRef = useRef(null)
    const [netLoaded, setNetLoaded] = useState(false)
    const [net, setNet] = useState(null)
    const [dummy, setDummy] = useState(false)
    const [baseLine, setBaseLine] = useState(null)
    const [instructorInfo, setInstructorInfo] = useState(null)

    
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
            console.log("one head : ", temp.head, "one shoulders : ", temp.shoulders)
            head +=temp.head
            shoulders +=temp.shoulders
        }
        console.log( "head average" , head/10, "shoulder average", shoulders / 10)
        return {head : head / 10, shoulders : shoulders / 10}
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

    if (baseLine && intervalRef.current === null){
      intervalRef.current = setInterval(async () => { // set posedetection
          let i
          let head = 0
          let shoulders = 0
          let errorCount = 0
          let okCount = 0
          for(i = 0; i < 20; i++){
            let pose = await detect(webcamRef, net)
            sleep(200)
            let temp = checkPose(pose)
            if(temp.error && errorCount === 3){
              console.log(temp.error)
              setInstructorInfo({
                head : null,
                shoulders : null,
                error : true
              })
              return 
            }
            if (temp.error){
              errorCount += 1
              continue
            }
            head +=temp.head
            shoulders +=temp.shoulders
            okCount += 1
          }
          console.log( "Instructor says : head average" , head/okCount, "shoulder average", shoulders/okCount)
          setInstructorInfo({
            head : head/okCount,
            shoulders : shoulders/okCount,
            error : null
          })
        }, 9000
      )
    }
                                      

    // eslint-disable-next-line
    useEffect(()=>{
      let running = true
      if(!netLoaded){
        runPosenet().then((model) => {setNet(model)})
          .then(()=>{setNetLoaded(true)})
      }else if(netLoaded && baseLine === null){
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
    }, )
    
    
    const cName = baseLine ? "test" : "init"

    const reset = () =>{
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setInstructorInfo(null)
      setBaseLine(null)
    }


    const baseLineConfig = () =>{
      baseLineFinding().then((base) =>{setBaseLine(base)})
    }
    return (
        <div style={AppBody}>
          <header style={AppBody}>
            { baseLine ? <Time /> : ""}
            { baseLine ? <Instructor instructorInfo={instructorInfo} baseLine={baseLine} reset={reset} baseLineConfig={baseLineConfig}/> : ""}
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