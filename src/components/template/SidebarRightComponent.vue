<template>
    <!-- Sidebar-right-->
    <div class="sidebar sidebar-right sidebar-animate">
        <div class="panel panel-primary card mb-0 box-shadow">
            <div class="tab-menu-heading border-0 p-3">
                <div class="card-title mb-0">Notifications</div>
                <div class="card-options ml-auto">
                    <a href="#" class="sidebar-remove"><i class="fe fe-x"></i></a>
                </div>
            </div>
            <div class="panel-body tabs-menu-body latest-tasks p-0 border-0">
                <div class="tabs-menu border-bottom">
                    <!-- Tabs -->
                    <ul class="nav panel-tabs text-center">
                        <li class="">
                            <a href="#side1" class="active" data-toggle="tab"><i class="fe fe-user mr-1"></i>
                                Profile</a>
                        </li>
                        <li>
                            <a href="#side2" data-toggle="tab"><i class="fe fe-users mr-1"></i> Contacts</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content">
                    <div class="tab-pane active" id="side1">
                        <div class="card-body text-center">
                            <div class="dropdown user-pro-body">
                                <div class="">
                                    <img alt="user-img" class="avatar avatar-xl brround mx-auto text-center"
                                        :src="'/src/assets/img/faces/6.jpg'" /><span
                                        class="avatar-status profile-status bg-green"></span>
                                </div>
                                <div class="user-info mg-t-20">
                                    <h6 class="font-weight-semibold mt-2 mb-0">
                                        Mintrona Pechon
                                    </h6>
                                    <span class="mb-0 text-muted">Premium Member</span>
                                </div>
                            </div>
                        </div>
                        <a class="dropdown-item d-flex pd-y-15 border-bottom border-top" href="#">
                            <div class="d-flex">
                                <i class="far fa-user mr-3 tx-20 mg-t-5 text-muted"></i>
                                <div>
                                    <h6 class="mb-0">Mi Perfil</h6>
                                    <p class="tx-12 mb-0 text-muted">
                                        Informacion persona del perfil
                                    </p>
                                </div>
                            </div>
                            <div class="ml-auto mg-t-8">
                                <i class="fe fe-chevron-right"></i>
                            </div>
                        </a>
                        <a class="dropdown-item d-flex pd-y-15 border-bottom" href="#">
                            <div class="d-flex">
                                <i class="fas fa-sliders-h mr-3 tx-20 mg-t-5 text-muted"></i>
                                <div>
                                    <h6 class="mb-0">Configuracion de la cuenta</h6>
                                    <p class="tx-12 mb-0 text-muted">Informacion de la cuenta</p>
                                </div>
                            </div>
                            <div class="ml-auto mg-t-8">
                                <i class="fe fe-chevron-right"></i>
                            </div>
                        </a>
                        <a class="dropdown-item d-flex pd-y-15 border-bottom" href="javascript:void(0)"
                            @click.prevent="onLogout">
                            <div class="d-flex">
                                <i class="fas fa-sign-out-alt mr-3 tx-20 mg-t-5 text-muted"></i>
                                <div>
                                    <h6 class="mb-0">Cerrar sesión</h6>
                                    <p class="tx-12 mb-0 text-muted">Salir del sistema</p>
                                </div>
                            </div>
                            <div class="ml-auto mg-t-8">
                                <i class="fe fe-chevron-right"></i>
                            </div>
                        </a>
                    </div>
                    <div class="tab-pane" id="side2">
                        <div class="list-group list-group-flush">
                            <div class="list-group-item d-flex align-items-center">
                                <div class="mr-2">
                                    <span class="avatar avatar-md brround cover-image"
                                        data-image-src="/src/assets/img/faces/6.jpg"><span
                                            class="avatar-status bg-success"></span></span>
                                </div>
                                <div class="">
                                    <div class="font-weight-semibold" data-toggle="modal" data-target="#chatmodel">
                                        Mozelle Belt
                                    </div>
                                    <p class="mb-0 tx-12 text-muted">mozellebelt@gmail.com</p>
                                </div>
                                <div class="ml-auto">
                                    <a href="#" class="btn btn-sm btn-light" data-toggle="modal"
                                        data-target="#chatmodel"><i class="fab fa-facebook-messenger"></i></a>
                                </div>
                            </div>
                            <div class="list-group-item d-flex align-items-center">
                                <div class="mr-2">
                                    <span class="avatar avatar-md brround cover-image"
                                        data-image-src="assets/img/faces/11.jpg"></span>
                                </div>
                                <div class="">
                                    <div class="font-weight-semibold" data-toggle="modal" data-target="#chatmodel">
                                        Florinda Carasco
                                    </div>
                                    <p class="mb-0 tx-12 text-muted">florindacarasco@gmail.com</p>
                                </div>
                                <div class="ml-auto">
                                    <a href="#" class="btn btn-sm btn-light" data-toggle="modal"
                                        data-target="#chatmodel"><i class="fab fa-facebook-messenger"></i></a>
                                </div>
                            </div>
                            <div class="list-group-item d-flex align-items-center">
                                <div class="mr-2">
                                    <span class="avatar avatar-md brround cover-image"
                                        data-image-src="assets/img/faces/10.jpg"><span
                                            class="avatar-status bg-success"></span></span>
                                </div>
                                <div class="">
                                    <div class="font-weight-semibold" data-toggle="modal" data-target="#chatmodel">
                                        Alina Bernier
                                    </div>
                                    <p class="mb-0 tx-12 text-muted">alinaaernier@gmail.com</p>
                                </div>
                                <div class="ml-auto">
                                    <a href="#" class="btn btn-sm btn-light" data-toggle="modal"
                                        data-target="#chatmodel"><i class="fab fa-facebook-messenger"></i></a>
                                </div>
                            </div>
                            <div class="list-group-item d-flex align-items-center">
                                <div class="mr-2">
                                    <span class="avatar avatar-md brround cover-image"
                                        data-image-src="assets/img/faces/2.jpg"><span
                                            class="avatar-status bg-success"></span></span>
                                </div>
                                <div class="">
                                    <div class="font-weight-semibold" data-toggle="modal" data-target="#chatmodel">
                                        Zula Mclaughin
                                    </div>
                                    <p class="mb-0 tx-12 text-muted">zulamclaughin@gmail.com</p>
                                </div>
                                <div class="ml-auto">
                                    <a href="#" class="btn btn-sm btn-light" data-toggle="modal"
                                        data-target="#chatmodel"><i class="fab fa-facebook-messenger"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--/Sidebar-right-->
</template>
<script setup>
import { useLogin } from '../../composables';
const { onLogout } = useLogin();
</script>