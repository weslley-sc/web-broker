<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="grid grid-col-8" id="minhasOrdens">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200 md:grid-col-12">
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
                placeholder="Select a type"
                class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                v-model="type"
              >
                <option value="1">Compra</option>
                <option value="2">Venda</option>
              </select>
            </div>
            <thead class="bg-gray-50 w-full">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  USER
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock Symbol
                </th>

                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
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
            <tbody>
              <tr
                class="bg-white divide-y divide-gray-200"
                v-for="(orders, i) in orders"
                :key="i"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ orders.id }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ orders.username }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ orders.stockName }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ orders.stockName }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="text-sm text-gray-500">
                    {{ orders.stockSymbol }}
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="text-sm text-gray-500">
                    {{ orders.type }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="text-sm text-gray-500">
                    {{ orders.price }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="text-sm text-gray-500">
                    {{ orders.volume }}
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
    orders: [],
    tudo: [],
    type: "",
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
          let response = await axios.get(`http://localhost:8083/order`, {
            headers: { Authorization: "Bearer " + accessToken },
          });

          console.log(response.data);
          this.tudo = response.data;
          console.log(this.tudo);

          for (let key in response.data) {
            this.orders.push({
              id: response.data[key].id,
              idStock: response.data[key].idStock,
              username: response.data[key].idUser.username,
              price: response.data[key].price,
              status: response.data[key].status,
              stockName: response.data[key].stockName,
              stockSymbol: response.data[key].stockSymbol,
              type: response.data[key].type,
              volume: response.data[key].volume,
            });
          }
        } catch (error) {
          console.log("Ta errado isso aí");
          this.caffeineLevel = `${error}`;
        }
      }
    },
    async criarOrdem() {
      if (this.$root.authenticated) {
        axios.post(`http://localhost:8083/ordem/compra`, {
          id: 1,
          idUser: {
            id: 1,
            username: `${this.username}`,
          },
          idStock: 1,
          stockSymbol: "BEEF",
          stockName: "MINERVA",
          volume: 10,
          volumeRemaining: 0,
          price: 35.0,
          type: 1,
          status: 1,
        });
      }
    },
  },
};
</script>
