<template>
  <div class="modal" :class="show ? 'show' : ''">
    <transition enter-active-class="animate__animated animate__tada"
      leave-active-class="animate__animated animate__zoomOut">
      <div class="modal-dialog modal-dialog-centered" v-if="show">
        <div class="modal-content">
          <div class="modal-body text-center p-4">
            <div class="loading-cover" :class="type ? 'success' : 'danger'" v-if="loading">
              <div class="d-flex justify-content-center" style="width: 100%">
                <div class="spinner-border" role="status" style="width: 3rem; height: 3rem">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
            <button aria-label="Close" class="close" data-dismiss="modal" type="button"
              @click="$emit('update:show', false)">
              <span aria-hidden="true">&times;</span>
            </button>
            <div v-if="type">
              <i class="fe fe-check-circle tx-100 text-success lh-1 mg-t-20 d-inline-block"></i>
              <h4 class="text-success">Habilitar registro</h4>
              <p class="mg-b-20 mg-x-20">
                Este registro de habilitará nuevamente.
              </p>
            </div>
            <div v-else>
              <i class="fa fa-times-circle tx-100 tx-danger lh-1 mg-t-20 d-inline-block"></i>
              <h4 class="tx-danger mg-b-20">Inhabilitar registro!</h4>
              <p class="mg-b-20 mg-x-20">Este registro se inhabilitará</p>
            </div>
            <button class="btn pd-x-25 mx-1" :class="type ? 'btn-success' : 'btn-danger'" type="button"
              @click="$emit('submit-alert', 'onChangeStatus')" v-text="
                type ? 'Si, habilitar registro' : 'Si, inhabilitar registro'
              "></button>
            <button class="btn btn-secondary pd-x-25 mx-1" type="button" @click="$emit('update:show', 'closeModal')">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
defineProps(["title", "show", "type", "loading"]);
defineEmits(["update:show", "submit-alert"]);
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
  z-index: 1;
  display: flex;
  border-radius: 10px;
  align-items: center;
}

.loading-cover.success {
  background: #cfcfcf59;
}

.loading-cover.success .spinner-border {
  color: green;
}

.loading-cover.danger {
  background: #cfcfcf59;
}

.loading-cover.danger .spinner-border {
  color: red;
}
</style>
