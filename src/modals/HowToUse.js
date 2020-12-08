import React from "react"
import Modal from "react-bootstrap/Modal"

export default ({ show, setShow,  }) => {
    
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
                사용법
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{height : "80%"}}>
                How to use
              </p>
            </Modal.Body>
          </Modal>
        </>
      );
}