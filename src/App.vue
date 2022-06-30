<template>
  <router-view />
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const routes = router.options.routes;
</script>
<style scoped>
.active {
  color: #79b3ff;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
