<template>
  <div class="bg-indigo-200 py-40 md:w-auto">
    <!-- card vem aqui -->
    <div
      class="bg-gray-100 rounded-lg shadow-2x1 w-1/2 justify-center ml-auto mr-auto mt-auto"
    >
      <!-- header -->
      <header
        class="bg-indigo-600 rounded-t-lg py-3 px-8 text-xl font-extrabold text-gray-100"
      >
        Trade Order
      </header>
      <div class="p-6">
        <div class="mt-20 sm:mt-0">
          <div class="mt-5 md:mt-0 md:col-span-3">
            <div class="bg-gray-50 px-4 py-5 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                { this.usuario }
                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700"
                    >Stock Name:
                  </label>
                  <select
                    id="country"
                    name="country"
                    autocomplete="name"
                    class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    v-model="name"
                  >
                    <option selected>---- Select a stock ----</option>
                    <option
                      v-for="stock in stocksName"
                      :key="stock"
                      @click="setup(stock)"
                    >
                      {{ stock.stockName }}
                    </option>
                  </select>
                </div>

                <div class="col-span-6">
                  <label
                    for="country"
                    class="block text-sm font-medium text-gray-700"
                    >Type of transaction
                  </label>
                  <select
                    id="country"
                    name="country"
                    autocomplete="country-name"
                    class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    v-model="type"
                  >
                    <option>---- Select a type ----</option>
                    <option value="1">Compra</option>
                    <option value="2">Venda</option>
                  </select>
                </div>

                <div class="col-span-6">
                  <label
                    for="last-name"
                    class="block text-sm font-medium text-gray-700"
                    >Order Price:
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autocomplete="family-name"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-lg border border-gray-500 rounded-md"
                    v-model="price"
                    @mouseleave="valorTotal"
                  />
                </div>

                <div class="col-span-6">
                  <label
                    for="email-address"
                    class="block text-sm font-medium text-gray-700"
                    >Volume: {{ this.volume }}
                  </label>
                  <input
                    type="text"
                    name="email-address"
                    id="email-address"
                    autocomplete="email"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-lg border border-gray-500 rounded-md"
                    v-model="volume"
                    @mouseleave="valueTrade"
                  />
                </div>

                <div class="col-span-6">
                  <label
                    for="street-address"
                    class="block text-sm font-medium text-gray-700"
                    >Total:{{ this.valueTrade }}
                  </label>
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autocomplete="street-address"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-lg border border-gray-500 rounded-md"
                    v-model="total"
                  />
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="criarOrdem()"
              >
                CREATE
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="sucesso"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            role="button"
            @click="sucesso = false"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </span>
        <strong class="font-bold">Ordem cadastrada com sucesso!</strong>
      </div>

      <div
        v-if="erro"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold"
          >Ordem não cadastrada! Verifique os campos e se possui saldo
          suficiente</strong
        >
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            class="fill-current h-6 w-6 text-red-500"
            role="button"
            @click="erro = false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { VMoney } from "v-money";
export default {
  data: function () {
    return {
      stocksName: [],
      sucesso: false,
      erro: false,
      name: "",
      stockSymbol: "",
      stockName: "",
      idStock: 0,
      name1: "",
      price: "",
      sell: "",
      volume: "",
      volume2: "",
      acaoCompra: null,
      total: "",
      type: [],
      teste: {},
      id: 0,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false /* doesn't work with directive */,
      },
    };
  },
  created() {
    this.setup();
  },

  before() {
    this.valorTotal();
    this.criarOrdem();
  },

  methods: {
    async setup(stock) {
      if (this.$root.authenticated) {
        this.claims = await this.$auth.getUser();
        let accessToken = this.$auth.getAccessToken();
        console.log(`Authorization: Bearer ${accessToken}`);
        try {
          let response = await axios.get(`http://localhost:8084/stock`, {
            headers: { Authorization: "Bearer " + accessToken },
          });

          console.log(response);

          for (var chave in response.data) {
            this.stocksName.push({
              id: response.data[chave].id,
              stockSymbol: response.data[chave].stockSymbol,
              stockName: response.data[chave].stockName,
              askMin:
                response.data[chave].ask_min == null
                  ? 0
                  : response.data[chave].ask_min.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    }),
              askMax:
                response.data[chave].ask_min == null
                  ? 0
                  : response.data[chave].ask_min.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    }),
            });
          }
        } catch (error) {
          console.log("Erro na Stock pae");
        }
        this.acaoCompra = stock;
        this.idStock = this.acaoCompra.id;
        this.stockName = this.acaoCompra.stockName;
        this.stockSymbol = this.acaoCompra.stockSymbol;
      }
    },
    async criarOrdem() {
      if (this.$root.authenticated) {
        let accessToken = this.$auth.getAccessToken();
        this.claims = await this.$auth.getUser();

        try {
          let response = await axios.get(
            `http://localhost:8083/user/${this.claims.email}`,
            {
              headers: { Authorization: "Bearer " + accessToken },
            }
          );

          this.usuario = response.data.id;
          console.log("Aqui é id do usuario: " + this.usuario);
        } catch (error) {
          this.erro = `${error}`;
        }
        try {
          await axios
            .post(
              `http://localhost:8083/order/compra`,
              {
                idUser: {
                  id: this.usuario,
                },
                idStock: this.idStock,
                stockSymbol: this.stockSymbol,
                stockName: this.stockName,
                volume: this.volume,
                volumeRemaining: 0,
                price: this.price,
                type: this.type,
                status: 1,
              },
              {
                headers: { Authorization: "Bearer " + accessToken },
              }
            )
            .then(() => {
              window.alert("Cadastrado com sucesso");
              console.log("criou");
              this.sucesso = true;
              this.name = "---- Selecione uma stock ----";
              this.price = "";
              this.volume = "";
              this.type = "---- Selecione o tipo ----";
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getMoeda() {
      console.log("to aquiiiiiiiiii");
      if (this.$root.authenticated) {
        this.claims = await this.$auth.getUser();
        let accessToken = this.$auth.getAccessToken();
        try {
          let response = await axios.get(`http://localhost:8083/balances`, {
            headers: { Authorization: "Bearer " + accessToken },
          });
          console.log(response.data);
          let balance = response.data;

          for (let key in balance) {
            if (balance[key].idUser.username === this.claims.email) {
              console.log("É igual abestadooo");
              this.teste.push = {
                username: balance[key].idUser.username,
                id: balance[key].idUser.id,
                idStock: balance[key].idStock,
                stockName: balance[key].stockName,
                stockSymbol: balance[key].stockSymbol,
              };
            }
          }

          console.log(this.teste.id);
        } catch (error) {
          this.walletUser = `${error}`;
        }
      }
    },
    async valorTotal() {
      let valueTrade = this.volume * this.price;
      this.total = valueTrade;
      return this.total;
    },
  },
  directives: { money: VMoney },
};
</script>
