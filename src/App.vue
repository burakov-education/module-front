<script setup>
import {RouterLink, RouterView, useRouter} from 'vue-router'
import {provide, ref} from "vue";

const token = ref(null)
const router = useRouter()

const updateToken = (newToken) => {
  localStorage.setItem('token', newToken)
  token.value = newToken
}

const logout = async () => {
  updateToken('')

  await router.push('/')
}

updateToken(localStorage.getItem('token'))

provide('token', token)
provide('updateToken', updateToken)
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <RouterLink to="/" class="navbar-brand">Объявления</RouterLink>
    <div class="ms-auto" v-if="!token">
      <RouterLink to="/login" class="btn btn-outline-light me-2">Войти</RouterLink>
      <RouterLink to="/registration" class="btn btn-outline-light">Регистрация</RouterLink>
    </div>
    <div class="ms-auto" v-else>
      <RouterLink to="/my" class="btn btn-outline-light me-2">Мои объявления</RouterLink>
      <RouterLink to="/create" class="btn btn-outline-light me-2">Создать объявление</RouterLink>
      <a href="#" @click.prevent="logout" class="btn btn-outline-light me-2">Выйти</a>
    </div>
  </nav>

  <RouterView />
</template>
