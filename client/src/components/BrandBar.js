import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Col, Row} from "react-bootstrap";

const BrandBar = observer(() => {
  const {device} = useContext(Context)


  return (
    <Row className={'d-flex flex-shrink-0'}>
      {
        device.brands.map((brand, index) =>
          <Col
            lg={'auto'}
            md={'auto'}
            sm={'auto'}
            className={'p-0'}
            key={brand.id}
          >
          <Card
            style={{cursor: 'pointer', minWidth: 100}}
            bg={brand.id === device.selectedBrand.id ? 'dark' : ''}
            className={index === 0 ? 'p-2 rounded-0' : 'p-2 rounded-0 border-start-0'}
            border={'dark'}
            text={brand.id === device.selectedBrand.id ? 'light' : ''}
            onClick={() => device.selectedBrand !== brand ? device.setSelectedBrand(brand) : device.setSelectedBrand({})}
          >
            <div className={'m-auto'}>
              {brand.name}
            </div>
          </Card>
          </Col>
        )
      }
    </Row>
  );
});

export default BrandBar;