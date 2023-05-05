import * as actionType from '../constants/cartConstants'

const cartReducer = (state, action) => {
    switch (action.type) {
        case actionType.ADD_TO_CART:
            const item = action.payload

            const existItem = state.cartItems.find((i) => i.id === item.id)
            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) => i.id === item.id)
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case actionType.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.id !== action.payload)
            }

        default:
            return state;
    }
}

export default cartReducer;