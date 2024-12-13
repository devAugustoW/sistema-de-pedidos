import "./ProdutoCart.css";
import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";


const ProdutoCart = (props) => {
	const {addItemCart, removeItemCart} = useContext(CartContext);

	function addItem() {
		const item = {
			id: props.id,
			nome: props.nome,
			preco: props.preco,
			foto: props.foto,
			qtd: 1
		}
		addItemCart(item)
	}

	function removeItem() {
		removeItemCart(props.id);
	}

	return (
		<div className="produto-cart-box">
			<div className="produto-cart-img">
				<img src={props.foto} className="produto-cart-img" alt="{props.nome}" />
			</div>

			<div className="produto-cart-container">
				<p className="produto-cart-nome">{props.nome}</p>
				<p className="produto-cart-valor">
					{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: "BRL"}).format(props.preco)}
				</p>

				<div className="footer-produto-cart">
					<div className="footer-produto-card-controls">
						<button onClick={removeItem} className="footer-produto-btn">-</button>
						<span className="footer-produto-qtd">{props.qtd}</span>
						<button onClick={addItem} className="footer-produto-btn">+</button>
					</div>

					<p className="footer-produto-preco text-right">
						{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(props.preco * props.qtd)}
					</p>
				</div>
			</div>        
		</div>
	)
}

export default ProdutoCart;