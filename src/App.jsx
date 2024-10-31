import React, {useState} from 'react'
import Navbar from './componentss/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Layout from './pages/Layout'
import Footer from './componentss/Footer/Footer'
import LoginPopup from './componentss/LoginPopup/LoginPopup'
import {Toaster} from "sonner";
import AccountMenu from "./componentss/Navbar/AccountMenu.jsx";

const App = () => {

  return (
    <>
      <Toaster
        richColors={true}
        position={"top-right"}
        expand={true}
        closeButton={true}
      />
      <LoginPopup/>
      <AccountMenu/>

      <Navbar/>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<PlaceOrder/>} />
        </Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
