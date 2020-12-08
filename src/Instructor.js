import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button"
import TextBox from "./Images/textBox.png"
import SergeantTextless from "./Images/Sergeant_textless.png"
import {currentSensitivity} from "./App"
import {sleep} from "./Helper"

export default ({ instructorInfo, baseLine, reset, baseLineConfig, clear}) =>{
    const [withText, setWithText] = useState(false)
    const [errorCount, setErrorCount] = useState(0)
    const [animationClass, setAnimationClass] = useState("instructorImage")
    const [reconfigure, showReconfigure] = useState("configOff")
    const [animationClassButton, setAnimationClassButton] = useState("buttonShow")
    const sensitivity = useContext(currentSensitivity)

    const assess = () =>{
        const head = instructorInfo.head - baseLine.head
        const shoulders = instructorInfo.shoulders - baseLine.shoulders
        let comment = ''
        if (head > sensitivity && shoulders <= sensitivity){
            comment = "머리가 내려간다"
        }else if (shoulders > sensitivity && head <= sensitivity){
            comment = "어깨가 내려간다"
        }else if (shoulders > sensitivity && head > sensitivity){
            comment = "자세가 너무 내려갔다"
        }else if (head < -sensitivity && shoulders <= sensitivity && shoulders > -sensitivity){
            comment = "처음 자세를 잘못 잡은 것 같다. 다시 교정치 잡아"
        }else if (head < -sensitivity && shoulders < -sensitivity ){
            comment = "카메라에 가까워진건가? 다시 교정치 잡아!"
        }else{
            comment = "일단은 괜찮은 것 같군"
        }

        return (
            <div style={{width : '100%', height : '100%', display:'flex', justifyContent:'center', alignItems : 'center'}}>
                <p style={{wordBreak: "break-all", textAlign:'center', justifyContent: "center" }}>
                    {comment}
                </p>
            </div>
        )
    }

    if (errorCount > 4){
        reset()
    }

    const refigure = () => {
        showReconfigure("configOn")
        sleep(3000)
            .then(() => showReconfigure("configOff"))
        
    }
    
    useEffect(() => {
        if(instructorInfo){
            if(instructorInfo.error || clear){
                setWithText(false)
                if(!clear){
                    setErrorCount((prev) => prev+1)
                }
            }else{
                setWithText(true)
                setErrorCount(0)
            }
        }
        // eslint-disable-next-line 
    }, [instructorInfo])
    
    useEffect(() => {
        if(clear){
            setWithText(false)
            setAnimationClass("instructorFade")
            setAnimationClassButton("buttonHide")
        }
    }, [clear])
    
    


    const interpret = () => {
        if (instructorInfo.error){
            return <></>
        }
        return assess()
    }

    const SergeantOutput = () =>{
        if(withText){
            return (
            <>
            <div style={{position: "fixed", width : "23vw", height : "40vh", left : "0px", bottom : "19vw" }} className='InstructorText'>
                <img src={TextBox} alt="Textbox" style={{width:'100%', height:'100%'}}/>
                <div style={{position :"absolute", width:'20vw', height:'70%', top:"2%", left:'1.5vw', zIndex :2, color:"black"}}>
                    {interpret()}
                </div>
            </div>
            <img src={SergeantTextless} alt="Sergeant" style={{width:'100%', height:'100%'}}/>
            </>
            )
        }
        return <img src={SergeantTextless} alt="Sergeant" style={{width:'100%', height:'100%'}}/>
    }


    return (
        <>
            <div className={reconfigure}>
                재조정중...
            </div>
            <div className={animationClass}>
                {SergeantOutput()}
            </div>
            <Button className={animationClassButton} onClick={() => {refigure(); baseLineConfig()}}>다시 맞추기</Button>
        </>
    )
}