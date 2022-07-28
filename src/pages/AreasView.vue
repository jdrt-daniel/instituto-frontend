<template>
  <div>
    <ModuleComponent titleModule="lista de areas" @open-modal="openModal" v-model:search="search"
      @update:search="(newValue) => (search = newValue)">
      <div v-if="loading" class="loader-container">
        <img src="/src/assets/img/loader-2.svg" class="loader-img" alt="Loader" />
      </div>
      <div class="card-body px-3 py-2">
        <div class="table-responsive">
          <table class="table table-hover text-nowrap table-sm mb-0" style="width: 100%; min-height: 50px"
            :style="loading ? 'height:400px' : ''">

            <thead>
              <tr class="bold">
                <th class="border-bottom-0" style="width: 20px">#</th>
                <th class="border-bottom-0">Area de estudio</th>
                <th class="border-bottom-0" style="width: 40px">estado</th>
                <th class="text-right border-bottom-0" style="width: 100px">
                  acciones
                </th>
              </tr>
            </thead>
            <tbody>

              <tr v-for="({ area_id, nombre, estado }, index) in listFiltered" :key="index">
                <td>
                  {{ index + 1 }}
                </td>
                <td class="">
                  {{ nombre }}
                </td>
                <td class="font-weight-bold">
                  <span class="badge" :class="estado ? 'badge-success' : 'badge-danger'"
                    v-text="estado ? 'ACTIVO' : 'INACTIVO'">
                  </span>
                </td>
                <td class="text-right">
                  <button class="btn btn-primary btn-sm mx-1" @click="openModal(area_id)" v-if="estado == 1">
                    <i class="fe fe-edit"></i>
                  </button>
                  <button class="btn btn-sm mx-1" :class="estado ? 'btn-danger' : 'btn-success'" @click="
                    estado
                      ? openAlert(index, area_id, false)
                      : openAlert(index, area_id, true)
                  ">
                    <i class="fe fe-arrow-down" :class="estado ? 'fe-arrow-down' : 'fe-arrow-up'"></i>
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </ModuleComponent>
    <Modal :title="data.id ? 'MODIFICAR AREA' : 'AGREGAR AREA'" :show="open" @update:show="closeModal"
      :loading="loading">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
        <Field type="hidden" name="id" v-model="data.id" />
        <div class="form-group">
          <label>Nombre del area <span class="text-danger">*</span></label>
          <Field name="nombre" type="text" class="form-control" :class="errors.nombre ? 'parsley-error' : ''"
            placeholder="Ingrese el nombre del area" v-model="data.nombre" />
          <div class="parsley-errors-list">
            {{ errors.nombre }}
          </div>
        </div>
        <div class="form-group text-center">
          <button class="btn btn-primary mr-2" type="submit" v-text="data.id ? 'Modificar' : 'Guardar'"></button>
          <button class="btn btn-secondary" @click="closeModal()" type="button">Cancelar</button>
        </div>
      </Form>
    </Modal>
    <Alert :show="open_a.open" :type="open_a.type" @update:show="closeModal" @submit-alert="onChangeStatus"
      :loading="loading"></Alert>
  </div>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import { useArea, areaServices } from "../composables";
const {
  data,
  open,
  open_a,
  listFiltered,
  search,
  loading,
  schema,
  openModal,
  openAlert,
  closeModal,
  onSubmit,
  onChangeStatus
} = useArea(areaServices);


</script>

<style scoped>
.loader-container {
  position: absolute;
  width: 100%;
  height: calc(100% - 60px);
  background-color: #ffffffb4;
}
</style>