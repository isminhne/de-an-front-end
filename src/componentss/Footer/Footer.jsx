import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

export default function Footer() {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis sapiente explicabo accusamus reiciendis quibusdam voluptates culpa sequi iure dolor voluptatum error, commodi pariatur officiis expedita voluptas nobis unde quam quis?</p>

        </div>
        <div className="footer-content-center">
            <h2>SHOP</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>0123456789</li>
                <li>contact@heal-food.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 Heal-food.com - All Right Reserved.</p>
    </div>
  )
}

// export default Footer
