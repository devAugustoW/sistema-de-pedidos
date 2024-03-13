import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import Checkout from "./pages/Checkout/Checkout";
import Historico from "./pages/Historico/Historico";





const Rotas = () => {

   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/historico" element={<Historico />} />   
         </Routes>
      </BrowserRouter>
   )
}

export default Rotas;