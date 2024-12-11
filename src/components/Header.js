import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  '../bootstrap.min.css'
import {Nav, Navbar, NavDropdown, Container} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Logout } from '../actions/userActions'

function Header() {

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const logoutHandler = ()=>{
    console.log('Logout initiated')
    dispatch(Logout())
  }

  return (
    <header>
      <Navbar expand="lg" bg="dark" variant='dark' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand >ProShop</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            
            <LinkContainer to='/cart'>
              <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ):
            <LinkContainer to='/login'>
              <Nav.Link href="/login"><i className='fas fa-user'></i>Login</Nav.Link>
            </LinkContainer>
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </header>
  )
}

export default Header