<script setup>
import {inject, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import apiFetch from "@/helpers/apiFetch.js";

const route = useRoute()
const product = ref(null)
const isContactShow = ref(false)
const myProductIds = ref([])
const token = inject('token')

onMounted(async () => {
  const result = await apiFetch('get', `/products/${route.params.product_id}`)

  product.value = result.data

  if (token.value) {
    const myResult = await apiFetch('get', '/my-products', null, token.value)

    myResult.data.forEach(myProduct => {
      myProductIds.value.push(myProduct.id)
    })
  }
})
</script>

<template>
  <div class="container mt-4" v-if="product">
    <h1 class="mb-4">Title</h1>

    <div class="card h-100">
      <img :src="product.image_url" style="width: 400px;" class="card-img-top" alt="Объявление">
      <div class="card-body">
        <h5 class="card-title">{{ product.title }}</h5>
        <p class="card-text">{{ product.description }}</p>
        <p class="fw-bold">Цена: {{ product.price }} ₽</p>

        <h6>Контакт автора</h6>
        <button class="btn btn-sm btn-primary" @click="isContactShow = !isContactShow">
          <template v-if="!isContactShow">
            Получить контакт
          </template>
          <template v-else>
            Спрятать контакт
          </template>
        </button>
        <div v-if="isContactShow">{{ product.author.email }}</div>

        <br>

        <h6>Характеристики</h6>
        <ul v-if="product.characteristics">
          <li v-for="item in product.characteristics">
            <b>{{ item.title }} ({{ item.type }}): </b>
            <template v-if="item.type === 'number'">{{ item.number_value }}</template>
            <template v-else>{{ item.checkbox_values.join(', ') }}</template>
          </li>
        </ul>
        <div v-else>Отсутствуют</div>

        <br>
        <br>

        <template v-if="myProductIds.includes(product.id)">
          <RouterLink :to="`/edit/${product.id}`" class="btn btn-outline-primary btn-sm">Редактировать</RouterLink>
        </template>
        <div v-else>
          Данное объявление вам не принадлежит
        </div>
      </div>
    </div>

  </div>
</template>
