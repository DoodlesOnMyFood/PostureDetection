import React, { useRef, useState, useEffect } from "react";
import "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet"; //포즈 인식 모델
import Webcam from "react-webcam";
import "./App.css";
import {AppBody} from "./styles"
import {detect, sleep, checkPose} from "./Helper"
import DetectionError from "./modals/DetectionError"

const Time = React.lazy( () => import("./Time"))
const Instructor = React.lazy( () => import("./Instructor"))


export default ( { setPoseDetect } ) => {
    const webcamRef = useRef(null);
    const intervalRef = useRef(null)
    const errorLog = useRef(null)
    const [showError, setShowError] = useState(null)
    const [netLoaded, setNetLoaded] = useState(false)
    const [net, setNet] = useState(null)
    const [clearing, setClearing] = useState(false)
    const [baseLine, setBaseLine] = useState(null)
    const [instructorInfo, setInstructorInfo] = useState(null)
    let cName = "init"

    console.log(`showError : ${showError} netLoaded : ${netLoaded} net : ${net} clearing : ${clearing} baseLine : ${baseLine} instructorInfo : ${instructorInfo}`)
    
    const baseLineFinding = async (x) =>{
        await sleep(x)
        let i
        let head = 0
        let shoulders = 0
        for(i = 0; i < 10; i++){
            let pose = await detect(webcamRef, net)
            sleep(300)
            let temp = checkPose(pose)
            if (temp.error){
                console.log(temp.error)
                errorLog.current = temp.error
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
          if(showError){
            return
          }
          for(i = 0; i < 20; i++){
            let pose = await detect(webcamRef, net)
            await sleep(200)
            let temp = null
            try{
              temp = checkPose(pose)
            } catch(e){
              console.log(e)
              return
            }
            if(temp.error && errorCount === 3 && !showError){
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
          if (showError){
            return
          }
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
      }else if(netLoaded && baseLine === null && !showError){
        baseLineFinding(4000)
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
              setShowError(true)
            }
          }
        }
        )
        .catch((e) => console.log("something happened : ", e))
      }
      
      return () => {running = false}
    }, )
    
    
    if(baseLine && !clearing){
      cName = "test"
    }else if (clearing){
      cName = "clear"
    }

    const reset = () =>{
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setInstructorInfo(null)
      setBaseLine(null)
      setClearing(false)
    }


    const baseLineConfig = () =>{
      baseLineFinding(0).then((base) =>{
        if(base){setBaseLine(base)}
        else{
          errorLog.current = "문제 생김"
          setShowError(true)          
        }
      })
    }

    const clearState = async () => {
      setClearing(true)
      await sleep(3000)
      reset()
      setPoseDetect(false)
      console.log("button should return?")
    }

    return (
        <div style={AppBody}>
          <header style={AppBody}>
            { baseLine ? <Time clear={clearing}/> : ""}
            { baseLine ? <Instructor clear={clearing} instructorInfo={instructorInfo} baseLine={baseLine} reset={reset} baseLineConfig={baseLineConfig}/> : ""}
            <div className={cName}>
              <Webcam
                ref={webcamRef}
                style={{ width : "100%", height : "100%"}}
                onClick={()=>{clearState()}}
                mirrored={true}
              />
          </div>
          </header>  
          <DetectionError show={showError} setShow={setShowError} error={errorLog.current}/>
        </div>
      );

}