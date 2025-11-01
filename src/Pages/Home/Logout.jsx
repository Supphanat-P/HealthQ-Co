import React from "react";
import { Modal } from "react-bootstrap";

const Logout = () => {
  const waiting = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  sessionStorage.setItem("login", "false");
  waiting(1000).then(() => {
    window.location.href = "/";
  });
  
  const [show, setShow] = React.useState(true);
  const onClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={onClose} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title className="fs-1 text-navy fw-bold mt-0">
            ออกจากระบบ
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalBody">
          <p className="text-navy mb-0">คุณได้ออกจากระบบเรียบร้อยแล้ว</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Logout;
