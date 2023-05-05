import React, {createContext, useContext, useReducer} from 'react'

import productReducer from '../reducers/productRedux'

const ProductContext = createContext(null)

let initialState = {
    products: [],
}

export const ProductProvider = ({ children }) => {
    const [productState, dispatch] = useReducer(productReducer, initialState)

    const contextValue = {
        productState,
        dispatch
    }

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    )
};

export const useProductContext = () => {
    const context = useContext(ProductContext)

    if(!context) {
        throw new Error("useProductContext Error")
    }

    return context
};