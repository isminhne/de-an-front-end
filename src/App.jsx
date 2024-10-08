import React from 'react'
import Navbar from './componentss/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Layout from './pages/Layout'
import Footer from './componentss/Footer/Footer'
import LoginPopup from './componentss/LoginPopup/LoginPopup'

const App = () => {
  
  const [showLogin, setShowLogin] = React.useState(false)
  
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <Navbar setShowLogin={setShowLogin}/>
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
