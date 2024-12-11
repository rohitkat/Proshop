import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL

} from '../constants/productConstants'

export const productListReducers = (state = { products:[] }, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return { loading:true, products:[] }
        case PRODUCT_LIST_SUCCESS:
            return {loading:false, products:action.payload}
        case PRODUCT_LIST_FAIL:
            return{loading:false, error: action.payload}
        
        default :
            return state
    }
}

export const productReducers = (state = {product:[]}, action) => {
    switch(action.type){
        case PRODUCT_REQUEST:
            return { loading:true, product:[] }
        case PRODUCT_SUCCESS:
            return {loading:false, product:action.payload}
        case PRODUCT_FAIL:
            return{loading:false, error: action.payload}
        
        default :
            return state
    }
}