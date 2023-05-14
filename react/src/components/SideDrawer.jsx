import React from "react";
import { Link } from 'react-router-dom'

import './SideDrawer.css'

import { useCartContext } from "../context/contexts/cartContext";

const SideDrawer = ({show, click}) => {
    const SideDrawerClass = ['sidedrawer']

    if (show) {
        SideDrawerClass.push('show')
    }

    const { cart } = useCartContext()

    const { cartItems } = cart

    const getCartCount = () =>{
        return cartItems.reduce((quantity, item) => Number(item.quantity)+quantity , 0)
      }
    
      return ( 
        <div className={SideDrawerClass.join(' ')}>
          <ul className='sidedrawer__links' onClick={click}>
    
            <li>
              <Link to='/cart'>
                <i className='fas fa-shopping-cart'/>
                <span>
                  Cart <span className='sidedrawer__cartbadge'>{getCartCount()}</span>
                </span>
              </Link>
            </li>
    
            <li>
              <Link to='/'>
               Shop
              </Link>
            </li>
            
          </ul>
        </div>
      )
}

export default SideDrawer;
