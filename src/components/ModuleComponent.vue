<template>
  <div class="row row-sm">
    <div class="col-xl-12 col-lg-12 col-md-12">
      <div class="card">
        <div class="card-header pd-t-25 px-3 pt-3 pb-2">
          <div class="d-flex justify-content-between">
            <h3 class="card-title">{{ titleModule }}</h3>

            <div class="card-options float-left">
              <div class="main-header-search mt-0 d-md-inline-block d-none mr-3">
                <input class="form-control shadow" placeholder="Buscar..." type="text" :value="search"
                  @input="$emit('update:search', $event.target.value)" />
                <button class="btn" v-if="search" @click="$emit('update:search', '')">
                  <i class="fas fa-times d-none d-md-block text-danger"></i>
                </button>
                <button class="btn" v-else>
                  <i class="fas fa-search d-none d-md-block"></i>
                </button>
              </div>
              <button class="btn btn-success" @click="$emit('openModal')">
                <i class="fa fa-plus"></i> Agregar
              </button>
            </div>
          </div>
        </div>
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  titleModule: {
    type: String,
    default: "Titulo del modulo",
    required: true,
  },
  search: {
    type: String,
    required: false,
  },
});
defineEmits(["openModal", "update:search"]);
</script>

<style lang="scss" scoped>
</style>
