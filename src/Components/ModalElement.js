import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { userUpdateContext } from "./TableComponent";
export default function ModalElement(props) {
  const contextData = useContext(userUpdateContext);
  const [name, setName] = useState(props.details.name);
  const [email, setEmail] = useState(props.details.email);
  const [role, setRole] = useState(props.details.role);

  return (
    <Modal
      animation={false}
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit User Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>User Email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>User Role</Form.Label>
            <Form.Control
              type="text"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              contextData.updateuser({
                id: props.details.id,
                name: name,
                email: email,
                role: role,
              });
              props.onHide();
            }}
          >
            Update
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
