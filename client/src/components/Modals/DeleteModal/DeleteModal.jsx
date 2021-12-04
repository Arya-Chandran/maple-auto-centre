import React from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";



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
            Confirm Delete?
          </ModalHeader>
          <ModalBody>
            Do you want to remove {make} {model} {trim} from inventory?
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