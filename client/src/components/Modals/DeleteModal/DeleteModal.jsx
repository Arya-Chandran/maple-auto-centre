import React from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import "./DeleteModal.scss"



function DeleteModal({ isOpen, vehicle, onClose, handleDelete }) {
    const { make, model, trim, vin } = vehicle;
    return (
      <>
        <Modal isOpen={isOpen} toggle={onClose}>
          <ModalHeader
            close={
              <button className="close" onClick={onClose}>
                ×
              </button>
            }
            toggle={onClose}
          >
          <h2 className="deleteHeading">Confirm Delete?</h2>  
          </ModalHeader>
          <ModalBody>
            <p  className="deleteContent">Do you want to remove {make} {model} {trim} from inventory?</p>
     
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => handleDelete(vin)}>
              Remove
            </Button>{" "}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }

  export default DeleteModal;