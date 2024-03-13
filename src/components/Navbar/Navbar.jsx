import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"
import bag from "../../assets/bag.png";
import Cart from "../Cart/Cart";


const Navbar = (props) => {

   function openSidebar(){
      const event = new CustomEvent('openSidebar');
      window.dispatchEvent(event);
 }

   return (
      <div className="navbar">
         <Link to="/">
            <img src={logo} alt="Logotipo" className="logotipo"/>
         </Link>

         {
            props.showMenu ? 
               <div className="menu">
                  <Link to="/historico">Historico</Link>

                  <button onClick={openSidebar} className="btn btn-red btn-sacola">
                     <img src={bag} alt="sacola" className="icon icon-sacola" />
                     Sacola
                  </button>
               </div>
            : null
         }
      
         <Cart />
      
      </div>
   )
}

export default Navbar;