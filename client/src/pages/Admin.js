import React, {useState} from 'react';
import {Button, Col, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateType from "../components/modals/CreateType";
import CreateDevice from "../components/modals/CreateDevice";

const Admin = () => {
  const [showBrand, setShowBrand] = useState(false)
  const [showType, setShowType] = useState(false)
  const [showDevice, setShowDevice] = useState(false)

  const hideBrand = () => {
    setShowBrand(false)
  }
  const hideType = () => {
    setShowType(false)
  }
  const hideDevice = () => {
    setShowDevice(false)
  }

  return (
    <Container className={'d-flex flex-column'}>
      <Col sm={4} className={'d-flex flex-column'}>
        <Button
          variant={'outline-dark'}
          className={'mt-3'}
          onClick={() => setShowBrand(true)}
        >
          Add brand
        </Button>
        <Button
          variant={'outline-dark'}
          className={'mt-3'}
          onClick={() => setShowType(true)}
        >
          Add type
        </Button>
        <Button
          variant={'outline-dark'}
          className={'mt-3'}
          onClick={() => setShowDevice(true)}
        >
          Add device
        </Button>
      </Col>
      <CreateBrand show={showBrand} onHide={hideBrand}/>
      <CreateType show={showType} onHide={hideType}/>
      <CreateDevice show={showDevice} onHide={hideDevice}/>
    </Container>
  );
};

export default Admin;