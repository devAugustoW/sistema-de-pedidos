import { useState, useEffect } from "react";
import "./Historico.css";
import Navbar from "../../components/Navbar/Navbar";
//import { pedidos } from "../../dados.js";
import api from "../../service/api.js";

const Historico = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    api
      .get("/pedidos")
      .then((resp) => {
        console.log(resp.data);
        setPedidos(resp.data);
      })
      .catch();
  }, []);

  return (
    <>
      <Navbar showMenu={true} />

      <div className="historico-container">
        <div className="titulo text-center">
          <h1>Histórico de Pedidos</h1>
        </div>

        <div className="box-pedido">
          <table className="table">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Data</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((ped) => {
                const [day, month, year] = ped.dt_pedido.split("/");
                const formattedDate = new Date(
                  `${year}-${month}-${day}`
                ).toLocaleDateString("pt-BR");

                return (
                  <tr key={ped.id_pedido}>
                    <td>
                      <strong>Pedido {ped.id_pedido}</strong>
                    </td>
                    <td className="text-light">{formattedDate}</td>
                    <td className="text-red">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(ped.total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Historico;
