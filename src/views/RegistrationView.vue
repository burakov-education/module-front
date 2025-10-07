<script setup>
import {ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";
import InvalidFeedback from "@/components/InvalidFeedback.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const form = ref({
  data: {
    name: '',
    email: '',
    password: '',
  },
  errors: {},
  isSending: false,
})

const sendForm = async () => {
  if (form.value.isSending) return;

  form.value.isSending = true

  form.value.errors = {}

  const result = await apiFetch('post', '/registration', form.value.data)

  if (result.errors) {
    form.value.errors = result.errors
  } else {
    await router.push('/login')
  }

  form.value.isSending = false
}
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow p-4" style="max-width: 450px; width: 100%;">
      <h4 class="mb-4 text-center">Регистрация</h4>
      <form @submit.prevent="sendForm()" novalidate>
        <div class="mb-3">
          <label>Имя</label>
          <input type="text" class="form-control" :class="{'is-invalid': form.errors?.name}" v-model="form.data.name" required="">
          <InvalidFeedback :errors="form.errors?.name" />
        </div>
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
        <button type="submit" :disabled="form.isSending" class="btn btn-success w-100">Зарегистрироваться</button>
        <div class="text-center mt-3">
          <RouterLink to="/login">Уже есть аккаунт? Войти</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
