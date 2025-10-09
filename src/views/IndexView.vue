<script setup>
import {computed, onMounted, ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";
import ProductCard from "@/components/ProductCard.vue";

const products = ref([])
const isLoaded = ref(false)
const filters = ref([])
const isFilterTouched = ref(false)
const sort = ref({
  column: 'date',
  type: 'desc',
})

const clearFilters = () => {
  isFilterTouched.value = false
  filters.value = []

  products.value.forEach(product => {
    if (product.characteristics) {
      product.characteristics.forEach(item => {
        const filter = filters.value.find(f => f.title === item.title && f.type === item.type)

        if (filter) {
          if (item.type === 'number') {
            if (item.number_value > filter.maxValue) {
              filter.maxValue = item.number_value
            }
            if (item.number_value < filter.minValue) {
              filter.minValue = item.number_value
            }
          } else {
            item.checkbox_values.forEach(value => {
              if (!filter.values.includes(value)) {
                filter.values.push(value)
                filter.selectedValues.push(value)
              }
            })
          }
        } else {
          const filter = {
            title: item.title,
            type: item.type,
            isOk: true,
          }

          if (item.type === 'number') {
            filter.maxValue = item.number_value
            filter.minValue = item.number_value
          } else {
            filter.values = Object.assign([], item.checkbox_values)
            filter.selectedValues = Object.assign([], item.checkbox_values)
          }

          filters.value.push(filter)
        }
      })
    }
  })
}

onMounted(async () => {
  const result = await apiFetch('get', '/products')

  products.value = result.data

  isLoaded.value = true

  clearFilters()
})

const changeCheckboxFilter = (filter, value) => {
  isFilterTouched.value = true

  if (filter.selectedValues.includes(value)) {
    const index = filter.selectedValues.indexOf(value)
    filter.selectedValues.splice(index, 1)
  } else {
    filter.selectedValues.push(value)
  }
}

const filteredProducts = computed(() => {
  if (!isFilterTouched.value) {
    return products.value
  }

  return products.value.filter(product => {
    for (const filter of filters.value) {
      const productFilter = product.characteristics?.find(item => item.type === filter.type && item.title === filter.title)

      if (!productFilter) {
        return false;
      }

      if (filter.type === 'number') {
        if (productFilter.number_value > filter.maxValue || productFilter.number_value < filter.minValue) {
          filter.isOk = false
        } else {
          filter.isOk = true
        }
      }

      if (filter.type === 'checkbox') {
        filter.isOk = false

        for (const value of filter.selectedValues) {
          if (productFilter.checkbox_values.includes(value)) {
            filter.isOk = true
          }
        }
      }
    }

    return filters.value.filter(f => f.isOk).length === filters.value.length
  })
})

const sortedProducts = computed(() => {
  return filteredProducts.value.sort((a, b) => {
    if (sort.value.column === 'date') {
      if (sort.value.type === 'desc') {
        if (a.id > b.id) {
          return -1
        } else if (a.id < b.id) {
          return 1
        } else {
          return 0
        }
      } else {
        if (a.id < b.id) {
          return -1
        } else if (a.id > b.id) {
          return 1
        } else {
          return 0
        }
      }
    } else {
      if (sort.value.type === 'desc') {
        if (a.price > b.price) {
          return -1
        } else if (a.price < b.price) {
          return 1
        } else {
          return 0
        }
      } else {
        if (a.price < b.price) {
          return -1
        } else if (a.price > b.price) {
          return 1
        } else {
          return 0
        }
      }
    }
  })
})
</script>

<template>
  <div class="container mt-4" v-if="isLoaded">
    <h1 class="mb-4">Список объявлений</h1>

    <!-- Фильтры -->
    <div class="row mb-4">
      <div class="col-md-3">
        <h5>Фильтры</h5>
        <div class="d-flex justify-content-between">
          <div>
            <b>Сортировка по:</b><br>
            <select class="form-control form-select" v-model="sort.column">
              <option value="date">Дате</option>
              <option value="price">Цене</option>
            </select>
          </div>
          <div>
            <b>Сначала:</b><br>
            <select class="form-control form-select" v-model="sort.type">
              <option value="desc">
                <template v-if="sort.column === 'date'">
                  Новые
                </template>
                <template v-else>
                  Дорогие
                </template>
              </option>
              <option value="asc">
                <template v-if="sort.column === 'date'">
                  Старые
                </template>
                <template v-else>
                  Дешевые
                </template>
              </option>
            </select>
          </div>
        </div>

        <!-- Пример фильтра checkbox -->
        <div class="mb-3" v-for="filter in filters">
          <label class="form-label fw-bold">{{ filter.title }}</label><br>

          <template v-if="filter.type === 'checkbox'">
            <div class="form-check" v-for="value in filter.values">
              <input class="form-check-input" type="checkbox"
                     :checked="filter.selectedValues.includes(value)"
                     @click="changeCheckboxFilter(filter, value)"
              > {{ value }}
            </div>
          </template>

          <template v-else>
            <div class="d-flex gap-2">
              <input type="number" class="form-control" placeholder="От" @input="isFilterTouched = true" v-model="filter.minValue">
              <input type="number" class="form-control" placeholder="До" @input="isFilterTouched = true" v-model="filter.maxValue">
            </div>
          </template>

        </div>

        <button class="btn btn-sm btn-secondary" @click="clearFilters">Очистить фильтры</button>
      </div>

      <div class="col-md-9">
        <div class="row g-3">

          <ProductCard v-for="product in sortedProducts" :product="product">
            <div class="d-flex justify-content-between">
              <RouterLink :to="`/products/${product.id}`" class="btn btn-outline-primary btn-sm">Перейти</RouterLink>
            </div>
          </ProductCard>

        </div>
      </div>
    </div>
  </div>
</template>
