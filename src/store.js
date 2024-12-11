import { createStore, combineReducers, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import {productListReducers, productReducers} from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'
import { userLoginReducers } from './reducers/userReducers'        

const reducer = combineReducers({
    productList : productListReducers,
    singleProduct : productReducers,
    cart : cartReducers,
    userLogin : userLoginReducers
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
                                JSON.parse(localStorage.getItem('cartItems')) 
                                : []
const userInfoFromStorage = localStorage.getItem('userInfo') ?
                                JSON.parse(localStorage.getItem('userInfo'))
                                :null

                                const middleware = [thunk]
const initialState ={
    cart:{cartItems : cartItemsFromStorage},
    userLogin :{userInfo : userInfoFromStorage},
}


const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store