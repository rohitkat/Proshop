import React,{useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import ErrorDisplay from '../components/ErrorDisplay'
import FormComponent from '../components/FormComponent'
import { Register, userLogin } from '../actions/userActions'

function RegisterScreen() {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const registerDetails = useSelector(state => state.userRegister)
  const loginDetails = useSelector(state => state.userLogin)
  console.log(loginDetails)
  const {error, userInfo,loading } = registerDetails
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
   });

   const [validationRrrors, setValidationErrors] = useState({})

   const HandleChange = (e) => {
    const {id, value} = e.target
    setFormData({
        ...formData,
        [id]:value,
    })
   }


  useEffect(() => {
      if(userInfo != null){
        if(loginDetails !== null && loginDetails.userInfo !== null){
            navigate('/profile')
        }else{
            console.log('Need to autologin the user and send to Profile page')
            dispatch(userLogin(formData.email, formData.password))
        }
          //navigate('/profile')
      }
  },[userInfo, loginDetails])

  const submitHandler = (e)=>{
      e.preventDefault()
      const errors = validateForm(formData)
      setValidationErrors(errors)
      if(Object.keys(errors).length === 0){
        console.log('User Registeration Submitted.')

        dispatch(Register(formData.name, formData.email, formData.password))
      }else{
        console.log('User Registeration not Submitted due to errors.')
      }

    //   if(name !=='' && email !== '' && password !== ''){
    //       dispatch(Register(name, email, password))
    //   }
  }

  const validateForm = (data) => {
    const errors = {}

    if(!data.name.trim()){
        errors.name = 'Name is  required.'
    }else if(data.name.length <4){
        errors.name = 'Name should be  atleast 4  characters long.'
    }

    if(!data.email.trim()){
        errors.email = 'Email is required.'
    }else if(!/\S+@\S+\.\S+/.test(data.email)){
        errors.email = 'Email is invalid.'
    }

    if (!data.password) {
        errors.password = 'Password is required.';
    } else if (data.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long.';
    }

    if (data.confirmPassword !== data.password) {
        errors.confirmPassword = 'Passwords do not match.';
    }

    return errors;
  }


return (
    
  <FormComponent>
      <h1>Register</h1>
      {loading && <Loader />}
      {error && <ErrorDisplay variant='danger' errorMessage={error} /> }

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                  type='name'
                  placeholder='Enter Name'
                  value={formData.name}
                  onChange={HandleChange}
              >
              
              </Form.Control>
              {validationRrrors.name && (
                        <span className="error-message">
                            {validationRrrors.name}
                        </span>
                    )}
          </Form.Group>

          <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                  type='email'
                  placeholder='Enter Email'
                  value={formData.email}
                  onChange={HandleChange}
              >
              </Form.Control>
              {validationRrrors.email && (
                        <span className="error-message">
                            {validationRrrors.email}
                        </span>
                    )}
          </Form.Group>

          <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                  type='password'
                  placeholder='Enter Password'
                  value={formData.password}
                  onChange={HandleChange}
              >
              </Form.Control>
              {validationRrrors.password && (
                        <span className="error-message">
                            {validationRrrors.password}
                        </span>
                    )}
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                  type='password'
                  placeholder='Enter Confirm Password'
                  value={formData.confirmPassword}
                  onChange={HandleChange}
              >
              </Form.Control>
              {validationRrrors.confirmPassword && (
                        <span className="error-message">
                            {validationRrrors.confirmPassword}
                        </span>
                    )}
          </Form.Group>

          <Button type='submit' variant='primary'>
              Sign Up
          </Button>
      </Form>

      <Row className='py-3'>
          <Col>
              Already have an account ? <Link to='/login'>Login</Link>
          </Col>
      </Row>
  </FormComponent>
)
}

export default RegisterScreen