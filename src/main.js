import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// gLobal components
import ModuleComponent from "./components/ModuleComponent.vue";
import ModalComponent from "./components/ModalComponent.vue";
import AlertComponent from "./components/AlertComponent.vue";
//** Import bootstrap dependencies */
import "jquery";
import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

createApp(App)
  .component("ModuleComponent", ModuleComponent)
  .component("ModalAdd", ModalComponent)
  .component("Alert", AlertComponent)
  .use(router)
  .use(createPinia().use(piniaPluginPersistedstate))
  .mount("#app");
