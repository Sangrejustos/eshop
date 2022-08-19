import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import {deleteBasketDevice, fetchBasketDevices} from "../http/basketAPI";
import {observer} from "mobx-react-lite";
import {fetchDevice} from "../http/deviceAPI";

const Basket = observer(() => {
  const {user} = useContext(Context)
  const [basketDevices, setBasketDevices] = useState([])

  const deleteFromBasket = (id) => {
    deleteBasketDevice(user.user.id, id)
    setBasketDevices(basketDevices.filter( item => item.id !== id))
  }

  const fetchDevices = async (basket) => {
    for (const item of basket) {
      const response = await fetchDevice(item.deviceId)
      setBasketDevices(basketDevices => [...basketDevices, response])
    }
  }

  const fetchBasket = async () => {
    const basket = await fetchBasketDevices(user.user.id)
    fetchDevices(basket)
  }

  useEffect(() => {
    fetchBasket()
  }, [])

  return (
    <Container className={'mt-3'}>
      <Row>
        <Col sm={12}>
          <Card className={'mb-2 rounded-0 border-start-0 border-end-0 border-top-0'}>
            <div style={{fontSize: 22}} className={'m-auto'}>Your Shop Cart</div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={2}><div className={'m-auto'}>Product</div></Col>
        <Col sm={2}>Name</Col>
        <Col sm={4}></Col>
        <Col sm={2}>Price</Col>

      </Row>
      {
        basketDevices.map((item, index) =>
          <Card
            className={ index !== (basketDevices.length - 1)
              ? 'mb-3 p-3 d-flex border-start-0 border-end-0 border-bottom-0 rounded-0'
              : 'mb-3 p-3 d-flex border-start-0 border-end-0 rounded-0 pb-4'}
            key={item.id}
          >
            <Row>
              <Col sm={2}><Image style={{width: 100, height: 100}} src={process.env.REACT_APP_API_URL + item.img}/></Col>
              <Col sm={2}>{item.name}</Col>
              <Col sm={4}></Col>
              <Col sm={2} className={'ps-3'}>${item.price}</Col>
              <Col sm={2}>
                <Button variant={'outline-danger'} onClick={() => deleteFromBasket(item.id)}>Delete</Button>
              </Col>
            </Row>
          </Card>
        )
      }
    </Container>
  );
});

export default Basket;