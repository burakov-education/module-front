<script setup>
defineProps({
  errors: Array,
})
</script>

<template>
  <span style="font-size: 10px;" class="invalid-feedback" v-if="errors" v-html="errors?.join('<br>')"></span>
</template>
