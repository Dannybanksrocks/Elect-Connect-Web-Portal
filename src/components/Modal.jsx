import { Modal } from "@mui/material";
import "../styles/Modal.css";
import "../styles/OTP.css";

const ModalComponent = (props) => (
  <Modal open={props.open} onClose={props.onClose}>
    <div className="modal">{props.children}</div>
  </Modal>
);

export default ModalComponent;
