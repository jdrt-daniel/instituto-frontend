import { defineStore } from "pinia";
import { useRoute } from "vue-router";
// const route = useRouter();
export const templateStore = defineStore("template", {
  state: () => ({}),
  actions: {},
});

export const routeStore = defineStore("route", {
  state: () => ({
    routeName: useRoute().meta.nameLabel,
  }),
});
