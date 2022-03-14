import { createRouter, createWebHistory } from "vue-router";
import { LoginCallback, navigationGuard } from "@okta/okta-vue";
import HomeComponent from "@/components/Home";
import LoginComponent from "@/components/Login";
import ProfileComponent from "@/components/Profile";
import MarketComponent from "@/components/Market";
import TradeComponent from "@/components/Trade";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomeComponent,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      component: LoginComponent,
    },
    {
      path: "/login/callback",
      component: LoginCallback,
    },
    {
      path: "/profile",
      component: ProfileComponent,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/market",
      component: MarketComponent,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/trade",
      component: TradeComponent,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach(navigationGuard);

export default router;
