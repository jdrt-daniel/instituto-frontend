import { createRouter, createWebHashHistory } from "vue-router";
import { loginStore } from "../stores";
import { routes } from "./routes";
const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const tokenStore = localStorage.getItem("token");
  const { token } = loginStore();
  if (to.name !== "login" && !token && !tokenStore) {
    next({
      path: "login",
      replace: true,
    });
  } else {
    next();
  }
});

export default router;
