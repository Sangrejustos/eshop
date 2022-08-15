import React, {useContext, useState} from 'react';
import {Button, ButtonGroup, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {useEffect} from "react";
import {fetchTypes} from "../../http/typeAPI";
import {fetchBrands} from "../../http/brandAPI";
import {observer} from "mobx-react-lite";
import {createDevice} from "../../http/deviceAPI";

const CreateDevice = observer(({show, onHide}) => {
  const {device} = useContext(Context)
  const [info, setInfo] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [brand, setBrand] = useState(null)
  const [type, setType] = useState(null)

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
  }, [])

  const addSpec = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }

  const deleteSpec = (id) => {
    setInfo(info.filter(spec => spec.number !== id))
  }

  const changeSpec = (key, value, number) => {
    setInfo(info.map(item => item.number === number ? {...item, [key]: value} : item))
  }

  const selectFile = (e) => {
    setFile(e.target.files[0])
    console.log(file)
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(data => onHide())
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create new device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className={'d-flex flex-column'} style={{width: 150}}>
            <Dropdown drop={"end"} as={ButtonGroup} className={'mb-1'} >
              <Button variant={'outline-dark'} style={{width: 125}}>{device.selectedType.name || 'choose type'}</Button>
              <Dropdown.Toggle style={{width: 25}} split variant={'outline-dark'}/>
              <Dropdown.Menu>
                {
                  device.types.map(type =>
                    <Dropdown.Item onClick={() => device.setSelectedType(type)} key={type.id}> {type.name} </Dropdown.Item>
                  )
                }
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown drop={"end"} as={ButtonGroup}>
              <Button variant={'outline-dark'} style={{width: 125}}>{device.selectedBrand.name || 'choose brand'}</Button>
              <Dropdown.Toggle split variant={'outline-dark'} style={{width: 25}}/>
              <Dropdown.Menu>
                {
                  device.brands.map(brand =>
                    <Dropdown.Item onClick={() => device.setSelectedBrand(brand)} key={brand.id}> {brand.name} </Dropdown.Item>
                  )
                }
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Form.Control
            value={name}
            className={'mt-1'}
            placeholder={'enter device name'}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            value={price}
            type={'number'}
            className={'mt-1'}
            placeholder={'enter device price'}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Form.Control
            type={'file'}
            className={'mt-1'}
            onChange={selectFile}/>
        </Form>
        <hr/>
        <Button style={{width: 160}} variant={"outline-dark"} onClick={addSpec}>Add specification</Button>
        {
          info.map(record =>
            <Row key={record.number} className={'d-flex mt-1'}>
              <Col sm={4} className={'pe-0'}>
                <Form.Control
                  value={record.title}
                  onChange={(e) => changeSpec('title', e.target.value, record.number)}
                  placeholder={'enter spec title'}
                />
              </Col>
              <Col sm={4} className={'pe-0'}>
                <Form.Control
                  value={record.description}
                  onChange={(e) => changeSpec('description', e.target.value, record.number)}
                  placeholder={'enter spec description'}
                />
              </Col>
              <Col sm={4} className={'pe-0'}>
                <Button variant={"outline-danger"} onClick={() => deleteSpec(record.number)}>delete spec</Button>
              </Col>
            </Row>
          )
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'outline-dark'} onClick={addDevice}>Create</Button>
        <Button variant={'outline-danger'} onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;