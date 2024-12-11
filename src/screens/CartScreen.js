import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Button, Image, Form, Card } from 'react-bootstrap'
import {Link, useNavigate, useParams,useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {addToCart, removeFromCart} from '../actions/cartActions'  
import Message from '../Message'

function Cart() {
  const {id } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const qty = searchParams.get('qty') ? parseInt(searchParams.get('qty')) : 1
  console.log(id+', qty:'+qty)

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  console.log('Initial Cart Object - ',cart)
  const {cartItems} = cart
  console.log('CartItem - ',cart.cartItems)

  const removeFromCartHandler = (productId) => {
    console.log('Remove Product :',productId)
    dispatch(removeFromCart(productId))
  }

  useEffect(() => {
    if(id){
      dispatch(addToCart(id,qty))
    }
      
  },[dispatch, id, qty])
    
  const checkoutHandler = () =>{
    console.log('Proceed To Checkout')
    navigate('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {
          cartItems.length === 0 ? (
            <Message variant='info'>
              Your cart is empty <Link to='/'>Go Back</Link>
            </Message>

          ) : 
          <ListGroup variant='flush'>
           { cartItems.map(item => (
              <ListGroup.Item>
                <Row >
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid className='rounded' />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={3}>
                  <Form.Control as="select"
                      value={item.quantity}
                      onChange={(e) => dispatch(addToCart(item.product, e.target.value))}
                  >
                    {
                        [...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                        ))
                    }
                 </Form.Control>                                           
                  </Col>
                  <Col md={1}>
                    <Button 
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
           ))

           }
          </ListGroup>
        }
        
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal({cartItems.reduce((acc, item) => acc + item.quantity,0)}) items</h2>
              ${cartItems.reduce((acc,item) => acc + item.quantity * item.price,0).toFixed(2)}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button 
                className='btn-block' 
                disabled={cartItems.length === 0}
                onClick={() => {checkoutHandler()}}>
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
            
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default Cart