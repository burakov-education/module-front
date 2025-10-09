<script setup>
import {inject, ref} from "vue";
import InvalidFeedback from "@/components/InvalidFeedback.vue";
import apiFetch from "@/helpers/apiFetch.js";
import {useRouter} from "vue-router";

const router = useRouter()
const token = inject('token')
const form = ref({
  data: {
    title: '',
    description: '',
    price: '',
    image: null,
    characteristics: [
      {
        "title": "",
        "type": "checkbox",
        "checkbox_values": [
          ""
        ]
      }
    ],
  },
  errors: {},
  isSending: false,
});

const setImage = event => {
  form.value.data.image = event.target.files[0]
}

const sendForm = async () => {
  if (form.value.isSending) return;

  form.value.isSending = true
  form.value.errors = {}

  const formData = new FormData()

  // for (const key in form.value.data) {
  //   if (key !== 'characteristics') {
  //     formData.append(key, form.value.data[key])
  //   }
  // }

  formData.append('title', form.value.data.title)
  formData.append('description', form.value.data.description)
  formData.append('price', form.value.data.price)
  formData.append('image', form.value.data.image)

  for (const key in form.value.data.characteristics) {
    formData.append(`characteristics[${key}][title]`, form.value.data.characteristics[key].title)
    formData.append(`characteristics[${key}][type]`, form.value.data.characteristics[key].type)

    if (form.value.data.characteristics[key].type === 'number') {
      formData.append(`characteristics[${key}][number_value]`, form.value.data.characteristics[key].number_value)
    } else {
      form.value.data.characteristics[key].checkbox_values.forEach((value, index) => {
        formData.append(`characteristics[${key}][checkbox_values][${index}]`, form.value.data.characteristics[key].checkbox_values[index])
      })
    }
  }

  const result = await apiFetch('post', '/products', formData, token.value)

  if (result.errors) {
    form.value.errors = result.errors
  } else {
    await router.push('/my')
  }

  form.value.isSending = false
}

const addCharacteristic = () => {
  form.value.data.characteristics.push({
    title: '',
    type: 'checkbox',
    checkbox_values: [
        '',
    ],
    number_value: '',
  })
}

const addCheckboxValue = (ch) => {
  ch.checkbox_values.push('')
}

const deleteCheckboxValue = (ch, index) => {
  ch.checkbox_values.splice(index, 1)
}

const deleteCharacteristic = (index) => {
  form.value.data.characteristics.splice(index, 1)
}
</script>

<template>
  <div class="container mt-5" style="max-width: 700px;">
    <h2 class="mb-4">Создать объявление</h2>
    <form @submit.prevent="sendForm()" novalidate>
      <div class="mb-3">
        <label>Название</label>
        <input type="text" class="form-control" required=""
               :class="{'is-invalid': form.errors?.title}"
               v-model="form.data.title"
        >
        <InvalidFeedback :errors="form.errors?.title" />
      </div>
      <div class="mb-3">
        <label>Описание</label>
        <textarea class="form-control" rows="3" required=""
                  :class="{'is-invalid': form.errors?.description}"
                  v-model="form.data.description"
        ></textarea>
        <InvalidFeedback :errors="form.errors?.description" />
      </div>
      <div class="mb-3">
        <label>Цена</label>
        <input type="number" class="form-control" required=""
               :class="{'is-invalid': form.errors?.price}"
               v-model="form.data.price"
        >
        <InvalidFeedback :errors="form.errors?.price" />
      </div>
      <div class="mb-3">
        <label>Изображение</label>
        <input type="file" class="form-control"
               :class="{'is-invalid': form.errors?.image}"
               @change="setImage"
        >
        <InvalidFeedback :errors="form.errors?.image" />
      </div>
      <h3>Характеристики</h3>
      <div class="row" v-for="(ch, chIndex) in form.data.characteristics">
        <div class="mb-3 col-lg-3">
          <label>Тип</label>
          <select class="form-control" v-model="ch.type">
            <option value="checkbox">Чекбокс</option>
            <option value="number">Число</option>
          </select>
        </div>
        <div class="mb-3 col-lg-4">
          <label>Название</label>
          <input type="text" class="form-control"
                 v-model="ch.title"
                 :class="{'is-invalid': form.errors[`characteristics.${chIndex}.title`]}"
          >
          <InvalidFeedback :errors="form.errors[`characteristics.${chIndex}.title`]" />
        </div>

        <div class="mb-3 col-lg-4" v-if="ch.type === 'checkbox'">
          <label>Значения</label>

          <div class="mb-3" v-for="(value, index) in ch.checkbox_values">
            <input type="text" class="form-control"
                   v-model="ch.checkbox_values[index]"
                   :class="{'is-invalid': form.errors[`characteristics.${chIndex}.checkbox_values`]}"
            >
            <InvalidFeedback :errors="form.errors[`characteristics.${chIndex}.checkbox_values`]" />
            <a href="#"
               v-if="ch.checkbox_values.length > 1"
               @click.prevent="deleteCheckboxValue(ch, index)"
            ><small>Удалить</small></a>
          </div>

          <button type="button" class="btn btn-primary" @click.prevent="addCheckboxValue(ch)">Добавить значение</button>
        </div>

        <div class="mb-3 col-lg-4" v-if="ch.type === 'number'">
          <label>Значение</label>
          <input type="text" class="form-control"
                 v-model="ch.number_value"
                 :class="{'is-invalid': form.errors[`characteristics.${chIndex}.number_value`]}"
          >
          <InvalidFeedback :errors="form.errors[`characteristics.${chIndex}.number_value`]" />
        </div>

        <div class="col-lg-1">
          <br>
          <a href="#" class="btn btn-sm btn-danger"
             @click.prevent="deleteCharacteristic(chIndex)"
          >X</a>
        </div>
      </div>

      <button type="button" class="btn btn-primary" @click.prevent="addCharacteristic()">Добавить характеристику</button>
      <hr>
      <button type="submit" class="btn btn-success" :disabled="form.isSending">Опубликовать</button>
    </form>
  </div>
</template>
