import axios from 'axios'
import { CART_ADD_ITEM,
CART_REMOVE_ITEM        
 } from '../constants/cartConstants'

export const addToCart = (id,qty) => async(dispatch, getState) => {
    try{
        const {data} = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product : data._id,
                image : data.image,
                name : data.name,
                price : data.price,
                countInStock: data.countInStock,
                quantity : qty
            }
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    }catch(error){
        console.log(error)
    }
}

export const removeFromCart = (id) => (dispatch, getState) => {
    try{
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: id
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    }catch(error){
        console.log(error)
    }
}