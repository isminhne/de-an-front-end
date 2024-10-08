import { Outlet } from "react-router-dom";
import Navbar from "../../componentss/Navbar/Navbar";
import Footer from "../../componentss/Footer/Footer";

export default function Layout() {
    return (
        
        <div className='app'> 
            {/* <Navbar setShowLogin={setShowLogin}/> */}
            <Outlet/>
            {/* <Footer/> */}
        </div>
    )
}