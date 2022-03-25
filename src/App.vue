<template>
  <div id="app" class="bg-indigo-200">
    <nav>
      <!-- desktop menu -->
      <div class="bg-indigo-600">
        <div class="max-w-7xl mx-auto">
          <div class="flex justify-between">
            <!-- menu -->
            <div class="flex space-x-4">
              <!-- logo -->

              <router-link to="/">
                <a class="flex items-center space-x-2 py-5 px-2 cursor-pointer">
                  <svg
                    class="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    ></path>
                  </svg>
                  <span class="font-extrabold text-white">SolinfBroker</span>
                </a>
              </router-link>
              <!-- menu -->
              <div class="hidden md:flex items-center space-x-1">
                <router-link
                  to="/"
                  class="py-5 px-2 text-indigo-200 hover:text-indigo-400 cursor-pointer"
                  >Home
                </router-link>
                <router-link
                  class="py-5 px-2 text-indigo-200 hover:text-indigo-400 cursor-pointer"
                  to="/profile"
                  v-if="authenticated"
                >
                  Profile
                </router-link>
                <router-link
                  to="/market"
                  class="py-5 px-2 text-indigo-200 hover:text-indigo-400 cursor-pointer"
                  >Market
                </router-link>
                <router-link
                  to="/trade"
                  class="py-5 px-2 text-indigo-200 hover:text-indigo-400 cursor-pointer"
                  >Trade
                </router-link>
              </div>
            </div>
            <!-- login -->
            <div class="hidden md:flex items-center space-x-1">
              <a
                class="py-5 px-2 text-indigo-200 hover:text-indigo-400 cursor-pointer"
                v-if="authenticated"
                v-on:click="logout()"
              >
                Logout
              </a>
              <h1
                class="py-5 px-2 text-indigo-200 hover:text-indigo-400 cursor-pointer"
                v-if="authenticated"
              >
                saldo: R$ {{ user.dollarBalance }}, 00
              </h1>
              <router-link
                class="py-5 px-2 text-indigo-200 hover:text-indigo-400 cursor-pointer"
                to="/login"
                v-if="!authenticated"
              >
                Login
              </router-link>
            </div>
            <!-- button show mobile menu -->
            <div class="md:hidden flex items-center">
              <button
                @click="showMobileMenu = !showMobileMenu"
                class="py-5 px-2 cursor-pointer"
              >
                <svg
                  class="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- mobile menu -->
      <div class="md:hidden bg-indigo-600" v-show="showMobileMenu">
        <router-link
          to="/"
          class="block py-2 px-4 hover:bg-indigo-700 hover:text-indigo-400 text-indigo-100"
          >Home
        </router-link>
        <router-link
          class="block py-2 px-4 hover:bg-indigo-700 hover:text-indigo-400 text-indigo-100"
          to="/login"
          v-if="!authenticated"
        >
          Login
        </router-link>
        <router-link
          class="block py-2 px-4 hover:bg-indigo-700 hover:text-indigo-400 text-indigo-100"
          to="/profile"
          v-if="authenticated"
        >
          Profile
        </router-link>
        <router-link
          to="/market"
          class="block py-2 px-4 hover:bg-indigo-700 hover:text-indigo-400 text-indigo-100"
          v-if="authenticated"
          >Market
        </router-link>
        <router-link
          to="/trade"
          class="block py-2 px-4 hover:bg-indigo-700 hover:text-indigo-400 text-indigo-100"
          v-if="authenticated"
          >Trade
        </router-link>
        <a
          class="block py-2 px-4 hover:bg-indigo-700 hover:text-indigo-400 text-indigo-100 cursor-pointer"
          v-if="authenticated"
          v-on:click="logout()"
        >
          Logout
        </a>
      </div>
    </nav>
    <div id="content">
      <router-view />
    </div>

    <footer
      class="bg-indigo-600 text-gray-100 fixed inset-x-0 bottom-0"
      padless
    >
      <div class="max-w-2xl mx-auto py-2">
        <hr class="h-px mt-6 bg-indigo-600 border-none" />
        <div
          class="flex flex-col items-center justify-between mt-6 md:flex-row"
        >
          <div>
            <a
              class="text-xs font-bold text-gray-100 hover:text-indigo-400"
              href="http://localhost:8080/"
              >SolinfBroker™ © 2022</a
            >
          </div>
          <div class="flex mt-4 md:m-0">
            <div class="-mx-4"></div>
          </div>

          <ul class="flex flex-wrap items-center mt-3 sm:mt-0">
            <li>
              <a
                href="https://github.com/weslley-sc"
                class="text-sm text-white hover:text-indigo-400"
                >Contact</a
              >
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
export default {
  name: "#app",
  data: function () {
    return { authenticated: false, user: [] };
  },
  setup() {
    const showMobileMenu = ref(false);

    return { showMobileMenu };
  },
  async created() {
    await this.isAuthenticated();
    this.$auth.authStateManager.subscribe(this.isAuthenticated);
  },

  watch: {
    // Everytime the route changes, check for auth status
    $route: "isAuthenticated",
  },
  methods: {
    async isAuthenticated() {
      this.authenticated = await this.$auth.isAuthenticated();
      this.claims = await this.$auth.getUser();
      let accessToken = this.$auth.getAccessToken();
      try {
        let response = await axios.get(
          `http://localhost:8083/api/users/username/${this.claims.email}`,
          {
            headers: { Authorization: "Bearer " + accessToken },
          }
        );

        this.user = response.data;
        console.log("Aqui é id do usuario: " + this.user);
        console.log(response);
      } catch (error) {
        this.erro = `${error}`;
      }
    },
    async logout() {
      await this.$auth.signOut();
    },
  },
};
</script>
