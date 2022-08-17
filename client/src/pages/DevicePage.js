import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import star from '../assets/bigStar.png'
import {fetchDevice} from "../http/deviceAPI";
import {useParams} from "react-router-dom";
import Counter from "../components/Counter";
import {createBasketItem} from "../http/basketAPI";
import jwtDecode from "jwt-decode";

const DevicePage = () => {
  const [device, setDevice] = useState({info: []})
  const {id} = useParams()
  const [amount, setAmount] = useState(1)
  const user = jwtDecode(localStorage.getItem('token'))

  useEffect(() => {
    fetchDevice(id).then(data => setDevice(data))
  }, [])

  const addToCart = () => {
    createBasketItem(amount, user.id, id)
  }

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
            <div>
              <p></p>
              <Counter value={amount} onPlus={() => setAmount(amount + 1)} onMinus={() => {if(amount > 1) setAmount(amount - 1)}}/>
            </div>
            <Button variant={"outline-dark"} onClick={addToCart}>
              Add to cart
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className={'d-flex flex-column m-3'}>
        <h2>Specification</h2>
        { device.description &&
          device.description.map((desc) =>
            <Row
              key={desc.id}
              style={{
                background: desc.id % 2 === 0 ? 'transparent' : 'lightgray',
                padding: 10
            }}>
              {desc.title}: {desc.value}
            </Row>
          )
        }
      </Row>
    </Container>
  );
};

export default DevicePage;