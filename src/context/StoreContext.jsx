import { createContext, useState } from "react";
import { food_list } from "../assets/assets";
import cookies from "../utils/cookies.js";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(!!cookies.get("token"));
    const [accountMenu, setAccountMenu] = useState(false);
    const [loginModal, setLoginModal] = useState(false);

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => {
                return {
                    ...prev,
                    [itemId]:1
                }
            })
        }
        else {
            setCartItems(prev => {
                return {
                    ...prev,
                    [itemId]:prev[itemId]+1
                }
            })
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems(prev => {
            return {
                ...prev,
                [itemId]:prev[itemId]-1
            }
        })
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        isLoggedIn,
        setIsLoggedIn,
        accountMenu,
        setAccountMenu,
        loginModal,
        setLoginModal
    } 

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;