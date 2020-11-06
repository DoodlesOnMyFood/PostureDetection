import React, {useEffect, useState, useRef} from "react"

export default () =>{
    let time = ""
    const [ctime, setCtime] = useState(time);
    const [running, setRunning] = useState(true);
    const tickTock = useRef(null)

    const updateTime = () => {
        time = new Date().toLocaleTimeString()
        if(time.search("오후")===0){
            time = time.slice(2)
            time = time+" PM"
        }
        else{
            time = time.slice(2)
            time = time+" AM"
        }

        setCtime(time)
    }

    useEffect(() =>{
        if(tickTock.current === null){
            tickTock.current = setInterval(() => {
                updateTime()
            }, 1000)
        }
    }
    , [running])

    useEffect(() =>{
        return () => {
            setRunning(false)
            clearInterval(tickTock.current)
        }
    }, [])

    const timeClass = running ? "timerClass" : ""

    return (
        <div className={timeClass}>
            {ctime}
        </div>
    )
}