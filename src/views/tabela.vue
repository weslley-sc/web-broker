<!-- component -->
<template>
  <div class="container">
    <table
      class="text-center justify-center min-w-full divide-y shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
    >
      <thead class="bg-gray-50 flex w-full">
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
        class="bg-white divide-y flex flex-col items-center overflow-y-scroll w-full"
        style="height: 50vh"
      >
        <tr
          class="flex w-full text-center"
          v-for="(acoes, i) in acoes"
          :key="i"
        >
          <td class="p-4 w-1/4 whitespace-nowrap">
            <span
              class="bg-gray-100 text-gray-500 text-sm font-medium mr-2 px-2.5 py-0.5"
              >{{ acoes.name }}</span
            >
          </td>
          <td class="p-4 w-1/4 text-blue-500">
            <span
              class="bg-gray-100 text-gray-500 text-sm font-medium mr-2 px-2.5 py-0.5"
              >{{ acoes.symbol }}</span
            >
          </td>
          <td class="p-4 w-1/4 text-red-400">{{ acoes.askMin }}</td>
          <td class="p-4 w-1/4 text-green-400">{{ acoes.askMax }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Testes",
  data: () => ({
    acoes: [],
    comprar: [],
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
          //this.caffeineLevel = response.data;
          console.log(response);

          for (var chave in response.data) {
            this.acoes.push({
              id: response.data[chave].id,
              symbol: response.data[chave].stockSymbol,
              name: response.data[chave].stockName,
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
  },

  /* ------------------- */
  async comprar() {
    if (this.$root.authenticated) {
      this.claims = await this.$auth.getUser();
      let accessToken = this.$auth.getAccessToken();
      console.log(`Authorization: Bearer ${accessToken}`);
      try {
        let response = await axios.get(`http://localhost:8083/order/compra`, {
          headers: { Authorization: "Bearer " + accessToken },
        });
        //this.caffeineLevel = response.data;
        console.log(response);

        for (var chave in response.data) {
          this.acoes.push({
            idUser: response.data[chave].idUser.username,
            stockSymbol: response.data[chave].stockSymbol,
            stockname: response.data[chave].stockName,
            volume:
              response.data[chave].volume == null
                ? 0
                : response.data[chave].ask_min.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  }),
            price:
              response.data[chave].price == null
                ? 0
                : response.data[chave].ask_min.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  }),
          });
        }
      } catch (error) {
        console.log("Ta errado Compra");
        this.caffeineLevel = `${error}`;
      }
    }
  },
};
</script>
