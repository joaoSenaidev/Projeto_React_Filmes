import axios from "axios";

const apiPorta = "5099";

//apilocal ela recebe um endereço da api
const apilocal = `http://localhost:${apiPorta}/api/`;

const api = axios.create({
    baseURL: apilocal
});

export default api;