<template>
  <div v-if="loading">
    <img src="/src/assets/img/loader-2.svg" class="loader-img" alt="Loader" />
  </div>
  <div class="my-auto page page-h">
    <div class="my-auto page page-h">
      <div class="main-signin-wrapper error-wrapper">
        <div class="main-card-signin d-md-flex wd-100p">
          <div class="wd-md-50p login d-none d-md-block page-signin-style p-5 text-white">
            <div class="my-auto authentication-pages">
              <div>
                <img src="/src/assets/img/brand/completo-logo.png" class=" m-0 mb-2" alt="logo">
                <p class="mb-5 text-justify">
                  La plataforma SAN ANDRES, es una plataforma que brinda a los estudiantes y personal administrativo del
                  instituto "San Andres" una mejor administracion de los datos que maneja la institucion. <br>
                  Ofreciendo la mejor tecnologia y facil manejo a todos sus usuarios.
                </p>
              </div>
            </div>
          </div>
          <div class="p-5 wd-md-50p">
            <div class="main-signin-header">
              <h2>Bienvenido!</h2>
              <h4>Porfavor inicia sesion para continuar</h4>
              <div class="alert alert-danger mb-2" v-if="invalid">
                {{ invalid }}
              </div>
              <div class="alert alert-success mb-2" v-if="success">
                {{ success }}
              </div>
              <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
                <div class="form-group">
                  <label>Matricula</label>
                  <Field name="login" type="text" class="form-control"
                    :class=" errors.login || invalid ? 'parsley-error': success? 'parsley-success':''"
                    placeholder="Ingrese su matricula" v-model="login" />
                  <div class="parsley-errors-list">
                    {{errors.login}}
                  </div>
                </div>
                <div class="form-group">
                  <label>Contraseña</label>
                  <Field name="password" type="password" class="form-control"
                    :class="errors.password || invalid ? 'parsley-error': success? 'parsley-success':''"
                    placeholder="Ingrese su contraseña" v-model="password" />
                  <div class="parsley-errors-list">
                    {{errors.password}}
                  </div>
                </div>
                <button class="btn btn-main-primary btn-block" type="submit" :disabled="loading">
                  <div class="spinner-border spinner-border-sm" role="status" v-if="loading">
                  </div> Ingresar
                </button>
              </Form>
            </div>
            <div class="main-signin-footer mt-3 mg-t-5">
              <p><a href="/">Olvidaste tu contraseña?</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form, Field } from "vee-validate";

import { loginComposable } from '../composables'

const { login, password, schema, invalid, success, loading, onSubmit } = loginComposable()
 
</script>

<style lang="scss" scoped>
</style>
