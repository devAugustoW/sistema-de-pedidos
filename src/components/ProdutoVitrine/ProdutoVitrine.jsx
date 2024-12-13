import "./ProdutoVitrine.css";
import carrinho_2 from "../../assets/carrinho-2.png";
import { CartContext } from "../../contexts/CartContext.jsx";
import { useContext } from "react";

const ProdutoVitrine = (props) => {
  const {addItemCart} = useContext(CartContext);

  function addItem() {
    const item = {
      id: props.id,
      nome: props.nome,
      foto: props.foto,
      preco: props.preco,
      qtd: 1
    }

    addItemCart(item);
  }

  return (
    <div className="produto-box text-center">
      <img className="img" src={props.foto} alt={props.nome} />
      <div>
        <h2 className="prod-vitrine-titulo">{props.nome}</h2>
        <p className="prod-vitrine-descricao">{props.descricao}</p>
        <p className="prod-vitrine-preco">
          {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: "BRL"}).format(props.preco)}
        </p>
      </div>

      <div>
        <button onClick={addItem} className="btn-cart2">
          <img src={carrinho_2} className="icon2" alt="Sacola para adcionar produto" />
          <span className="btn-add">Adicionar</span>
        </button>
      </div>
    </div>
  )
}

export default ProdutoVitrine;