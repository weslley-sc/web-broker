import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8083/",
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${acessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

for (var key in response.data) {
  this.stock.push({
    id: response.data[key].id,
    simbol: response.data[key].stock_symbol,
    name: response.data[key].stock_name,
    askmin:
      response.data[key].ask_min == null
        ? 0
        : response.data[key].ask_min.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          }),
    askmax:
      response.data[key].ask_max == null
        ? 0
        : response.data[key].ask_max.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          }),
    bidmin:
      response.data[key].bid_min == null
        ? 0
        : response.data[key].bid_min.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          }),
    bidmax:
      response.data[key].bid_max == null
        ? 0
        : response.data[key].bid_max.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          }),
  });
}
export default api;
