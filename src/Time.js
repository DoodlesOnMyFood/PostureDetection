import React, {useEffect, useState, useRef} from "react"
import Switch from "react-switch"
import {Timer} from "./Helper"


export default () =>{
    const clock = useRef("")
    const [time, setTime] = useState(0)
    const [running, setRunning] = useState(true)
    const [timerOrClock, setTimerOrClock] = useState(true)
    const tickTock = useRef(null)
    const timer = useRef(null)
    

    useEffect(() =>{
        if(tickTock.current === null){
            timer.current = new Timer()
            timer.current.start()          
            tickTock.current = setInterval(() => {
                if (Math.round(timer.current.getTime() / 1000) > time){
                    setTime(Math.round(timer.current.getTime() / 1000))
                    updateClock()
                }
            } , 100)
        }
    }, [time, running])

    const updateClock = () => {
        let temp
        temp = new Date().toLocaleTimeString()
        if(temp.search("오후")===0){
            temp = temp.slice(2)
            temp = temp +" PM"
        }
        else{
            temp = temp.slice(2)
            temp = temp +" AM"
        }
        clock.current = temp
    }

    useEffect(() =>{
        return () => {
            setRunning(false)
            clearInterval(tickTock.current)
        }
    }, [])

    const updateTime = (k) => {
        if (k<10) {
            return "0" + k
        }
        return k
    }

    const timeClass = running ? "timerClass" : "" // maybe implement returning animations

    const timerParse = () => {
        return updateTime(parseInt(time/3600))+":"+updateTime(parseInt(time/60))+":"+updateTime(time%60)
    }
    

    return (
        <div>
            <label>
                <span>{timerOrClock ? "Switch to Clock" :"Switch to Timer"}</span>
                <br/>
                <Switch onChange={setTimerOrClock} checked={timerOrClock} uncheckedIcon={false} checkedIcon={false}/>
            </label>
            <div className={timeClass}>
                {timerOrClock ? timerParse() : clock.current}
            </div>
        </div>
    )
}

