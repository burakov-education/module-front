<script setup>
defineProps({
  errors: Array,
})
</script>

<template>
  <span class="invalid-feedback" v-if="errors" v-html="errors?.join('<br>')"></span>
</template>
