<template>
    <!-- main-header opened -->
    <div class="main-header nav nav-item hor-header">
        <div class="container">
            <div class="main-header-left">
                <a class="animated-arrow hor-toggle horizontal-navtoggle"><span></span></a>
                <router-link class="header-brand" to="/">
                    <img src="/src/assets/img/brand/completo-logo.jpg" class="desktop-logo logo-color1" alt="img">
                    <img src="/src/assets/img/brand/logo-white.png" class="desktop-dark" alt="img">
                    <img src="/src/assets/img/brand/sa-logo.jpg" class="desktop-logo-1 logo-color1" alt="img">
                </router-link>
            </div>
            <!-- search -->
            <div class="main-header-right">
                <div class="nav nav-item navbar-nav-right ml-auto">
                    <div class="nav-link" id="bs-example-navbar-collapse-1">
                        <form class="navbar-form" role="search">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search" />
                                <span class="input-group-btn">
                                    <button type="reset" class="btn btn-default">
                                        <i class="fas fa-times"></i>
                                    </button>
                                    <button type="submit" class="btn btn-default nav-link resp-btn">
                                        <i class="fe fe-search"></i>
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                    <div class="main-header-search ml-0 d-sm-none d-none d-lg-block">
                        <input class="form-control shadow" id="search-input" placeholder="Search for anything..."
                            type="text" />
                        <button class="btn">
                            <i class="fas fa-search d-none d-md-block"></i>
                        </button>
                    </div>
                    <div class="dropdown nav-item main-header-notification">
                        <a class="new nav-link" href="#"><i class="fe fe-bell"></i><span class="pulse"></span></a>
                        <div class="dropdown-menu">
                            <div class="menu-header-content bg-primary text-left d-flex">
                                <div class="">
                                    <h6 class="menu-header-title text-white mb-0">
                                        7 new Notifications
                                    </h6>
                                </div>
                            </div>
                            <div class="main-notification-list Notification-scroll ps">
                                <a class="d-flex p-3 border-bottom" href="#">
                                    <div class="notifyimg bg-success-transparent">
                                        <i class="la la-shopping-basket text-success"></i>
                                    </div>
                                    <div class="ml-3">
                                        <h5 class="notification-label mb-1">New Order Received</h5>
                                        <div class="notification-subtext">1 hour ago</div>
                                    </div>
                                    <div class="ml-auto">
                                        <i class="las la-angle-right text-right text-muted"></i>
                                    </div>
                                </a>
                                <a class="d-flex p-3 border-bottom" href="#">
                                    <div class="notifyimg bg-danger-transparent">
                                        <i class="la la-user-check text-danger"></i>
                                    </div>
                                    <div class="ml-3">
                                        <h5 class="notification-label mb-1">
                                            22 verified registrations
                                        </h5>
                                        <div class="notification-subtext">2 hour ago</div>
                                    </div>
                                    <div class="ml-auto">
                                        <i class="las la-angle-right text-right text-muted"></i>
                                    </div>
                                </a>
                                <div class="dropdown-footer">
                                    <a href="#">VER TODOS</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dropdown main-profile-menu nav nav-item nav-link">
                        <a class="profile-user d-flex" href="javascript:void(0)"><img alt="" :src="user.avatar" />
                            <div class="p-text d-none">
                                <span class="p-name font-weight-bold">{{ user.user}}</span>
                                <small class="p-sub-text">{{ user.rol }}</small>
                            </div>
                        </a>
                        <div class="dropdown-menu">
                            <div class="main-header-profile header-img">
                                <div class="main-img-user">
                                    <img alt="" :src="user.avatar" />
                                </div>
                                <h6>{{ user.user}} </h6>
                                <span>{{ user.rol }}</span>
                            </div>
                            <a class="dropdown-item" href="#"><i class="far fa-user"></i> Mi Perfil</a>
                            <a class="dropdown-item" href="#"><i class="fas fa-sliders-h"></i> Configuracion de la
                                cuenta</a>
                            <button class="dropdown-item" @click.prevent="onLogout"><i class="fas fa-sign-out-alt"></i>
                                Salir</button>
                        </div>
                    </div>
                    <div class="dropdown main-header-message right-toggle">
                        <a class="nav-link pr-0" data-toggle="sidebar-right" data-target=".sidebar-right">
                            <i class="fa fa-bars tx-20 bg-transparent"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- main-header closed -->
</template>
<script setup>
import { ref } from 'vue';
import { loginComposable } from '../../composables';
const { onLogout,user } = loginComposable();
</script>