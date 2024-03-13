import "./Cart.css";
import back from "../../assets/back.png";
import { Dock } from "react-dock";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProdutoCart from "../ProdutoCart/ProdutoCart";
import { CartContext } from "../../contexts/CartContext.jsx";

const Cart = () => {
   const [show, setShow] = useState(false);
   const navigate = useNavigate();
   const {cartItems, totalCart} = useContext(CartContext);

   useEffect(() => {
      window.addEventListener('openSidebar', function(){
         setShow(true);            
     });

   }, [])

   const checkout = () => {
      navigate("/checkout");
   }

   return (
      <Dock 
         position="right"
         isVisible={show}
         fluid={false}
         size={360}
         onVisibleChange={ function(visible) {
            setShow(visible);
         }} >

         <div className="text-center">
            <img 
               className="cart-btn-close" 
               src={back} 
               alt="botao de fechar"
               onClick={(e) => setShow(false)} />
            <h1>Meu Pedido</h1>
         </div>

         <div className="lista-produtos">
            {
               cartItems.map((item) => (
                  <ProdutoCart 
                     key={item.id}
                     id={item.id}
                     nome={item.nome}
                     foto={item.foto}
                     preco={item.preco}
                     qtd={item.qtd} />
               ))
            }
         </div>

         <div className="footer-cart">
               <div className="footer-cart-valor">
                  <span>Total</span>
                  <span>
                     <strong>
                        {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalCart)}
                     </strong>
                  </span>
               </div>   

               <div>
                  <button onClick={checkout} className="btn-checkout">Finalizar Pedido</button>
               </div>             
         </div>
      </Dock>
   )
}

export default Cart;