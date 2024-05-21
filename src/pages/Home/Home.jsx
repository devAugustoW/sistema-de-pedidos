import { useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import ProdutoVitrine from "../../components/ProdutoVitrine/ProdutoVitrine.jsx";

//import {produtos} from "../../dados.js";
import api from "../../service/api.js";

const Home = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api.get("/produtos")
      .then((resp) => setProdutos(resp.data))
      .catch((err) => alert("Erro ao carregar produtos."));
  }, [])

  return (
    <div>
      <Navbar showMenu={true}/>

      <div className="container">
         <div className="titulo text-center">
               <h1>Nosso Cardápio</h1>
               <p className="subtitulo">Clique em adicionar para colocar os produtos na sacola de compras. Se preferir, você pode pedir pelo WhatsApp: (81) 90000-0000</p>
         </div>
      </div>

      <div className="home__produto-vitrine text-center">
        {
          produtos.map((produto) => (
            <ProdutoVitrine key={produto.id_produto}
              id={produto.id_produto}
              nome={produto.nome}
              descricao={produto.descricao}
              preco={produto.preco}
              foto={produto.foto} />
          ))
        }
      </div> 
    </div>
  )
}

export default Home;