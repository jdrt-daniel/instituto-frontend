<template>
  <!-- Loader -->
  <div id="global-loader">
    <img src="/src/assets/img/loader-2.svg" class="loader-img" alt="Loader" />
  </div>
  <!-- /Loader -->
  <HeaderComponent></HeaderComponent>

  <HorizontalMenuComponent></HorizontalMenuComponent>

  <div class="main-content horizontal-content">
    <!-- container opened -->
    <div class="container">
      <div
        class="breadcrumb-header justify-content-between mg-lg-t-0 mg-lg-b-30"
      >
        <div class="left-content">
          <h4 class="content-title mb-2">Gestión {{ routeName }}</h4>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a>Gestión {{ routeName }}</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Lista de {{ routeName }}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <router-view></router-view>
    </div>
    <!-- row close -->
  </div>
  <!-- main-content closed -->

  <SidebarRightComponent></SidebarRightComponent>

  <!-- Footer opened -->
  <div class="main-footer ht-40">
    <div class="container-fluid pd-t-0-f ht-100p">
      <span
        >Copyright © 2021 <a href="#">Dashfox</a>. Designed by
        <a href="https://www.spruko.com/">Spruko</a> All rights reserved.</span
      >
    </div>
  </div>
  <!-- Footer closed -->
  <!-- Back-to-top -->
  <a href="#top" id="back-to-top"><i class="fas fa-angle-up"></i></a>
</template>

<script setup>
import SidebarRightComponent from "../components/template/SidebarRightComponent.vue";
import HeaderComponent from "../components/template/HeaderComponent.vue";
import HorizontalMenuComponent from "../components/template/HorizontalMenuComponent.vue";
import { routeStore } from "../stores/templateStore";
import { loginComposable } from "../composables";
import { onMounted } from "vue";
const { onLogout, user } = loginComposable();
const { routeName } = routeStore();
onMounted(() => {
  if (localStorage.getItem("reloaded")) {
    localStorage.removeItem("reloaded");
  } else {
    localStorage.setItem("reloaded", "1");
    location.reload();
  }
}),
  import("../assets/js/horizontal-menu.js");
import("../assets/js/plantilla.js");
import("../assets/js/sticky.js");
</script>
