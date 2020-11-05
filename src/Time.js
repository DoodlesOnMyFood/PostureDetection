import React, {useEffect, useState, useRef} from "react"
import {Timer} from "./Helper"

export default () =>{

    const [time, setTime] = useState(0)
    const [running, setRunning] = useState(true)
    const tickTock = useRef(null)
    const timer = useRef(null)
    var date = new Date();
    const [hour, setHour] = useState(date.getHours())
    const [min, setMin] = useState(date.getMinutes())
    const [sec, setSec] = useState(date.getSeconds())
    useEffect(() =>{
        if(tickTock.current === null){
            timer.current = new Timer()
            timer.current.start()          
            tickTock.current = setInterval(() => {
                if (Math.round(timer.current.getTime() / 1000) > time){
                    setSec(sec+1)
                    if (sec===60){
                        setSec(0)
                        setMin(min+1)
                        if(min===60){
                            setMin(0)
                            setHour(hour+1)
                            if(hour===24){
                                setHour(0)
                            }
                        }
                    }
                    setTime(Math.round(timer.current.getTime() / 1000))

                }
            } , 100)
        }
    }, [time, running])

    useEffect(() =>{
        return () => {
            setRunning(false)
            clearInterval(tickTock.current)
        }
    }, [])

    const timeClass = running ? "timerClass" : "" // maybe implement returning animations
    
    return (
        <div className={timeClass}>
            {time}
            <br></br>
            {hour+":"+min+":"+sec}
        </div>
    )
}