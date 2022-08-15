import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import star from '../assets/bigStar.png'
import {fetchDevice} from "../http/deviceAPI";
import {useParams} from "react-router-dom";
import data from "bootstrap/js/src/dom/data";

const DevicePage = () => {
  const [device, setDevice] = useState({info: []})
  const {id} = useParams()

  useEffect(() => {
    fetchDevice(id).then(data => setDevice(data))
  }, [])

  return (
    <Container className={'mt-3'}>
      <Row className={'d-flex'}>
        <Col
          sm={4}
        >
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
        </Col>
        <Col
          sm={4}
        >
          <h2>{device.name}</h2>
          <div
            className={'d-flex align-items-center justify-content-center'}
            style={{
              background: `url(${star}) no-repeat center center`,
              width:255,
              height: 240,
              backgroundSize: "cover",
              fontSize: 64,
          }}
          >
            {device.rating}
          </div>
        </Col>
        <Col
          sm={4}
        >
          <Card
            className={'d-flex flex-column align-items-center justify-content-around'}
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: '5px solid lightgray'}}
          >
            <h3>
             Starting From ${device.price}
            </h3>
            <Button variant={"outline-dark"}>
              Add to cart
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className={'d-flex flex-column m-3'}>
        <h2>Specification</h2>
        {/*{*/}
        {/*  device.description.map((desc) =>*/}
        {/*    <Row*/}
        {/*      key={desc.id}*/}
        {/*      style={{*/}
        {/*        background: desc.id % 2 === 0 ? 'transparent' : 'lightgray',*/}
        {/*        padding: 10*/}
        {/*    }}>*/}
        {/*      {desc.title}: {desc.value}*/}
        {/*    </Row>*/}
        {/*  )*/}
        {/*}*/}
      </Row>
    </Container>
  );
};

export default DevicePage;