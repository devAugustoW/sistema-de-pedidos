import { createContext, useState } from "react";

const CartContext = createContext();

function CartProvider(props) {
    const [cartItems, setCartItems] = useState([]);
    const [totalCart, setTotalCart] = useState(0);

    function addItemCart(item) {
        let cartItemsNovo = [];
        let findItem = false;

        // Verificar se o item já existe no carrinho...
        for (var prod of cartItems) {
            if (prod.id === item.id) {
                item.qtd = prod.qtd + 1;
                findItem = true;
                cartItemsNovo.push(item);
            } else {
                cartItemsNovo.push(prod);
            }
        }

        if (!findItem || cartItems.length === 0) {
            cartItemsNovo.push(item);
        }

        setCartItems(cartItemsNovo);
        CalcTotal(cartItemsNovo);
    }

    function removeItemCart(id) {
        let cartItemsNovo = [];

        for (var prod of cartItems) {
            if (prod.id === id) {
                prod.qtd = prod.qtd - 1;
            }
            cartItemsNovo.push(prod);
        }

        cartItemsNovo = cartItemsNovo.filter(item => item.qtd > 0);
        setCartItems(cartItemsNovo);
        CalcTotal(cartItemsNovo);
    }

    function CalcTotal(items) {
        let tot = 0;
        for (var item of items) {
            tot += item.preco * item.qtd;
        }
        setTotalCart(tot);
    }

    function getTotalItems() {
        return cartItems.reduce((total, item) => total + item.qtd, 0);
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            setCartItems,
            addItemCart,
            removeItemCart,
            totalCart,
            setTotalCart,
            getTotalItems
        }}>
            {props.children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider };