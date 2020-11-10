import React from "react"
import Modal from "react-bootstrap/Modal"

export default ({ show, setShow, error }) => {
  console.log(error)
    return (
        <>
    
          <Modal
            show={show}
            onHide={() => setShow(null)}
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Something Wrong
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                {error}
              </p>
            </Modal.Body>
          </Modal>
        </>
      );
}