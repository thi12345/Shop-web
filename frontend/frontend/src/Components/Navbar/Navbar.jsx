import React, { useState } from "react";
import './Navbar.css';
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from "react-router-dom";

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                    <p>SHOPPER</p>
                
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("shop") }}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<h/>:<></>}</li>
                <li onClick={() => { setMenu("men") }}><Link style={{ textDecoration: 'none' }} to='/men'>Men</Link>{menu === "men" ? <h /> : <></>}</li>
                <li onClick={() => { setMenu("women") }}><Link style={{ textDecoration: 'none' }} to='/women'>Women</Link>{menu === "women" ? <h /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu === "kids" ? <h /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                <button><Link style={{ textDecoration: 'none' }} to='/login'>Login</Link></button>
                <img src={cart_icon} alt="" />
                <div className="nav-cart-count">0</div>
            </div>
          
        </div>
    )
}
export default Navbar