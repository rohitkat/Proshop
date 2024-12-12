import axios from 'axios'
import { 
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,

    USER_LOGOUT,

    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,

    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
 } from '../constants/userConstants'

 export const userLogin = (email, password) => async(dispatch) => {
    try{
        dispatch({type : USER_LOGIN_REQUEST})

        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        const {data} = await axios.post(
            'http://127.0.0.1:8000/api/users/login',
            {
                'username':email,
                'password':password
            },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch(error){
        dispatch({
            type : USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
 }

 export const Logout = () => (dispatch)=>{
    dispatch({
        type: USER_LOGOUT,
        payload: null
    })

    localStorage.removeItem('userInfo')
 }

 export const userProfile = (id) => async(dispatch,getState) => {
    try{
        dispatch({type : USER_DETAILS_REQUEST})
        const userInfo = getState().userLogin.userInfo
        const config = {
            headers:{
                'Content-type':'application/json',
                'Authorization':`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            'http://127.0.0.1:8000/api/users/profile',
            config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type : USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
 }
 
 export const Register = (name, email, password) => async(dispatch) => {
    try{
        dispatch({type : USER_REGISTER_REQUEST})

        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        const {data} = await axios.post(
            'http://127.0.0.1:8000/api/users/register',
            {
                'name':name,
                'username':email,
                'email':email,
                'password':password
            },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch(error){
        dispatch({
            type : USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
 }