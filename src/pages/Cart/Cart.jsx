import React from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItems, food_list, removeFromCart, getTotalCartAmount} = React.useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index) => {
          if(cartItems[item._id]>0)
          {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price} vnd</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price*cartItems[item._id]} vnd</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className='cart-bottom'>
        <div className="cart-total">
          <h2>Totals</h2>
          <div>
            <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalCartAmount()} vnd</p>
            </div>
            <hr />
            <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{getTotalCartAmount()===0?0:20000} vnd</p>
            </div>
            <hr />
            <div className="cart-total-details">
                <p>Total</p>
                <p>{getTotalCartAmount()===0?0:getTotalCartAmount()+20000} vnd</p>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>MUA</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Thêm mã khuyến mại</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Nhập mã khuyến mại'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
