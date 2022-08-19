import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/star.png'
import {useNavigate} from 'react-router-dom'
import {DEVICE_ROUTE} from "../utils/consts";
import {useContext} from "react";
import {Context} from "../index";

const DeviceItem = ({thisDevice}) => {
  const navigate = useNavigate()
  const {device} = useContext(Context)

  return (
    <Col
      lg={3}
      md={3}
      sm={3}
      className={'mt-1'}
    >
      <Card
        style={{cursor: "pointer", width: 150}}
        className={'rounded-0 p-1 border-0'}
        onClick={() => navigate(DEVICE_ROUTE + "/" + thisDevice.id )}
      >
        <Image height={150} src={process.env.REACT_APP_API_URL + thisDevice.img}/>
        <div className={'text-black-50 d-flex justify-content-between align-items-center'}>
          <div>{ device.brands.find(item => item.id === thisDevice.brandId).name }</div>
          <div className={'d-flex align-items-center'}>
            <div>{thisDevice.rating}</div>
            <Image width={14} height={13} src={star}/>
          </div>
        </div>
        <div>
          {thisDevice.name}
        </div>
      </Card>
    </Col>
  );
};

export default DeviceItem;