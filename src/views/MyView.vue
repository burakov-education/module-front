<script setup>
import {inject, onMounted, ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";
import ProductCard from "@/components/ProductCard.vue";

const token = inject('token')
const products = ref([])
const isLoaded = ref(false)

const updateProducts = async () => {
  const result = await apiFetch('get', '/my-products', null, token.value)

  products.value = result.data
}

onMounted(async () => {
  await updateProducts()

  isLoaded.value = true
})

const deleteAds = async (id) => {
  await apiFetch('delete', `/products/${id}`, null, token.value)

  await updateProducts()

  productForDelete.value = false
}

const productForDelete = ref(false)
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Мои объявления</h2>

    <div class="row g-3" v-if="isLoaded">

      <ProductCard v-for="product in products" :product="product">
        <div class="d-flex justify-content-between">
          <RouterLink :to="`/edit/${product.id}`" class="btn btn-outline-primary btn-sm">Редактировать</RouterLink>
          <button @click.prevent="productForDelete = product" class="btn btn-outline-danger btn-sm">Удалить</button>
        </div>
      </ProductCard>

    </div>

    <div v-if="productForDelete" class="delete-modal">
      <div class="delete-modal-container">
        <h2>Удалить?</h2>
        <button class="btn btn-danger" @click.prevent="deleteAds(productForDelete.id)">Да</button> <button @click.prevent="productForDelete = false" class="btn btn-primary">Нет</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.delete-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background-color: rgba(0,0,0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.delete-modal-container {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  color: black;
  flex-basis: 30%;
}
</style>
