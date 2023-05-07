import React from "react";
import { Link } from 'react-router-dom'

import './SideDrawer'

import { useCartContext } from "../context/contexts/cartContext";

const SideDrawer = ({show, click}) => {
    const SideDrawerClass = ['sidedrawer']

    if (show) {
        SideDrawerClass.push('show')
    }

    const { cart } = useCartContext()

    const { cartItems } = cart

    
}