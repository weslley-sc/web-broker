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
    infoUser: [],
  }),
  async created() {
    this.config();
  },
  methods: {
    async config() {
      if (this.$root.authenticated) {
        this.claims = await this.$auth.getUser();
        let accessToken = this.$auth.getAccessToken();
        let response = await axios.get(
          `http://localhost:8083/user/${this.claims.email}`,
          {
            headers: { Authorization: "Bearer " + accessToken },
          }
        );
        this.infoUser = response;
        console.log(response);
        this.people.push({
          name: this.claims.name,
          email: this.claims.email,
          pais: this.claims.locale,
          dinheiro: "R$ " + response.data.dollarBalance.toFixed(2),
        });
      }
    },
  },
};
</script>
