<template>
  <nav>
    <!-- desktop menu -->
    <div class="bg-indigo-600">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between">
          <!-- menu -->
          <div class="flex space-x-4">
            <!-- logo -->

            <a href="" class="flex items-center space-x-2 py-5 px-2">
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
                ></path></svg
              ><span class="font-extrabold text-white">SolinfBroker</span>
            </a>
            <!-- menu -->
            <div class="hidden md:flex items-center space-x-1">
              <a
                href="/"
                class="py-5 px-2 text-indigo-200 hover:text-indigo-400"
                >Settings</a
              >
              <a
                href="/"
                class="py-5 px-2 text-indigo-200 hover:text-indigo-400"
                >About</a
              >
              <a
                href="/"
                class="py-5 px-2 text-indigo-200 hover:text-indigo-400"
                >Store</a
              >
            </div>
          </div>
          <!-- login -->
          <div class="hidden md:flex items-center space-x-1">
            <a href="/" class="text-indigo-200 hover:text-indigo-400">Login</a>

            <a href="/" class="text-indigo-200 hover:text-indigo-400"
              >Register</a
            >
          </div>
          <!-- button show mobile menu -->
          <div class="md:hidden flex items-center">
            <button @click="showMobileMenu = !showMobileMenu" class="py-5 px-2">
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
      <a
        href="/"
        class="block py-2 px-4 hover:bg-indigo-700 hover:text-indigo-400 text-indigo-100"
        >Settings</a
      >
      <a
        href="/"
        class="block py-2 px-4 hover:bg-indigo-700 hover:text-indigo-400 text-indigo-100"
        >About</a
      >
      <a
        href="/"
        class="block py-2 px-4 hover:bg-indigo-700 hover:text-indigo-400 text-indigo-100"
        >Store</a
      >
    </div>
  </nav>
</template>

<script></script>
