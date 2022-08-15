import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createType} from "../../http/typeAPI";

const CreateType = ({show, onHide}) => {
  const [value, setValue] = useState('')

  const addType = () => {
    createType({name: value}).then(data => setValue(''))
    onHide()
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create new type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control value={value} onChange={(e) => setValue(e.target.value)} placeholder={'enter type name'}/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'outline-dark'} onClick={addType} >Create</Button>
        <Button variant={'outline-danger'} onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;