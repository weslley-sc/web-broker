<!-- component -->
<template>
  <div
    id="Home"
    class="flex container justify-center xl:mx-auto md:container sm:inset-x-10"
  >
    <table
      class="text-center justify-center min-w-full divide-y shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
    >
      <thead class="bg-gray-300 flex w-full">
        <tr class="flex w-full text-center">
          <th
            class="p-4 w-1/4 font-medium text-gray-900 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            class="p-4 w-1/4 text-blue-500 font-medium uppercase tracking-wider"
          >
            Symbol
          </th>
          <th
            class="p-4 w-1/4 text-red-500 font-medium uppercase tracking-wider"
          >
            Min
          </th>
          <th
            class="p-4 w-1/4 text-green-500 font-medium uppercase tracking-wider"
          >
            Max
          </th>
        </tr>
      </thead>
      <!-- Remove the nasty inline CSS fixed height on production and replace it with a CSS class — this is just for demonstration purposes! -->

      <tbody
        class="bg-gray-100 divide-y flex flex-col items-center overflow-y-scroll w-full"
        style="height: 50vh"
      >
        <tr class="flex w-full text-center" v-for="(acao, i) in acoes" :key="i">
          <td class="p-4 w-1/4 whitespace-nowrap">
            <button v-on:click="toggleModal(acao)" v-bind="stockSelecionado">
              <span
                class="bg-gray-100 text-gray-500 text-sm font-medium mr-2 px-2.5 py-0.5 hover:bg-yellow-300 hover:text-black"
                >{{ acao.stockName }}</span
              >
            </button>
          </td>
          <td class="p-4 w-1/4 text-blue-500">
            <span
              class="bg-gray-100 text-gray-500 text-sm font-medium mr-2 px-2.5 py-0.5"
              >{{ acao.stockSymbol }}</span
            >
          </td>
          <td class="p-4 w-1/4 text-red-400">{{ acao.askMin }}</td>
          <td class="p-4 w-1/4 text-green-400">{{ acao.askMax }}</td>
        </tr>
      </tbody>
    </table>

    <!-- modal -->
    <div class="w-1/12">
      <div
        v-if="showModal"
        class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
      >
        <div class="relative w-auto my-6 mx-auto max-w-6xl">
          <!--content-->
          <div
            class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          >
            <!--header-->
            <div
              class="flex items-start justify-center p-1 border-b border-solid border-blueGray-200 rounded-t"
            >
              <h5 class="text-3xl font-semibold">CREATE ORDEM</h5>
            </div>
            <!--body-->
            <form class="w-full max-w-lg p-3">
              <div class="w-full md:min-w-full mb-6 md:mb-0 pb-3">
                <div class="col-span-6">
                  <label
                    class="justify-center block text-sm font-medium text-gray-700"
                    >Ação
                  </label>

                  {{ stockName }}
                </div>
              </div>

              <div class="flex justify-evenly -mx-3 mb-2">
                <div class="w-1/2 md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    Tipo
                  </label>
                  <div class="relative">
                    <select
                      v-model="type"
                      class="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="2">Venda</option>
                      <option value="1">Compra</option>
                    </select>
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                    ></div>
                  </div>
                </div>

                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-city"
                  >
                    Quantidade
                  </label>
                  <input
                    v-model="volume"
                    class="appearance-none block w-10/12 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                  />
                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-zip"
                  >
                    Preço
                  </label>
                  <input
                    v-model="price"
                    class="appearance-none block w-10/12 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                  />
                </div>
              </div>
            </form>
            <!--footer-->
            <div
              class="flex items-center justify-between p-3 border-t border-solid border-blueGray-200 rounded-b"
            >
              <button
                class="py-3 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-gray-300 focus:outline-none"
                @click="comprar()"
              >
                Salvar Ordem
              </button>
              <button
                class="py-3 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-gray-300 focus:outline-none"
                type="button"
                v-on:click="toggleModal1()"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="showModal"
        class="opacity-25 fixed inset-0 z-40 bg-black"
      ></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Testes",
  data: () => ({
    acoes: [],
    comprar: [],
    showModal: false,
    stockName: "",
    stockSymbol: "",
    idStock: null,
    compraAcao: null,
    stockSelecionado: [],
    name: "",
    user: [],
    type: null,
  }),
  created() {
    this.buscar();
  },
  before() {
    this.stockBalance();
    this.comprar();
  },
  methods: {
    async buscar() {
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
            this.acoes.push({
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
          console.log("Ta errado isso aí");
          this.caffeineLevel = `${error}`;
        }
      }
    },
    async selectStock() {
      if (this.$root.authenticated) {
        this.claims = await this.$auth.getUser();
        let accessToken = this.$auth.getAccessToken();
        try {
          let response = await axios.get(
            `http://localhost:8084/stock/stockname/${this.name}`,

            {
              headers: { Authorization: "Bearer " + accessToken },
            }
          );
          this.stockSelecionado = response.data;
          console.log("olha pra baixo");
          console.log(this.stockSelecionado);
        } catch (error) {
          this.stockSelecionado = `${error}`;
        }
      }
    },
    async toggleModal1() {
      this.showModal = !this.showModal;
    },
    async toggleModal(acao) {
      this.showModal = !this.showModal;
      this.compraAcao = acao;
      this.stockName = acao.stockName;
      this.stockSymbol = acao.stockSymbol;
      this.idStock = acao.id;
    },
  },

  async getUser() {
    console.log("Quase pegando usuario");
    if (this.$root.authenticated) {
      this.claims = await this.$auth.getUser();
      let accessToken = this.$auth.getAccessToken();
      try {
        await axios
          .get(`http://localhost:8083/user/${this.claims.email}`, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          })
          .then((res) => {
            this.user = res.data;
          });

        console.log(this.user);

        await console.log("o id do usuario é: " + this.user);
      } catch (error) {
        this.user = `${error}`;
      }
    }
  },
  async stockBalance() {
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
        console.log(this.balance);
        for (let key in balance) {
          if (balance[key].idUser.username === this.claims.email) {
            console.log("É igual abestadooo");
            return this.user.push({
              username: balance[key].idUser.username,
              id: balance[key].idUser.id,
              idStock: balance[key].idStock,
              stockName: balance[key].stockName,
              stockSymbol: balance[key].stockSymbol,
              volume: balance[key].volume,
            });
          }
        }
      } catch (error) {
        this.walletUser = `${error}`;
      }
    }
  },

  /* ------------------- */
  async comprar() {
    if (this.$root.authenticated) {
      this.claims = await this.$auth.getUser();
      let accessToken = this.$auth.getAccessToken();
      try {
        await axios
          .post(
            `http://localhost:8083/order/compra`,
            {
              headers: { Authorization: "Bearer " + accessToken },
            },
            {
              idUser: {
                id: this.user.id,
              },
              idStock: this.idStock,
              stockSymbol: this.stockSymbol,
              stockName: this.stockName,
              volume: this.volume,
              price: this.price,
              type: this.type,
              volumeRemaining: 0,
              status: 1,
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
        console.log("esse é o id do stock: " + this.user.id);
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>
<style>
#Home {
  padding: 40px 50px 150px 220px;
  width: 50%;
  box-sizing: border-box;
}
</style>
