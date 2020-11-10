import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button"
import TextBox from "./Images/textBox.png"
import SergeantTextless from "./Images/Sergeant_textless.png"

export default ({ instructorInfo, baseLine, reset, baseLineConfig, clear}) =>{
    const [withText, setWithText] = useState(false)
    const [errorCount, setErrorCount] = useState(0)
    const [animationClass, setAnimationClass] = useState("instructorImage")
    const [animationClassButton, setAnimationClassButton] = useState("buttonShow")
    console.log(`withText : ${withText} errorCount : ${errorCount} animationClass : ${animationClass} clear : ${clear} baseLine : ${baseLine} instructorInfo : ${instructorInfo}`)

    const assess = () =>{
        return (
            <p style={{wordBreak: "break-all", width:"100%", height:"100%"}}>
                {`head : ${(instructorInfo.head - baseLine.head)}`}
                <br/>
                {`shoulders : ${(instructorInfo.shoulders - baseLine.shoulders)}`}
            </p>
        )
    }

    if (errorCount > 4){
        reset()
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
            <div style={{position: "fixed", width : "23vw", height : "40vh", left : "0px", bottom : "19vw" }}>
                <img src={TextBox} alt="Textbox" style={{width:'100%', height:'100%'}}/>
                <div style={{position : "absolute", width:'20vw', height:'70%', top:"2%", left:'1.5vw',  zIndex : 2, color: "black"}}>
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
            <div className={animationClass}>
                {SergeantOutput()}
            </div>
            <Button className={animationClassButton} onClick={baseLineConfig}>다시 맞추기</Button>
        </>
    )
}