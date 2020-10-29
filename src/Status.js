import React from 'react'

export default function ({ statusLog }) {
const log = statusLog.map((l)=><p>{l}</p>)
    
    return (
        <div style={{position:"absolute", bottom:"20%"}}>
            {log}
        </div>       
    )
}