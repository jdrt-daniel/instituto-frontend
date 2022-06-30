export const routes = [
  {
    path: "/",
    component: () => import("../layout/AppLayout.vue"),
    meta: {
      requireAuth: true,
      nameLabel: "Home",
    },
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("../pages/DashboardView.vue"),
      },
    ],
  },
  {
    path: "/carrera",
    component: () => import("../layout/AppLayout.vue"),
    meta: {
      requireAuth: true,
      nameLabel: "Carrera",
    },
    children: [
      {
        path: "",
        name: "carrera",
        component: () => import("../pages/CarrerasView.vue"),
      },
    ],
  },
  {
    path: "/materia",
    component: () => import("../layout/AppLayout.vue"),
    meta: {
      requireAuth: true,
      nameLabel: "Carrera",
    },
    children: [
      {
        path: "",
        name: "materia",
        component: () => import("../pages/MateriasView.vue"),
      },
    ],
  },
  {
    path: "/area",
    component: () => import("../layout/AppLayout.vue"),
    meta: {
      requireAuth: true,
      nameLabel: "Areas",
    },
    children: [
      {
        path: "",
        name: "area",
        component: () => import("../pages/AreasView.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    meta: {
      requireAuth: false,
      nameLabel: "Login",
    },
    component: () => import("../pages/LoginView.vue"),
  },
];
