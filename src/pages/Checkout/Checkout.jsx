import "./Checkout.css";
import { CartContext } from "../../contexts/CartContext";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../../service/api.js";
import Navbar from "../../components/Navbar/Navbar";

const Checkout = () => {
  const { totalCart, cartItems, setCartItems, setTotalCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    fone: "",
    cep: "",
    endereco: "",
    bairro: "",
    cidade: "",
    uf: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

	const validarFormulario = () => {
		const { nome, email, fone, cep, endereco, bairro, cidade, uf } = formData;
		if (!nome || !email || !fone || !cep || !endereco || !bairro || !cidade || !uf) {
			alert("Por favor, preencha todos os campos obrigatórios.");
			return false;
		}
		return true;
	};

  const finalizarPedido = () => {
    if (!validarFormulario()) return;

    const produtos = cartItems.map(({ id, qtd, preco }) => ({
      id_produto: id,
      qtd,
      vl_unitario: preco,
      vl_total: preco * qtd
    }));

    const params = {
      id_usuario: 1,
      ...formData,
      total: totalCart,
      itens: produtos
    };

    api.post("/pedidos", params)
      .then(() => {
        setCartItems([]);
        setTotalCart(0);
        navigate('/historico');
      })
      .catch(() => alert("Erro ao enviar pedido."));
  };

  return (
    <div className="checkout-container">
      <Navbar />

      <div className="container text-center">
        <h1 className="titulo">Finalizar Pedido</h1>
      </div>

      <div className="col-3">
        <div className="box-checkout">
          <h3>Dados Pessoais</h3>
          {["nome", "email", "fone"].map((field) => (
            <div className="input-group" key={field}>
              <p>{field.charAt(0).toUpperCase() + field.slice(1)}</p>
              <input
                type={field === "email" ? "email" : "text"}
                id={field}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>
      </div>

      <div className="col-3">
        <div className="box-checkout">
          <h3>Endereço de Entrega</h3>

          {["cep", "endereco", "bairro", "cidade"].map((field) => (
            <div className="input-group" key={field}>
              <p>{field.charAt(0).toUpperCase() + field.slice(1)}</p>
              <input
                type="text"
                id={field}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="input-group numero-complemento">
            <div>
              <p>Número</p>
              <input type="number" id="numero" required />
            </div>

            <div>
              <p>Complemento</p>
              <input type="text" id="complemento" />
            </div>
          </div>

          <div className="input-group">
            <p>UF</p>

						<select id="uf" onChange={handleChange} required>
							<option value="">Selecione</option>
							<option value="AC">Acre</option>
							<option value="AL">Alagoas</option>
							<option value="AP">Amapá</option>
							<option value="AM">Amazonas</option>
							<option value="BA">Bahia</option>
							<option value="CE">Ceará</option>
							<option value="DF">Distrito Federal</option>
							<option value="ES">Espírito Santo</option>
							<option value="GO">Goiás</option>
							<option value="MA">Maranhão</option>
							<option value="MT">Mato Grosso</option>
							<option value="MS">Mato Grosso do Sul</option>
							<option value="MG">Minas Gerais</option>
							<option value="PA">Pará</option>
							<option value="PB">Paraíba</option>
							<option value="PR">Paraná</option>
							<option value="PE">Pernambuco</option>
							<option value="PI">Piauí</option>
							<option value="RJ">Rio de Janeiro</option>
							<option value="RN">Rio Grande do Norte</option>
							<option value="RS">Rio Grande do Sul</option>
							<option value="RO">Rondônia</option>
							<option value="RR">Roraima</option>
							<option value="SC">Santa Catarina</option>
							<option value="SP">São Paulo</option>
							<option value="SE">Sergipe</option>
							<option value="TO">Tocantins</option>
						</select>
          </div>
        </div>
      </div>

      <div className="col-3">
        <div className="box-checkout">
          <h3>Valores</h3>

          <div className="checkout-valores">
            <span>Total</span>

            <span>
              <strong>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalCart)}
              </strong>
            </span>
          </div>

          <div className="checkout_button">
            <button onClick={finalizarPedido} className="btn-checkout btn-checkout2">
              Finalizar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;