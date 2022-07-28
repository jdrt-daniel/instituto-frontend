export const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "gestion" */ "../layout/AppLayout.vue"),
    meta: {
      requireAuth: true,
      nameLabel: "Home",
    },
    children: [
      {
        path: "/",
        name: "home",
        component: () =>
          import(
            /* webpackChunkName: "gestion" */ "../pages/DashboardView.vue"
          ),
      },
    ],
  },
  {
    path: "/carrera",
    component: () =>
      import(/* webpackChunkName: "gestion" */ "../layout/AppLayout.vue"),
    meta: {
      requireAuth: true,
      nameLabel: "Carrera",
    },
    children: [
      {
        path: "",
        name: "carrera",
        component: () =>
          import(/* webpackChunkName: "gestion" */ "../pages/CarrerasView.vue"),
      },
    ],
  },
  {
    path: "/materia",
    component: () =>
      import(/* webpackChunkName: "gestion" */ "../layout/AppLayout.vue"),
    meta: {
      requireAuth: true,
      nameLabel: "Materias",
    },
    children: [
      {
        path: "",
        name: "materia",
        component: () =>
          import(
            /* webpackChunkName: "gestion" */ "../pages/materias/CarrerasView.vue"
          ),
      },
      {
        path: ":id",
        name: "materia-add",
        component: () =>
          import(
            /* webpackChunkName: "gestion" */ "../pages/materias/MateriasView.vue"
          ),
      },
    ],
  },
  {
    path: "/area",
    component: () =>
      import(/* webpackChunkName: "gestion" */ "../layout/AppLayout.vue"),
    meta: {
      requireAuth: true,
      nameLabel: "Areas",
    },
    children: [
      {
        path: "",
        name: "area",
        component: () =>
          import(/* webpackChunkName: "gestion" */ "../pages/AreasView.vue"),
      },
    ],
  },
  {
    path: "/grupo",
    component: () =>
      import(/* webpackChunkName: "gestion" */ "../layout/AppLayout.vue"),
    meta: {
      requireAuth: true,
      nameLabel: "Grupos",
    },
    children: [
      {
        path: "",
        name: "grupo",
        component: () =>
          import(/* webpackChunkName: "gestion" */ "../pages/AreasView.vue"),
      },
    ],
  },
  {
    path: "/plan_estudios",
    component: () =>
      import(/* webpackChunkName: "gestion" */ "../layout/AppLayout.vue"),
    meta: {
      requireAuth: true,
      nameLabel: "Plan de Estudios",
    },
    children: [
      {
        path: "",
        name: "plan_estudios",
        component: () =>
          import(/* webpackChunkName: "gestion" */ "../pages/PlanView.vue"),
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
    component: () =>
      import(/* webpackChunkName: "gestion" */ "../pages/LoginView.vue"),
  },
];
