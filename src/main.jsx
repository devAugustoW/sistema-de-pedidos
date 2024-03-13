import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import Rotas from './rotas.jsx'

import { CartProvider } from "./contexts/CartContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <CartProvider>
      <Rotas />
    </CartProvider>

  </React.StrictMode>,
)
