<template>
    <div class="container-fluid mg-t-20">

        <div class="row">
            <div class="loading-container " v-if="loading" style="height: 300px;">
                <img src="/src/assets/img/loader-2.svg" class="loader-img" alt="Loader" />
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12"
                v-for="{ carrera_id, nivel_formacion, nombre, materias }, index in carreras" :key="index">

                <router-link :to="{ name: 'materia-add', params: { id: carrera_id } }">
                    <div class="card">
                        <div class="card-body carreras">
                            <h5>{{ nombre }}</h5>
                            <p>Nivel formacion : {{ nivel_formacion }}</p>
                            <div class="tx-gray-700">
                                Materias: {{ materias.length }} registradas
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>

        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useMateria, materiaServices } from '../../composables'
const { carreras, loading } = useMateria(materiaServices);
const { listCarrerasActivas } = materiaServices()
onMounted(async () => {
    loading.value = true
    carreras.value = await listCarrerasActivas();
    loading.value = false
})

</script>
<style scoped>
.card-body.carreras {
    background-image: url('/src/assets/img/fondo.png') !important;
    background-repeat: no-repeat;
    background-size: 300px;
    background-position: right;
    border-radius: 10px;
}
</style>
