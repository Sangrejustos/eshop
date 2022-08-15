import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Col, Row} from "react-bootstrap";

const BrandBar = observer(() => {
  const {device} = useContext(Context)


  return (
    <Row className={'d-flex flex-shrink-0'}>
      {
        device.brands.map(brand =>
          <Col
            lg={'auto'}
            md={'auto'}
            sm={'auto'}
            className={'p-0'}
            key={brand.id}
          >
          <Card
            style={{cursor: 'pointer'}}
            border={brand.id === device.selectedBrand.id ? 'dark' : 'light'}
            className={'p-2'}
            onClick={() => device.setSelectedBrand(brand)}
          >
            {brand.name}
          </Card>
          </Col>
        )
      }
    </Row>
  );
});

export default BrandBar;