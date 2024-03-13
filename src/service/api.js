import axios from "axios";

const URL_SERVER = "https://sitema-de-pedidos-backend.onrender.com/";

const api = axios.create({
   baseURL: URL_SERVER
});

export default api;