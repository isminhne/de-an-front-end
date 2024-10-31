import {assets} from "../../assets/assets.js";
import React, {useContext} from "react";
import cookies from "../../utils/cookies.js";
import {StoreContext} from "../../context/StoreContext.jsx";

const AccountMenu = () => {
  const email = cookies.get("email");
  const {accountMenu, setAccountMenu, setIsLoggedIn} = useContext(StoreContext);

  const handleLogout = () => {
    cookies.remove("token", {path: "/"});
    cookies.remove("email", {path: "/"});
    setIsLoggedIn(false);
    setAccountMenu(false);
  }

  return (
    <>
      {accountMenu && <div className='login-popup'>
        <div className="login-popup-container" style={{minWidth: "400px"}}>
          <div className="login-popup-title">
            <h2>{email}</h2>
            <img src={assets.cross_icon} onClick={() => setAccountMenu(false)} alt=""/>
          </div>
          <div className="login-popup-inputs">
            <button
              style={{
                backgroundColor: "gray",
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>}
    </>
  )
}

export default AccountMenu
