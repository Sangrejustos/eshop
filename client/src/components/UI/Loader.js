import React from 'react';
import {Spinner} from "react-bootstrap";

const Loader = () => {
  return (
    <div className={'d-flex justify-content-center align-items-center'} style={{height: window.innerHeight}}>
      <div>
      <Spinner animation="grow" variant="primary" className={'m-1'}/>
      <Spinner animation="grow" variant="success" className={'m-1'}/>
      <Spinner animation="grow" variant="danger" className={'m-1'} />
      </div>
    </div>
  );
};

export default Loader;