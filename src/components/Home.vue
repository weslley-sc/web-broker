<!-- component -->
<template>
  <div
    id="Home"
    class="flex container justify-center xl:mx-auto md:container sm:inset-x-10"
  >
    <table
      class="text-center justify-center min-w-full divide-y shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
    >
      <caption></caption>
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
        <tr class="flex w-full text-center" v-for="acao in acoes" :key="acao">
          <td class="p-4 w-1/4 whitespace-nowrap">
            <button v-on:click="toggleModal(acao)">
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
                @click="comprar(showModal)"
                v-on:click="toggleModal1(showModal)"
              >
                Salvar Ordem
              </button>
              <button
                class="py-3 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-gray-300 focus:outline-none"
                type="button"
                v-on:click="toggleModal1(showModal)"
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

    showModal: false,

    stockName: "",

    stockSymbol: "",

    idStock: 0,
    volume: 0,

    compraAcao: null,

    type: 1,
  }),
  created() {
    this.buscarAcoes();
  },
  before() {
    this.comprar();
  },

  methods: {
    async buscarAcoes() {
      console.log("pagando as Stocks !!!");
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
          console.log("peguei as stocks ./");
        } catch (error) {
          console.log("Ta errado isso aí");
          this.caffeineLevel = `${error}`;
        }
      }
    },

    async toggleModal1() {
      this.showModal = !this.showModal;
    },
    async toggleModal(acao) {
      this.showModal = !this.showModal;
      this.compraAcao = acao;
      this.stockName = this.compraAcao.stockName;
      this.stockSymbol = this.compraAcao.stockSymbol;
      this.idStock = this.compraAcao.id;
    },

    async comprar(acao) {
      if (this.$root.authenticated) {
        let accessToken = this.$auth.getAccessToken();
        this.claims = await this.$auth.getUser();
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
            });
          }
          this.stockName2 = this.acaoCompra.stockName;

          console.log("Stock Modal");
          console.log(this.stockName2);
        } catch (error) {
          console.log("Ta errado isso aí");
          this.caffeineLevel = `${error}`;
        }

        try {
          let response = await axios.get(
            `http://localhost:8083/api/users/username/${this.claims.email}`,
            {
              headers: { Authorization: "Bearer " + accessToken },
            }
          );

          this.user = response.data.id;
          console.log("Aqui é id do usuario: " + this.user);
          console.log(response);
        } catch (error) {
          this.erro = `${error}`;
        }

        try {
          await axios
            .post(
              `http://localhost:8083/api/new_order`,
              {
                idUser: this.user,
                idStock: this.idStock,
                stockSymbol: this.stockSymbol,
                stockName: this.stockName,
                volume: this.volume,
                remainingVolume: this.volume,
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
            });
        } catch (error) {
          console.log(error);
        }
        this.compraAcao = acao;
        this.stockName = this.compraAcao.stockName;
        this.stockSymbol = this.compraAcao.stockSymbol;
        this.idStock = this.compraAcao.id;
      }
    },
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
