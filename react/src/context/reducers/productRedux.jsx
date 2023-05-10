import * as actionTypes from '../utils/product'

const productReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCT_REQUEST:
            return {
                products: [],
                product: {},
                isLoading: true,
                error: false
            }

        case actionTypes.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [...state.product, ...action.payload],
                product:{},
                isLoading: false,
                error: false
            }

        case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
            return {
                products: [],
                product: action.payload,
                isLoading: false,
                error: false
            }
        
        case actionTypes.GET_PRODUCT_FAIL:
            return {
                product: [],
                isLoading: false,
                error: true
            }

        default: 
        return state
    }
}

export default productReducer;