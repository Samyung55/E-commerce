import React, {useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import './Product.css'

import * as actionTypes from '../context/utils/product'
import * as cartActionTypes from '../context/utils/cart'
import { getProductDetails } from '../context/actions/productActions'
import { useProductContext } from '../context/contexts/productContext'
import { useCartContext } from '../context/contexts/cartContext'

const ProductScreen = () => {
    const [quantity, setQuantity] = useState(1)

    const { id } = useParams()

    const navigate = useNavigate()

    const { productState, dispatch } = useProductContext()

    const { dispatch: cartDispatch } = useCartContext()

    const { product, isLoading, error } = productState

    const { countInStock, description, imageUrl, name, price } = product

    const fetchProducts = async () => {
        try{
            dispatch({ type: actionTypes.GET_PRODUCT_REQUEST })

            const result = await getProductDetails(id)

            dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload:result})
        }
        catch (error) {
            console.error(error)

            dispatch({ type: actionTypes.GET_PRODUCT_FAIL})
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const addToCartHandler = async () => {
        try {
            const result = await getProductDetails(id)

            
        }
    }
}