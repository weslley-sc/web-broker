<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="grid grid-col" id="home">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-10 align-middle inline-block min-w-full sm:px-32 lg:px-7">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <div style="overflow: scroll">
            <header
              class="flex justify-between bg-gray-800 rounded-t-lg text-xl font-extrabold text-white"
            ></header>
            <!-- component -->
            <!-- This is an example component -->
            <div>
              <input
                class="border-2 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none overflow-x-auto"
                type="search"
                name="name"
                placeholder="Search Stocks"
                data-bs-spy="scroll"
                data-bs-target="#scrollspy1"
                data-bs-offset="200"
                v-model="acoes.simbol"
              />
              <button
                type="submit"
                class="absolute right-5 top-0 mt-2 mr-4 padding-5px"
              ></button>
            </div>
          </div>
          <table class="min-w-full divide-y divide-gray-200 md:grid-col-12">
            <thead class="bg-gray-50 flex w-full">
              <tr class="flex w-full text-center">
                <th
                  scope="col"
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Symbol
                </th>
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
                  Ask Min
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ask Max
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Bid Min
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Bid Max
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Volume
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Buy/sell</span>
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y divide-gray-200 flex flex-col justify-between overflow-y-scroll"
              style="height: 50vh"
            >
              <tr v-for="(acoes, i) in acoes" :key="i">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ acoes.simbol }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ acoes.simbol }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ acoes.nome }}</div>
                  <div class="text-sm text-gray-500">
                    {{ acoes.nome }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="text-sm text-gray-500">
                    {{ acoes.askMin }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="text-sm text-gray-500">
                    {{ acoes.askMax }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="text-sm text-gray-500">
                    {{ acoes.bidmin }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="text-sm text-gray-500">
                    {{ acoes.bidmax }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="text-sm text-gray-500">
                    {{ acoes.askMin }}
                  </div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900"
                    >Buy/sell</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    acoes: [],
    name: "---- Select a stock ----",
    currentPage: 1,
    filter: "",
    optionsCity: ["stockSymbol", "stockName"],
    paginationLimitRows: 20,
    selectSymbol: "",
  }),
  created() {
    this.buscar();
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

          console.log(response.data);

          for (var key in response.data) {
            this.acoes.push({
              id: response.data[key].id,
              simbol: response.data[key].stockSymbol,
              nome: response.data[key].stockName,
              askMin:
                response.data[key].askMin == null
                  ? 0
                  : response.data[key].askMin.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    }),
              askMax:
                response.data[key].askMax == null
                  ? 0
                  : response.data[key].askMax.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    }),
              bidmin:
                response.data[key].bidMin == null
                  ? 0
                  : response.data[key].bidMin.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    }),
              bidmax:
                response.data[key].bidMax == null
                  ? 0
                  : response.data[key].bid_max.toLocaleString("pt-BR", {
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

    async getMoeda() {
      console.log("to aquiiiiiiiiii");
      if (this.$root.authenticated) {
        this.claims = await this.$auth.getUser();
        let accessToken = this.$auth.getAccessToken();
        try {
          let response = await axios.get(
            `http://localhost:8084/stock/stocksymbol/${this.stockSymbol}`,
            {
              headers: { Authorization: "Bearer " + accessToken },
            }
          );
          this.teste = response.data;
          console.log(
            "id: " +
              this.teste[0].id +
              " Symbol: " +
              this.teste[0].stock_symbol +
              " Nome: " +
              this.name +
              " Volume: " +
              this.volume +
              " Preço: " +
              this.bid,
            "tipo: " + this.type
          );
        } catch (error) {
          this.walletUser = `${error}`;
        }
      }
    },
  },
};
</script>
