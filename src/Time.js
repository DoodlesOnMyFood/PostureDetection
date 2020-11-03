import React, {useEffect, useState, useRef} from "react"
import {Timer} from "./Helper"

export default () =>{

    const [time, setTime] = useState(0)
    const tickTock = useRef(null)
    const timer = useRef(null)

    useEffect(() =>{
        if(tickTock.current === null){
            timer.current = new Timer()
            timer.current.start()
            tickTock.current = setInterval(() => {
                if (Math.round(timer.current.getTime() / 1000) > time){
                    setTime(Math.round(timer.current.getTime() / 1000))
                }
            } , 100)
        }
    }, [time])

    useEffect(() =>{
        return () => {
            clearInterval(tickTock.current)
        }
    }, [])

    return (
        <div>
            <h1>{time}</h1>
        </div>
    )
}