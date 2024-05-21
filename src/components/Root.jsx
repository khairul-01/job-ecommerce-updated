import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";


const Root = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
         <Navbar></Navbar>
         <Outlet></Outlet>
         <Footer></Footer>
      </div>
    );
};

export default Root;