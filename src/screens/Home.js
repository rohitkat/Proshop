import React from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProduct } from '../actions/productActions'
import Loader from '../components/Loader'
import ErrorDisplay from '../components/ErrorDisplay'

function Home() {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading,  products} = productList
    console.log('Products List - ',productList)
    useEffect(() => {
        dispatch(listProduct())
    },[dispatch])

    return (
    <div>
        <h1>Latest Products</h1>
        {
            loading ? <Loader />
                    : error ? <ErrorDisplay errorMessage={error} />
                        : 
                        <Row>
                        {
                            products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                                    <Product product={product} />
                                </Col>
                            ))
                        }
                    </Row>
        }
        
    </div>
  )
}

export default Home
