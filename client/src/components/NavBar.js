import React, {useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, ButtonGroup, Image} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import shopcart from '../assets/shopcart.png'

const NavBar = observer(() => {
  const navigate = useNavigate()
  const {user} = useContext(Context)

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    user.setBasket([])
    localStorage.removeItem('token')
    navigate(SHOP_ROUTE, {replace: true})
  }

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <NavLink style={{color: "#212529", textDecoration: 'none'}} to={SHOP_ROUTE}>Main Page</NavLink>
        { user.isAuth ?
          <Nav>
            <div className={'d-flex align-items-center justify-content-center'}>
            <Image src={shopcart} className={'me-4'} style={{width: 20, height: 20, cursor: "pointer"}} onClick={() => navigate(BASKET_ROUTE)}/>
            </div>
            <ButtonGroup>
              <Button
                size={"sm"}
                variant="outline-dark"
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                Admin page
              </Button>
              <Button
                size={"sm"}
                variant="outline-dark"
                onClick={logOut}>
                Exit
              </Button>
            </ButtonGroup>
          </Nav>
          :
          <Nav>
            <Button
              size={"sm"}
              variant="outline-dark"
              onClick={() => navigate(LOGIN_ROUTE)}>Login</Button>
          </Nav>
        }
      </Container>
    </Navbar>
  );
});


export default NavBar;