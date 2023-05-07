import { Link } from 'react-router-dom'

import './Navbar.css'
import { useCartContext } from '../context/contexts/cartContext'

const Navbar = ({ click }) => {
    const { cart } = useCartContext()

    const { cartItems } = cart

    const getCartCount = () => {
        return cartItems.reduce(( quantity, item ) => Number(item.quantity) + quantity, 0)
    }

    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <h2>Shopping Cart</h2>
            </div>

            {
                user &&
                <ul className="navbar__links">
                    <li>
                        <Link to='/cart' className='cart__link'>
                            <i className="fas fa-shopping-cart"></i>
                            <span>
                                Cart <span className='cartlogo__badge'>{getCartCount()}</span>
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link to='/'>Shop</Link>
                    </li>
                </ul>
            }

            <div className="hamburger__menu" onClick={click}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav>
    )
}

export default Navbar;