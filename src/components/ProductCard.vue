<script setup>
defineProps({
  product: Object,
})
</script>

<template>
  <div class="col-md-6">
    <div class="card h-100">
      <img :src="product.image_url" class="card-img-top" alt="Объявление">
      <div class="card-body">
        <h5 class="card-title">{{ product.title }}</h5>
        <p class="card-text">{{ product.description }}</p>
        <p class="fw-bold">Цена: {{ product.price }} ₽</p>

        <slot />
      </div>
    </div>
  </div>
</template>