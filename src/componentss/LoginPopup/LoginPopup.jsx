import React, {useContext} from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import AuthService from "../../services/auth.service.js";
import pushToast from "../../helpers/sonnerToast.js";
import {useForm} from "react-hook-form";
import {isEmpty} from "lodash/lang.js";
import {StoreContext} from "../../context/StoreContext.jsx";

const LoginPopup = () => {
    
    const [currState, setCurrState] = React.useState("login");
    const {setIsLoggedIn, loginModal, setLoginModal} = useContext(StoreContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: undefined,
        criteriaMode: "firstError",
    });

    const onSubmit = async (data) => {
        const res = await texts[currState].service(data);
        if (!isEmpty(res)) {
            setIsLoggedIn(true);
            setLoginModal(false);
        }
    };

    const onError = (errors, e) => {
        Object.values(errors).forEach((error) => {
            pushToast(error.message, "error");
        });
    }
  
    return (
      <>
          {loginModal && <div className='login-popup'>
              <form className="login-popup-container" onSubmit={handleSubmit(onSubmit, onError)} noValidate={true}>
                  <div className="login-popup-title">
                      <h2>{texts[currState].title}</h2>
                      <img onClick={() => setLoginModal(false)} src={assets.cross_icon} alt=""/>
                  </div>
                  <div className="login-popup-inputs">
                      {currState === "login" ? <></> : <input
                        type="text"
                        placeholder="Name"
                        required
                        {...register("username", {required: "Name is required"})}
                      />}
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        {...register("email", {required: "Email is required"})}
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        {...register("password", {required: "Password is required"})}
                      />
                      {currState === "signup" ? <input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        {...register("confirmPassword", {
                            required: "Password is required",
                            validate: value => value === watch("password") || "The passwords do not match"
                        })}
                      /> : <></>}
                  </div>
                  <button>{texts[currState].title}</button>
                  {currState === "login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("signup")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("login")}>Login here</span></p>
                  }
              </form>
          </div>}
      </>
    )
}

const texts = {
    login: {
        title: "Login",
        service: AuthService.login
    },
    signup: {
        title: "Sign up",
        service: AuthService.register
    }
}

export default LoginPopup
