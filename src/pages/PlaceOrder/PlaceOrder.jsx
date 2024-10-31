import './PlaceOrder.css'
import React, {useEffect} from "react";
import {StoreContext} from "../../context/StoreContext.jsx";
import ProductService from "../../services/product.service.js";
import {useForm} from "react-hook-form";
import pushToast from "../../helpers/sonnerToast.js";
import OrderService from "../../services/order.service.js";

const PlaceOrder = () => {

  const {cartItems} = React.useContext(StoreContext);
  const [cart, setCart] = React.useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: undefined,
    criteriaMode: "firstError",
  });

  const getTotalCartAmount = () => {
    let total = 0;
    for (const item of cart) {
      total += item.total;
    }
    return total;
  }

  const onSubmit = async (data) => {
    const body = {
      deliveryInfo: data,
      products: Object.entries(cartItems).map(item => ({
        product: item[0],
        quantity: item[1]
      })),
      total: getTotalCartAmount()===0?0:getTotalCartAmount()+20000
    };

    const res = await OrderService.placeOrder(body);
    if (res) {
      pushToast("Order successfully", "success");
    }
  };

  const onError = (errors, e) => {
    Object.values(errors).forEach((error) => {
      pushToast(error.message, "error");
    });
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
  }, []);

  return (
    <form className="place-order" onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder='First Name'
            {...register("firstName", {required: "First Name is required"})}
          />
          <input
            type="text"
            placeholder='Last Name'
            {...register("lastName", {required: "Last Name is required"})}
          />
        </div>
        <input
          type="text"
          placeholder='Email address'
          {...register("email", {required: "Email is required"})}
        />
        <input
          type="text"
          placeholder='Street'
          {...register("street", {required: "street is required"})}
        />
        <div className="multi-fields">
          <input
            type="text"
            placeholder='City'
            {...register("city", {required: "city is required"})}
          />
          <input
            type="text"
            placeholder='State'
            {...register("state", {required: "state is required"})}
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            placeholder='Zip code'
            {...register("zipcode", {required: "zipcode is required"})}
          />
          <input
            type="text"
            placeholder='Country'
            {...register("country", {required: "country is required"})}
          />
        </div>
        <input
          type="text"
          placeholder='Phone'
          {...register("phone", {required: "phone is required"})}
        />
      </div>
      <div className="place-order-right">
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
          <button type={"submit"}>MUA</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
