import React from 'react'

export default function ({ statusLog }) {
const log = statusLog.map((l)=><p key={l.key} >{l.log}</p>)
    
    return (
        <div style={{position:"absolute", bottom:"20%"}}>
            {log}
        </div>       
    )
}