import React, {useEffect} from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import ProductService from "../../services/product.service.js";
import pushToast from "../../helpers/sonnerToast.js";

const Cart = () => {

  const {cartItems, removeFromCart, isLoggedIn, setLoginModal} = React.useContext(StoreContext);
  const [cart, setCart] = React.useState([]);
  const navigate = useNavigate();

  const getTotalCartAmount = () => {
    let total = 0;
    for (const item of cart) {
      total += item.total;
    }
    return total;
  }

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      pushToast("Hãy đăng nhập trước!", "warning");
      setLoginModal(true);
      return;
    }
    navigate('/order');
  }

  const fetchCartInfo = async () => {
    let cart = [];
    for (const [key, value] of Object.entries(cartItems)) {
      if (value > 0) {
        const item = await ProductService.getProduct(key);
        cart.push({
          id: item._id,
          name: item.title,
          price: item.price,
          quantity: value,
          total: item.price * value
        });
      }
    }
    setCart(cart);
  }

  useEffect(() => {
    fetchCartInfo();
  }, [cartItems]);

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
        {cart.map((item,index) => {
          return (
            <div key={index}>
              <div className="cart-items-title cart-items-item">
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.price} vnd</p>
                <p>{item.quantity}</p>
                <p>{item.total} vnd</p>
                <p onClick={()=>removeFromCart(item.id)} className='cross'>x</p>
              </div>
              <hr />
            </div>
          )
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
          <button onClick={()=>handlePlaceOrder()}>MUA</button>
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
