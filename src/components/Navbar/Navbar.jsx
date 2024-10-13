import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";
import logo from "../../assets/logo.png";
import carrinho from "../../assets/carrinho.png";
import Cart from "../Cart/Cart";

const Navbar = (props) => {
  const { getTotalItems } = useContext(CartContext);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (getTotalItems() > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [getTotalItems()]);

  function openSidebar() {
    const event = new CustomEvent("openSidebar");
    window.dispatchEvent(event);
  }

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Logotipo" className="logotipo" />
      </Link>

      {props.showMenu ? (
        <div className="menu">
          <Link to="/historico">Historico</Link>

          <button
            onClick={openSidebar}
            className={`btn btn-red btn-sacola ${animate ? "animate" : ""}`}
          >
            <img src={carrinho} alt="sacola" className="icon icon-sacola" />
            Pedido ({getTotalItems()})
          </button>
        </div>
      ) : null}

      <Cart />
    </div>
  );
};

export default Navbar;
