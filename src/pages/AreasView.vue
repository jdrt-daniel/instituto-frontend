<template>
  <div>
    <ModuleComponent titleModule="Hola mundo" @open-modal="openModal" v-model:search="search"
      @update:search="(newValue) => (search = newValue)">
      <div class="card-body px-3 py-2">
        <div class="table-responsive">
          <table class="table table-hover text-nowrap table-sm" style="width: 100%; min-height: 50px">
            <thead>
              <tr class="bold">
                <th class="border-bottom-0">Area de estudio</th>
                <th class="border-bottom-0" style="width: 40px">estado</th>
                <th class="text-right border-bottom-0" style="width: 100px">
                  acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading" style="height: 200px">
                <td colspan="3">
                  <div class="text-center">
                    <span class="spinner-border spinner-border-xl" role="status"></span>
                    <!-- <strong class="ml-2"> Cargando ... </strong> -->
                  </div>
                </td>
              </tr>
              <tr v-for="({ area_id, nombre, estado }, index) in listFilter" :key="index">
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
                      ? disabled(index, area_id)
                      : enabled(index, area_id)
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
    <ModalAdd title="Adicionar Area" :show="open" @update:show="closeModal">
      <Form @submit="saveData" :validation-schema="schema" v-slot="{ errors }">
        <div class="form-group">
          <label>Nombre del area</label>
          <Field name="nombre" type="text" class="form-control" :class="errors.nombre ? 'parsley-error' : ''"
            placeholder="Ingrese el nombre del area" v-model="data.nombre" />
          <div class="parsley-errors-list">
            {{ errors.nombre }}
          </div>
        </div>
        <div class="form-group text-center">
          <button class="btn btn-primary mr-2" type="submit">Guardar</button>
          <button class="btn btn-secondary" @click="closeModal()" type="button">Cancelar</button>
        </div>
      </Form>
    </ModalAdd>
    <Alert :show="openAlert.open" :type="openAlert.type" :id="openAlert.id" @update:show="closeModal"></Alert>
  </div>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import { onMounted } from "vue";
import { areaComposable, areaServices } from "../composables";

const {
  list,
  data,
  open,
  openAlert,
  listFilter,
  search,
  loading,
  schema,
  disabled,
  enabled,
  openModal,
  closeModal,
} = areaComposable();
const { getList, saveData } = areaServices();

onMounted(async () => {
  loading.value = true;
  list.value = await getList();
  loading.value = false;
});
</script>
