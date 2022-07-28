<template>
  <div class="row pb-3">
    <div class="col-sm-12">
      <span>PLAN DE ESTUDIO :</span>
      <div class="form-group d-inline-block mb-0 mr-2">
        <span
          class="spinner-border spinner-border-sm mx-2"
          role="status"
          v-if="planes.length == 0"
        ></span>
        <select class="form-control" v-model="plan" v-else>
          <option
            :value="plan_id"
            v-for="({ plan, plan_id }, index) in planes"
            :key="index"
          >
            {{ plan }}
          </option>
        </select>
      </div>
      <button class="btn btn-success float-right" @click="openModal(0)">
        <i class="fa fa-plus"></i> Agregar
      </button>
    </div>
  </div>
  <div v-if="loading" class="text-center">
    <div class="spinner-border" role="status" style="width: 3rem; height: 3rem">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <div v-else>
    <div
      aria-multiselectable="true"
      class="accordion accordion-primary"
      id="accordion3"
      role="tablist"
      v-if="listFiltered.length > 0"
    >
      <div class="card mb-0">
        <div class="card-header" id="headingOne3" role="tab">
          <a
            aria-controls="collapseOne3"
            aria-expanded="false"
            data-toggle="collapse"
            href="#collapseOne3"
          >
            PRIMER AÑO
          </a>
        </div>
        <div
          aria-labelledby="headingOne3"
          class="collapse show"
          data-parent="#accordion3"
          id="collapseOne3"
          role="tabpanel"
        >
          <div class="card-body p-3">
            <div
              class=""
              v-for="(
                { sigla, nombre, prerequisito, estado, horas, nivel }, index
              ) in listFiltered"
              :key="sigla"
            >
              <div
                class="card border bd-success shadow-3 overflow-hidden mb-2"
                v-if="nivel == 1"
              >
                <div class="card-body p-3">
                  <div class="d-flex align-items-center mt-auto">
                    <div>
                      <h6>
                        <span class="text-info"> {{ sigla }} </span> |
                        {{ nombre }}
                      </h6>
                      <span class="d-block text-muted tx-12 tx-bold"
                        >Horas: {{ horas }} | Plan : {{ plan.plan }} |
                        <span class="text-danger" v-if="prerequisito"
                          >requiere: {{ prerequisito }}
                        </span>
                      </span>
                    </div>
                    <div class="ml-auto life">
                      <i
                        class="boton fe fe-edit tx-primary"
                        @click="openModal(sigla)"
                        v-if="estado == true"
                      ></i>
                      <i
                        class="boton fe mg-l-10"
                        :class="
                          estado
                            ? 'fe-arrow-down tx-danger'
                            : 'fe-arrow-up tx-success'
                        "
                        @click="
                          estado
                            ? openAlert(index, sigla, false)
                            : openAlert(index, sigla, true)
                        "
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card mb-0">
        <div class="card-header" id="headingTwo3" role="tab">
          <a
            aria-controls="collapseTwo3"
            aria-expanded="true"
            class="collapsed"
            data-toggle="collapse"
            href="#collapseTwo3"
            >SEGUNDO AÑO</a
          >
        </div>
        <div
          aria-labelledby="headingTwo3"
          class="collapse"
          data-parent="#accordion3"
          id="collapseTwo3"
          role="tabpanel"
        >
          <div class="card-body">
            <div
              class=""
              v-for="(
                { sigla, nombre, prerequisito, estado, horas, nivel }, index
              ) in listFiltered"
              :key="sigla"
            >
              <div
                class="card border bd-primary shadow-3 overflow-hidden mb-2"
                v-if="nivel == 2"
              >
                <div class="card-body p-3">
                  <div class="d-flex align-items-center mt-auto">
                    <div>
                      <h6>
                        <span class="text-info"> {{ sigla }} </span> |
                        {{ nombre }}
                      </h6>
                      <span class="d-block text-muted tx-12 tx-bold"
                        >Horas: {{ horas }} | Plan : {{ plan.plan }} |
                        <span class="text-danger" v-if="prerequisito"
                          >requiere: {{ prerequisito }}
                        </span>
                      </span>
                    </div>
                    <div class="ml-auto life">
                      <i
                        class="boton fe fe-edit tx-primary"
                        @click="openModal(sigla)"
                        v-if="estado == true"
                      ></i>
                      <i
                        class="boton fe mg-l-10"
                        :class="
                          estado
                            ? 'fe-arrow-down tx-danger'
                            : 'fe-arrow-up tx-success'
                        "
                        @click="
                          estado
                            ? openAlert(index, sigla, false)
                            : openAlert(index, sigla, true)
                        "
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card mb-0">
        <div class="card-header" id="headingThree3" role="tab">
          <a
            aria-controls="collapseThree2"
            aria-expanded="false"
            class="collapsed"
            data-toggle="collapse"
            href="#collapseThree3"
            >TERCER AÑO</a
          >
        </div>
        <div
          aria-labelledby="headingThree3"
          class="collapse"
          data-parent="#accordion3"
          id="collapseThree3"
          role="tabpanel"
        >
          <div class="card-body">
            <div
              class=""
              v-for="(
                { sigla, nombre, prerequisito, estado, horas, nivel }, index
              ) in listFiltered"
              :key="sigla"
            >
              <div
                class="card border bd-danger shadow-3 overflow-hidden mb-2"
                v-if="nivel == 3"
              >
                <div class="card-body p-3">
                  <div class="d-flex align-items-center mt-auto">
                    <div>
                      <h6>
                        <span class="text-info"> {{ sigla }} </span> |
                        {{ nombre }}
                      </h6>
                      <span class="d-block text-muted tx-12 tx-bold"
                        >Horas: {{ horas }} | Plan : {{ plan.plan }} |
                        <span class="text-danger" v-if="prerequisito"
                          >requiere: {{ prerequisito }}
                        </span>
                      </span>
                    </div>
                    <div class="ml-auto life">
                      <i
                        class="boton fe fe-edit tx-primary"
                        @click="openModal(sigla)"
                        v-if="estado == true"
                      ></i>
                      <i
                        class="boton fe mg-l-10"
                        :class="
                          estado
                            ? 'fe-arrow-down tx-danger'
                            : 'fe-arrow-up tx-success'
                        "
                        @click="
                          estado
                            ? openAlert(index, sigla, false)
                            : openAlert(index, sigla, true)
                        "
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- collapse -->
      </div>
    </div>
    <div class="card" v-else>
      <div class="card-body text-center">Sin registros que mostrar...</div>
    </div>
  </div>
  <Modal
    :title="data.id ? 'MODIFICAR MATERIA' : 'AGREGAR MATERIA'"
    :show="open"
    @update:show="closeModal"
    size="modal-lg"
    :loading="loadingModal"
  >
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
      <Field type="hidden" name="id" v-model="data.id" />
      <Field type="hidden" name="carrera_id" v-model="data.carrera_id" />
      <Field type="hidden" name="plan_id" v-model="data.plan_id" />
      <div class="row">
        <div class="form-group col-12" v-if="horas_excedidas">
          <div class="alert alert-danger mb-0">
            <strong>Alerta!</strong> Este nivel esta excediendo las horas
            permitidas.
          </div>
        </div>

        <div class="form-group col-6">
          <label for="">Nivel (AÑO) <span class="text-danger">*</span></label>
          <Field
            as="select"
            name="nivel"
            class="form-control"
            v-model="data.nivel"
            @change="getMateriasBylvl"
            :class="errors.nivel ? 'is-invalid' : ''"
          >
            <option :value="0">Seleccione el nivel</option>
            <option :value="1">Primer año</option>
            <option :value="2">Segundo año</option>
            <option :value="3">Tercer año</option>
          </Field>
          <div class="parsley-errors-list">
            {{ errors.nivel }}
          </div>
        </div>
        <div class="form-group col-6">
          <label>Plan de Estudios </label>
          <h1 class="mb-0">
            {{ planes.find((el) => el.plan_id == plan).plan }}
          </h1>
        </div>
        <div class="form-group col-6">
          <label>SIGLA <span class="text-danger">*</span></label>
          <Field
            name="sigla"
            type="text"
            class="form-control"
            :class="errors.sigla ? 'parsley-error' : ''"
            placeholder="Ingrese la sigla"
            v-model="data.sigla"
          />
          <div class="parsley-errors-list">
            {{ errors.sigla }}
          </div>
        </div>
        <div class="form-group col-6">
          <label>HORAS <span class="text-danger">*</span></label>
          <Field
            as="select"
            name="horas"
            class="form-control"
            :class="errors.horas ? 'is-invalid' : ''"
            placeholder="Ingrese las horas"
            v-model="data.horas"
          >
            <option :value="2">2 horas</option>
            <option :value="4">4 horas</option>
            <option :value="6">6 horas</option>
          </Field>
          <div class="parsley-errors-list">
            {{ errors.horas }}
          </div>
        </div>
        <div class="form-group col-12">
          <label>Nombre de la materia <span class="text-danger">*</span></label>
          <Field
            name="nombre"
            type="text"
            class="form-control"
            :class="errors.nombre ? 'parsley-error' : ''"
            placeholder="Ingrese el nombre de la materia"
            v-model="data.nombre"
          />
          <div class="parsley-errors-list">
            {{ errors.nombre }}
          </div>
        </div>
        <div class="form-group col-12" v-if="data.nivel > 1">
          <label>Prerequisito de la materia </label>
          <Field
            as="select"
            name="prerequisito"
            class="form-control"
            :class="errors.prerequisito ? 'is-invalid' : ''"
            placeholder=""
            v-model="data.prerequisito"
          >
            <option value="">Ninguno</option>
            <option v-for="item in materias" :value="sigla" :key="item.sigla">
              {{ sigla }} | {{ nombre }}
            </option>
          </Field>
          <div class="parsley-errors-list">
            {{ errors.prerequisito }}
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
  <Alert
    :show="open_a.open"
    :type="open_a.type"
    @update:show="closeModal"
    @submit-alert="onChangeStatus"
    :loading="loading"
  ></Alert>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import { useMateria, materiaServices } from "../../composables";

const {
  listFiltered,
  planes,
  plan,
  horas_excedidas,
  materias,
  loading,
  loadingModal,
  data,
  open,
  open_a,
  schema,
  openAlert,
  openModal,
  closeModal,
  onSubmit,
  getMateriasBylvl,
  onChangeStatus,
} = useMateria(materiaServices);
</script>

<style scoped>
@media screen and (min-width: 601px) {
  h3 {
    font-size: 1.5em;
  }
}

.boton {
  cursor: pointer;
}

.accordion-dark {
  background-color: #404980;
}

.life {
  text-align: right;
  width: 10rem;
}

.life i {
  margin-left: 1rem;
  font-size: 1rem;
}
</style>
