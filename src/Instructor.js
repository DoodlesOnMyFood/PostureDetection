import React, { useRef} from "react";
import {instructorText} from "./styles"

export default ({ instructorInfo, baseLine, reset, baseLineConfig }) =>{
    const count = useRef(0)
    const assess = () =>{
        return (
            <p>
                {`head : ${(instructorInfo.head - baseLine.head)}`}
                <br/>
                {`shoulders : ${(instructorInfo.shoulders - baseLine.shoulders)}`}
            </p>
        )
    }


    const interpret = () => {
        if (count.current > 5){
            reset()
            return
        }
        if (instructorInfo.error){
            count.current += 1
            console.log(count.current)
            return (
                <div>
                </div>
            )    
        }else{
            count.current = 0
        }
        return (
            <div>
                {assess()}
            </div>
        )
    }

    return (
        <div style={instructorText}>
            {instructorInfo === null ? "" : interpret()}
        </div>
    )
}