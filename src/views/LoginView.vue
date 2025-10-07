<script setup>
import {inject, ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";
import InvalidFeedback from "@/components/InvalidFeedback.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const form = ref({
  data: {
    email: '',
    password: '',
  },
  errors: {},
  isSending: false,
})
const updateToken = inject('updateToken')

const sendForm = async () => {
  if (form.value.isSending) return;

  form.value.isSending = true

  form.value.errors = {}

  const result = await apiFetch('post', '/authorization', form.value.data)

  if (result.errors) {
    form.value.errors = result.errors
  } else if(result.token) {
    updateToken(result.token)
    await router.push('/')
  }

  form.value.isSending = false
}
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow p-4" style="max-width: 450px; width: 100%;">
      <h4 class="mb-4 text-center">Авторизация</h4>
      <form @submit.prevent="sendForm()" novalidate>
        <div class="mb-3">
          <label>Email</label>
          <input type="email" class="form-control" :class="{'is-invalid': form.errors?.email}" v-model="form.data.email" required="">
          <InvalidFeedback :errors="form.errors?.email" />
        </div>
        <div class="mb-3">
          <label>Пароль</label>
          <input type="password" class="form-control" :class="{'is-invalid': form.errors?.password}" v-model="form.data.password" required="">
          <InvalidFeedback :errors="form.errors?.password" />
        </div>
        <button type="submit" :disabled="form.isSending" class="btn btn-primary w-100">Авторизоваться</button>
        <div class="text-center mt-3">
          <RouterLink to="/registration">Нет аккаунта? Зарегистрироваться</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
