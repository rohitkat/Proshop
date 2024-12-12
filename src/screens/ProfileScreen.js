import React,{useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import ErrorDisplay from '../components/ErrorDisplay'
import FormComponent from '../components/FormComponent'
import { userProfile } from '../actions/userActions'

function ProfileScreen() {
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const loginDetails = useSelector(state => state.userLogin)
    const {userInfo} = loginDetails

    useEffect(() =>{
        if(userInfo){
            dispatch(userProfile(userInfo.id))
        }else{
            console.log('user Details ',userDetails)
        }
        
    },[dispatch])

  return (
    <div>ProfileScreen</div>
  )
}

export default ProfileScreen