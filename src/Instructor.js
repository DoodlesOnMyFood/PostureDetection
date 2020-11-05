import React, { useRef} from "react";

export default ({ instructorInfo, baseLine, reset }) =>{
    const count = useRef(0)
    const interpret = () => {
        if (count.current > 5){
            reset()
            return
        }
        if (instructorInfo.error){
            count.current += 1
            return (
                <div>
                </div>
            )    
        }else{
            count.current = 0
        }
        return (
            <div>
                <p>{`${instructorInfo.head} , ${instructorInfo.shoulders} `}</p>
                <p>{`${baseLine.head} , ${baseLine.shoulders} `}</p>
            </div>
        )
    }

    return (
        <div >
            {instructorInfo === null ? "" : interpret()}
        </div>
    )
}