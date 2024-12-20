import { CART_ADD_ITEM,CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducers = (state={cartItems:[]},action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            const exists = state.cartItems ? state.cartItems.find(x => x.product === item.product) : false

            if(exists){
                return {
                    ...state,
                    cartItems:  state.cartItems.map(x => (
                        x.product === item.product ? item : x
                    ))
                }
            }else{
                return {
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            }
        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter(x => x.product != action.payload)
            }

        default:
            return state
    }
}