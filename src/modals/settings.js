import React, {useContext} from "react"
import Modal from "react-bootstrap/Modal"
import { currentSensitivity } from '../App'
export default ({ show, setShow, setSensitivity }) => {
  const sensitivity = useContext(currentSensitivity)
  const handleChange = (e) => {
    let val = parseInt(e.target.value)
    if ( isNaN(val) ){
      return
    }
    if( val < 5){
      val = 5
    }else if(val > 20){
      val = 20
    }
    setSensitivity(val)
  }
    return (
        <>
    
          <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="InstructionModal"
            aria-labelledby="example-custom-modal-styling-title"
            contentClassName="ModalHeight"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Settings
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form style={{height : "80%"}}>
                민감도 : {sensitivity}    
                <input style={{marginLeft : '2vw', marginRight : '2vw'}}type="text" onChange={handleChange}/>
                (5~20)
              </form>
            </Modal.Body>
          </Modal>
        </>
      );
}