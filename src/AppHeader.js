import React, {useState} from "react";
import Navbar from 'react-bootstrap/Navbar'
import settings from "./Images/settings.svg"
import help from "./Images/help.svg"
import {brand_style, instructionStyle, settingStyle} from "./styles"
import HowToUse from './modals/HowToUse'
import Settings from './modals/settings'



function App_Header({ setSensitivity }) {
  const [instructions, showInstructions] = useState(false)
  const [settingsToggle, showSettingsToggle] = useState(false)
  return(
      <div style={{height : '100%',}}>
          <Navbar collapseOnSelect style={{height:"100%", padding: "0px", margin: "0px", }} sticky='bottom' expand="lg" bg="dark" variant="dark" >
            <Navbar.Brand style={brand_style}>교정교관</Navbar.Brand>
            <img src={help} alt="help icon" style={instructionStyle} onClick={()=>{showInstructions(true)}} />
            <img src={settings} alt="settings icon" style={settingStyle} onClick={()=>{showSettingsToggle(true)}}/>
          </Navbar>
          <HowToUse show={instructions} setShow={showInstructions} />
          <Settings show={settingsToggle} setShow={showSettingsToggle} setSensitivity={setSensitivity}/>
      </div>
  )
}

export default App_Header;