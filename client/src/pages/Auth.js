import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const click = async () => {
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }
      user.setUser(data)
      user.setIsAuth(true)
      navigate(SHOP_ROUTE, {replace: true})
    } catch (e) {
      alert(e.response.data.message)
    }
  }
  return (
    <Container
      className={'d-flex justify-content-center align-items-center'}
      style={{height: window.innerHeight - 54}}
    >
      <Card style={{width: 500}} className={'p-5'}>
        <h2 className={'m-auto'}>{isLogin ? 'Sign in' : 'Create account'}</h2>
        <Form className={'d-flex flex-column'}>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={'mt-2'}
            placeholder='email'
          />
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={'mt-2'}
            type='password'
            placeholder='password'
          />
          <Row className='d-flex flex-row justify-content-between mt-2'>
            <Col className={'d-flex align-items-center'}>
              {isLogin
                ?
                <div>
                  <NavLink to={REGISTRATION_ROUTE}>Create account</NavLink>
                </div>
                :
                <div>
                  <NavLink to={LOGIN_ROUTE}>Sign in</NavLink>
                </div>
              }
            </Col>

            <Col className={'d-flex justify-content-end'}>
              <Button
                variant='outline-dark'
                onClick={click}
              >
                {isLogin ? 'Sign in' : 'Sign up'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;