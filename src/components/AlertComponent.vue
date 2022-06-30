<template>
  <div class="modal" :class="show ? 'show' : ''">
    <transition enter-active-class="animate__animated animate__tada"
      leave-active-class="animate__animated animate__zoomOut">
      <div class="modal-dialog modal-dialog-centered" v-if="show">
        <div class="modal-content">
          <div class="modal-body text-center p-4">
            <button aria-label="Close" class="close" data-dismiss="modal" type="button"
              @click="$emit('update:show', false)">
              <span aria-hidden="true">&times;</span>
            </button>
            <div v-if="type == 'alta'">
              <i class="fe fe-check-circle tx-100 text-success lh-1 mg-t-20 d-inline-block"></i>
              <h4 class="text-success">Habilitar registro</h4>
              <p class="mg-b-20 mg-x-20">
                Este registro de habilitará nuevamente.
              </p>
              <button class="btn btn-success pd-x-25 mx-1" type="button">
                Si, habilitar
              </button>
              <button class="btn btn-secondary pd-x-25 mx-1" type="button" @click="$emit('update:show', 'closeModal')">
                Cancelar
              </button>
            </div>
            <div v-else>
              <i class="fa fa-times-circle tx-100 tx-danger lh-1 mg-t-20 d-inline-block"></i>
              <h4 class="tx-danger mg-b-20">Inhabilitar registro!</h4>
              <p class="mg-b-20 mg-x-20">
                Este registro se inhabilitará {{ id }}
              </p>
              <button class="btn btn-danger pd-x-25 mx-1" type="button">
                Si, inhabilitar
              </button>
              <button class="btn btn-secondary pd-x-25 mx-1" type="button" @click="$emit('update:show', false)">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
defineProps(["title", "show", 'type', 'id']);
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
