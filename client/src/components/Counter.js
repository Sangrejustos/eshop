import React from 'react';
import {Button, ButtonGroup} from "react-bootstrap";

const Counter = ({onPlus, onMinus, value}) => {
  return (
    <ButtonGroup style={{width: 90,}}>
      <Button variant={"outline-dark"} className={'rounded-0'} onClick={onMinus}> - </Button>
      <Button variant={"outline-dark"} className={'rounded-0'}>{value}</Button>
      <Button variant={"outline-dark"} className={'rounded-0'} onClick={onPlus}> + </Button>
    </ButtonGroup>

  );
};

export default Counter;