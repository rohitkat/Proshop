import React, { useState } from 'react'
import { Row, Col, Image, Button, Card, ListGroup, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { singleProduct } from '../actions/productActions'
import Loader from '../components/Loader'
import ErrorDisplay from '../components/ErrorDisplay'

function ProductScreen({ match }) {
    const {id } = useParams()
    const navigate = useNavigate()
    console.log(useParams())
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch()
    const getProduct = useSelector(state => state.singleProduct)
    const { error, loading, product } = getProduct
    
    useEffect(() => {
        dispatch(singleProduct(id))
    }, [dispatch,id])

    const addToCartHandler = () =>{
        console.log('Add to cart '+ id)
        navigate(`/cart/${id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/' className='btn btn-light py-3'>Go Back</Link>
            {
                loading ? <Loader />
                    : error ? <ErrorDisplay errorMessage={error} />
                        :
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>

                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h3>Price: ${product.price}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Descrription: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>

                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>{product.price}</Col>
                                            </Row>
                                            <hr />
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {
                                            product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control as="select"
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {
                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )

                                        }
                                        <ListGroup.Item>
                                            <Button type='button' onClick={addToCartHandler} className='btn-block' disabled={product.countInStock <= 0} >Add to Cart</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
            }
        </div>

    )
}

export default ProductScreen