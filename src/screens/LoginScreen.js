import React,{useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import ErrorDisplay from '../components/ErrorDisplay'
import FormComponent from '../components/FormComponent'
import { userLogin } from '../actions/userActions'

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginDetails = useSelector(state => state.userLogin)
    const {error, userInfo,loading } = loginDetails

    useEffect(() => {
        if(userInfo != null){
            //navigate(-1)
        }
    },[userInfo])

    const submitHandler = (e)=>{
        e.preventDefault()
        if(email !== '' && password !== ''){
            dispatch(userLogin(email, password))
        }
        
    }
  return (
    
      
    <FormComponent>
        <h1>Sign In</h1>
        {loading && <Loader />}
        {error && <ErrorDisplay variant='danger' errorMessage={error} /> }

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Sign In
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                New Customer ? <Link to='/register'>Register</Link>
            </Col>
        </Row>
    </FormComponent>
  )
}

export default LoginScreen