<template>
    <!--Horizontal-main -->
    <div class="sticky">
        <div class="horizontal-main hor-menu clearfix">
            <div class="horizontal-mainwrapper container clearfix">
                <!--Nav-->
                <nav class="horizontalMenu clearfix">
                    <ul class="horizontalMenu-list">
                        <li>
                            <router-link class="" to="/">
                                <div class="side-angle1"></div>
                                <div class="side-angle2"></div>
                                <div class="side-arrow"></div>
                                <i class="fa fa-home"></i>
                                Dashboard
                            </router-link>
                        </li>

                        <li>
                            <a class="sub-icon pointer">
                                <div class="side-angle1"></div>
                                <div class="side-angle2"></div>
                                <div class="side-arrow"></div>
                                <i class="fa fa-desktop"></i>
                                Administracion <i class="fe fe-chevron-down horizontal-icon"></i>
                            </a>
                            <ul class="sub-menu">
                                <li>
                                    <router-link :to="{ name:'area' }" class="slide-item">Areas</router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name:'carrera' }" class="slide-item">Carreras</router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name:'materia' }" class="slide-item">Materias</router-link>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </nav>
                <!--Nav-->
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue-demi";


    const menus = ref([
        { id: 1, nombre: 'Dashboard', icon:'fa fa-home'},
        { id: 1, nombre: 'Dashboard', icon: 'fa fa-home' },
        { id: 1, nombre: 'Dashboard', icon: 'fa fa-home' },
        { id: 1, nombre: 'Dashboard', icon: 'fa fa-home' },
    ])

</script>
<style scoped>
.horizontalMenu-list li a {
    display: flex;
    align-items: center;
}

.pointer {
    cursor: pointer;
}
</style>