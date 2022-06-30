<template>
  <transition enter-active-class="animate__animated animate__zoomIn"
    leave-active-class="animate__animated animate__zoomOut">
    <div class="modal" :class="show ? 'show' : ''" v-if="show">
      >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-content-demo">
          <div class="modal-header">
            <h6 class="modal-title">{{ title }}</h6>
            <button class="close" type="button" @click="$emit('update:show', 'closeModal')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot> contenido</slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { Form } from "vee-validate";
defineProps(["title", "show", 'metod', 'schema']);
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
</style>
