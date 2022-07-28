<template>
  <transition enter-active-class="animate__animated animate__zoomIn"
    leave-active-class="animate__animated animate__zoomOut">
    <div class="modal" :class="show ? 'show' : ''" v-if="show">
      <div class="modal-dialog modal-dialog-centered" :class="size">
        <div class="modal-content modal-content-demo">
          <div class="modal-header">
            <h6 class="modal-title">{{ title }}</h6>
            <button class="close" type="button" @click="$emit('update:show', 'closeModal')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="loading-cover" v-if="loading">
              <div class="d-flex justify-content-center" style="width: 100%;">
                <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
            <slot> contenido</slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { Form } from "vee-validate";
defineProps(["title", "show", 'metod', 'schema', 'size', 'loading']);
defineEmits(["update:show"]);
</script>

<style scoped>
.show {
  display: block;
  background-color: #00000096;
}

.animate__animated.animate__zoomIn {
  --animate-duration: 0.5s;
}

.loading-cover {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: #ffffff;
  z-index: 1;
  display: flex;
  align-items: center;
}
</style>
