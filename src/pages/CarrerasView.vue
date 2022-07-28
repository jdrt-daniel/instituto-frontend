<template>
  <div>
    <ModuleComponent
      titleModule="lista de carreras"
      @open-modal="openModal"
      v-model:search="search"
      @update:search="(newValue) => (search = newValue)"
    >
      <div v-if="loading" class="loader-container">
        <img
          src="/src/assets/img/loader-2.svg"
          class="loader-img"
          alt="Loader"
        />
      </div>
      <div class="card-body px-3 py-2">
        <div class="table-responsive">
          <table
            class="table table-hover text-nowrap"
            style="width: 100%; min-height: 50px"
          >
            <thead>
              <tr class="bold">
                <th class="border-bottom-0" style="width: 40px">#</th>
                <th class="border-bottom-0">Carrera</th>
                <th class="border-bottom-0">Tiempo de estudio</th>
                <th class="border-bottom-0">Nivel de formacion</th>
                <th class="border-bottom-0" style="width: 40px">estado</th>
                <th class="text-right border-bottom-0" style="width: 200px">
                  acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(
                  {
                    carrera_id,
                    nombre,
                    area,
                    nivel_formacion,
                    tiempo_estudio,
                    estado,
                  },
                  index
                ) in listFiltered"
                :key="index"
              >
                <td>
                  {{ index + 1 }}
                </td>
                <td class="">
                  <p class="mb-0">{{ nombre }}</p>
                  <small class="tx-gray-800">{{ area.nombre }}</small>
                </td>
                <td class="font-weight-bold">{{ tiempo_estudio }} años</td>
                <td class="font-weight-bold">
                  {{ nivel_formacion }}
                </td>
                <td class="font-weight-bold">
                  <span
                    class="badge"
                    :class="estado ? 'badge-success' : 'badge-danger'"
                    v-text="estado ? 'ACTIVO' : 'INACTIVO'"
                  >
                  </span>
                </td>
                <td class="text-right">
                  <button
                    class="btn btn-secondary btn-sm mx-1"
                    @click="openViewModal(carrera_id)"
                  >
                    <i class="fe fe-search"></i>
                  </button>
                  <button
                    class="btn btn-primary btn-sm mx-1"
                    @click="openModal(carrera_id)"
                    v-if="estado == 1"
                  >
                    <i class="fe fe-edit"></i>
                  </button>
                  <button
                    class="btn btn-sm mx-1"
                    :class="estado ? 'btn-danger' : 'btn-success'"
                    @click="
                      estado
                        ? openAlert(index, carrera_id, false)
                        : openAlert(index, carrera_id, true)
                    "
                  >
                    <i
                      class="fe fe-arrow-down"
                      :class="estado ? 'fe-arrow-down' : 'fe-arrow-up'"
                    ></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ModuleComponent>
    <Modal
      :title="data.id ? 'MODIFICAR CARRERA' : 'AGREGAR CARRERA'"
      :show="open"
      @update:show="closeModal"
      size="modal-lg"
      :loading="loading"
    >
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
        <Field type="hidden" name="id" v-model="data.id" />
        <div class="row">
          <div class="form-group col-12">
            <label>Nombre del area <span class="text-danger">*</span></label>
            <Field
              name="nombre"
              type="text"
              class="form-control"
              :class="errors.nombre ? 'parsley-error' : ''"
              placeholder="Ingrese el nombre del area"
              v-model="data.nombre"
            />
            <div class="parsley-errors-list">
              {{ errors.nombre }}
            </div>
          </div>
          <div class="form-group col-4">
            <label for=""
              >Carga horaria <span class="text-danger">*</span></label
            >
            <div class="input-group">
              <Field
                type="number"
                name="carga_horaria"
                class="form-control"
                :class="errors.carga_horaria ? 'parsley-error' : ''"
                v-model="data.carga_horaria"
              />
              <div class="input-group-append">
                <span class="input-group-text">Horas</span>
              </div>
            </div>
            <div class="parsley-errors-list">
              {{ errors.carga_h }}
            </div>
          </div>
          <div class="form-group col-4">
            <label for=""
              >Tiempo de estudio <span class="text-danger">*</span></label
            >
            <div class="input-group">
              <Field
                type="number"
                name="tiempo_estudio"
                class="form-control"
                readonly
                :class="errors.tiempo_estudio ? 'parsley-error' : ''"
                v-model="data.tiempo_estudio"
              />
              <div class="input-group-append">
                <span class="input-group-text">Años</span>
              </div>
            </div>
            <div class="parsley-errors-list">
              {{ errors.tiempo }}
            </div>
          </div>
          <div class="form-group col-4">
            <label for=""
              >Regimen de estudio <span class="text-danger">*</span></label
            >
            <Field
              type="text"
              name="regimen_estudio"
              class="form-control"
              :class="errors.regimen_estudio ? 'parsley-error' : ''"
              v-model="data.regimen_estudio"
            />
            <div class="parsley-errors-list">
              {{ errors.regimen }}
            </div>
          </div>
          <div class="form-group col-6">
            <label for=""
              >Nivel de formacion <span class="text-danger">*</span></label
            >
            <Field
              as="select"
              name="nivel_formacion"
              class="form-control"
              v-model="data.nivel_formacion"
              :class="errors.nivel_formacion ? 'is-invalid' : ''"
            >
              <option value="0">Seleccione un nivel de formacion</option>
              <option
                v-for="item in niveles"
                :value="item.nivel_id"
                :key="item"
              >
                {{ item.grado }}
              </option>
            </Field>
            <div class="parsley-errors-list">
              {{ errors.nivel_formacion }}
            </div>
          </div>
          <div class="form-group col-6">
            <label for=""
              >Area de estudio <span class="text-danger">*</span></label
            >
            <Field
              as="select"
              name="area_id"
              class="form-control"
              v-model="data.area_id"
              :class="errors.area_id ? 'is-invalid' : ''"
            >
              <option value="0">Selecciona el area</option>
              <option
                :value="area_id"
                v-for="{ area_id, nombre } in areas"
                :key="area_id"
              >
                {{ nombre }}
              </option>
            </Field>
            <div class="parsley-errors-list">
              {{ errors.area }}
            </div>
          </div>
          <div class="form-group col-12">
            <label for=""
              >Denominacion de titulo profesional
              <span class="text-danger">*</span></label
            >
            <Field
              type="text"
              name="denominacion_titulo"
              class="form-control"
              :class="errors.denominacion_titulo ? 'parsley-error' : ''"
              v-model="data.denominacion_titulo"
            />
            <div class="parsley-errors-list">
              {{ errors.denominacion_titulo }}
            </div>
          </div>
        </div>
        <div class="form-group text-center mb-0">
          <button
            class="btn btn-primary mr-2"
            type="submit"
            v-text="data.id ? 'Modificar' : 'Guardar'"
          ></button>
          <button class="btn btn-secondary" @click="closeModal()" type="button">
            Cancelar
          </button>
        </div>
      </Form>
    </Modal>
    <Modal
      title="INFORMACION DE LA CARRERA"
      :show="open_v"
      @update:show="closeModal"
      size="modal"
    >
      <div class="container">
        <div class="row">
          <div class="form-group col-12">
            <label class="tx-gray-600">Nombre de la carrera</label>
            <h6 class="mb-0">{{ data.nombre }}</h6>
          </div>
          <div class="form-group col-6">
            <label class="tx-gray-600">Carga horaria</label>
            <h6 class="mb-0">{{ data.carga_horaria }} Horas</h6>
          </div>
          <div class="form-group col-6">
            <label class="tx-gray-600">Tiempo de estudio</label>
            <h6 class="mb-0">{{ data.tiempo_estudio }} Años</h6>
          </div>
          <div class="form-group col-6">
            <label class="tx-gray-600">Nivel de formacion</label>
            <h6 class="mb-0">{{ data.nivel }}</h6>
          </div>
          <div class="form-group col-6">
            <label class="tx-gray-600">Regimen de estudio</label>
            <h6 class="mb-0">{{ data.regimen_estudio }}</h6>
          </div>
          <div class="form-group col-12">
            <label class="tx-gray-600">Area de estudio</label>
            <h6 class="mb-0">{{ data.area }}</h6>
          </div>
          <div class="form-group col-12">
            <label class="tx-gray-600">Denominacion de titulo</label>
            <h6 class="mb-0">{{ data.denominacion_titulo }}</h6>
          </div>
        </div>
        <hr />
        <div class="form-group text-center mb-0">
          <button
            class="btn ripple btn-secondary"
            type="button"
            @click="closeModal"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
    <Alert
      :show="open_a.open"
      :type="open_a.type"
      @update:show="closeModal"
      @submit-alert="onChangeStatus"
      :loading="loading"
    ></Alert>
  </div>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import { useCarrera, carreraServices } from "../composables";
const {
  data,
  areas,
  niveles,
  open,
  open_a,
  open_v,
  listFiltered,
  search,
  loading,
  schema,
  openModal,
  openViewModal,
  openAlert,
  closeModal,
  onSubmit,
  onChangeStatus,
} = useCarrera(carreraServices);
</script>
