<template>
  <div class="grid grid-col" id="home">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div
        class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 bg-gray-40"
      >
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200 md:grid-col-12">
            <caption></caption>
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Pais
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Dinheiro
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y divide-gray-200"
              v-for="(person, i) in people"
              :key="i"
            >
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ person.name }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ person.name }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ person.email }}</div>
                  <div class="text-sm text-gray-500">
                    {{ person.email }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="text-sm text-gray-500">
                    {{ person.pais }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="text-sm text-gray-500">
                    {{ person.dinheiro }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- table 2 -->
          <table class="min-w-full divide-y divide-black">
            <caption></caption>
            <thead class="bg-teal-dark">
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font- text-gray-500 uppercase tracking-wider"
              >
                Simbolo
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font- text-gray-500 uppercase tracking-wider"
              >
                Nome
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font- text-gray-500 uppercase tracking-wider"
              >
                Quantidade
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font- text-gray-500 uppercase tracking-wider"
              ></th>
            </thead>

            <tbody class="bg-teal-lightest divide-y divide-black">
              <tr
                class="font-extrabold"
                v-for="balances in balance"
                :key="balances"
              >
                <td class="px-3 py-4 whitespace-nowrap">
                  <div class="flex items justify-center">
                    <div class="text-sm medium text-teal-darker">
                      {{ balances.stockSymbol }}
                    </div>
                  </div>
                </td>
                <td class="px-3 py-4 whitespace-nowrap">
                  <div class="flex items justify-center">
                    <div class="text-sm medium text-teal-darker">
                      {{ balances.stockName }}
                    </div>
                  </div>
                </td>
                <td class="px-3 py-4 whitespace-nowrap">
                  <div class="flex items justify-center">
                    <div class="ml-4">
                      <div class="text-sm medium text-teal-darker">
                        {{ balances.volume }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-3 py-4 whitespace-nowrap">
                  <div class="flex items justify-center">
                    <button
                      v-on:click="toggleModal(balances)"
                      class="bg-teal-dark hover:bg-teal-darker text-white font-bold py-2 px-4 border border-black rounded"
                    >
                      Vender
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
                      @click="vender(showModal)"
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    people: [],
    showModal: false,
    volume: 0,
    stockName: "",
    stockSymbol: "",
    venderAcao: null,
    price: 0,
    type: 2,
    balance: [],
    id_user: 0,
    idStock: 0,
  }),
  async created() {
    this.dadosUsuario();
    this.stocks();
  },
  before() {
    this.vender();
  },

  methods: {
    async stocks() {
      if (this.$root.authenticated) {
        this.claims = await this.$auth.getUser();
        let accessToken = this.$auth.getAccessToken();
        try {
          let response = await axios.get(`http://localhost:8084/stock`, {
            headers: { Authorization: "Bearer " + accessToken },
          });
          console.log(response);
          this.seila = response.data;

          for (var chave in response.data) {
            this.acoes.push({
              idStock: response.data[chave].idStock,
              stockSymbol: response.data[chave].stockSymbol,
              stockName: response.data[chave].stockName,
            });
          }
        } catch (error) {
          console.log("Ta errado isso aí");
        }
      }
    },
    async dadosUsuario() {
      console.log("to aquiiiiiiiiii");
      if (this.$root.authenticated) {
        this.claims = await this.$auth.getUser();
        let accessToken = this.$auth.getAccessToken();
        try {
          //pega informações do usuário
          let response = await axios.get(
            `http://localhost:8083/api/users/username/${this.claims.email}`,
            {
              headers: { Authorization: "Bearer " + accessToken },
            }
          );

          this.id_user = response.data.id;
          console.log("Aqui é id do usuario: " + this.id_user);
          this.people.push({
            name: this.claims.name,
            email: this.claims.email,
            pais: this.claims.locale,
            id: response.data.id,
            dinheiro: "R$ " + response.data.dollarBalance.toFixed(2),
          });
        } catch (error) {
          this.stocks = `${error}`;
        }
        try {
          //pega as stock do usuário logado
          let response2 = await axios.get(
            `http://localhost:8083/api/user_stock/${this.id_user}`,
            {
              headers: { Authorization: "Bearer " + accessToken },
            }
          );
          for (var chave in response2.data) {
            this.balance.push({
              idStock: response2.data[chave].idStock,
              stockSymbol: response2.data[chave].stockSymbol,
              stockName: response2.data[chave].stockName,
              volume: response2.data[chave].volume,
            });
          }
        } catch (error) {
          this.stocks = `${error}`;
        }
      }
    },
    async toggleModal1() {
      this.showModal = !this.showModal;
    },
    async toggleModal(balances) {
      this.showModal = !this.showModal;
      this.venderAcao = balances;
      this.stockName = this.venderAcao.stockName;
      this.stockSymbol = this.venderAcao.stockSymbol;
      this.idStock = this.venderAcao.idStock;
    },
    async vender(balances) {
      if (this.$root.authenticated) {
        let accessToken = this.$auth.getAccessToken();
        this.claims = await this.$auth.getUser();

        try {
          let response = await axios.get(`http://localhost:8084/stock`, {
            headers: { Authorization: "Bearer " + accessToken },
          });
          for (var chave in response.data) {
            this.balances.push({
              idStock: response.data.idStock,
              stockSymbol: response.data[chave].stockSymbol,
              stockName: response.data[chave].stockName,
            });
          }
        } catch (error) {
          console.log("Ta errado isso aí menor");
        }

        try {
          let response = await axios.get(
            `http://localhost:8083/api/users/username/${this.claims.email}`,
            {
              headers: { Authorization: "Bearer " + accessToken },
            }
          );

          this.id_user = response.data.id;
          console.log("Aqui é id do usuario: " + this.id_user);
          console.log("Aqui é o id da stock: " + this.idStock);
        } catch (error) {
          this.erro = `${error}`;
        }
        try {
          await axios
            .post(
              `http://localhost:8083/api/new_order`,
              {
                idUser: this.id_user,
                idStock: this.idStock,
                stockSymbol: this.stockSymbol,
                stockName: this.stockName,
                volume: this.volume,
                remainingVolume: this.volume,
                price: this.price,
                type: 2,
                status: 1,
              },

              {
                headers: { Authorization: "Bearer " + accessToken },
              }
            )
            .then(() => {
              window.alert("Venda realizada com sucesso !!!");
            });
        } catch (error) {
          console.log(error);
        }
        this.venderAcao = balances;
        this.idStock = this.venderAcao.idStock;
        this.stockName = this.venderAcao.stockName;
        this.stockSymbol = this.venderAcao.stockSymbol;
      }
    },
  },
};
</script>
