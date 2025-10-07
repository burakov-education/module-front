<script setup>

</script>

<template>
  <div class="container mt-5" style="max-width: 700px;">
    <h2 class="mb-4">Создать объявление</h2>
    <form>
      <div class="mb-3">
        <label>Название</label>
        <input type="text" class="form-control" required="">
      </div>
      <div class="mb-3">
        <label>Описание</label>
        <textarea class="form-control" rows="3" required=""></textarea>
      </div>
      <div class="mb-3">
        <label>Цена</label>
        <input type="number" class="form-control" required="">
      </div>
      <div class="mb-3">
        <label>Изображение</label>
        <input type="file" class="form-control">
      </div>
      <h3>Характеристики</h3>
      <div class="row">
        <div class="mb-3 col-lg-4">
          <label>Тип</label>
          <select class="form-control">
            <option>Чекбокс</option>
            <option>Число</option>
          </select>
        </div>
        <div class="mb-3 col-lg-4">
          <label>Название</label>
          <input type="text" class="form-control" required="">
        </div>
        <div class="mb-3 col-lg-4">
          <label>Значения</label>
          <div class="mb-3">
            <input type="text" class="form-control" required="">
            <a href="#"><small>Удалить</small></a>
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" required="">
            <a href="#"><small>Удалить</small></a>
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" required="">
            <a href="#"><small>Удалить</small></a>
          </div>
          <button type="button" class="btn btn-primary">Добавить значение</button>
        </div>
      </div>
      <div class="row">
        <div class="mb-3 col-lg-4">
          <label>Тип</label>
          <select class="form-control">
            <option>Чекбокс</option>
            <option selected="">Число</option>
          </select>
        </div>
        <div class="mb-3 col-lg-4">
          <label>Название</label>
          <input type="text" class="form-control" required="">
        </div>
        <div class="mb-3 col-lg-4">
          <label>Значение</label>
          <input type="text" class="form-control" required="">
        </div>
      </div>
      <button type="button" class="btn btn-primary">Добавить характеристику</button>
      <hr>
      <button type="submit" class="btn btn-success">Опубликовать</button>
    </form>
  </div>
</template>
