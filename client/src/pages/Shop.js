import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {createType, fetchTypes} from "../http/typeAPI";
import { fetchBrands } from "../http/brandAPI";
import {fetchDevices} from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
  const {device} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    fetchDevices(null, null, 1, device.limit).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [])

  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
      console.log(device.totalCount)
      console.log(device.limit)
    })
  }, [device.page, device.selectedType.id, device.selectedBrand.id])

  return (
    <Container className={'mt-3'}>
      <Row
        lg='auto'
        md='auto'
        sm='auto'
        className={'flex-nowrap'}
      >
        <Col
          lg={3}
          md={3}
          sm={3}
        >
          <TypeBar/>
        </Col>
        <Col
          lg={9}
          md={9}
          sm={9}
        >
          <BrandBar/>
          <DeviceList/>
          <Pages/>
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;