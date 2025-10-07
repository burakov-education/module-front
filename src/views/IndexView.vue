<template>
  <div class="container mt-4">
    <h1 class="mb-4">Список объявлений</h1>

    <!-- Фильтры -->
    <div class="row mb-4">
      <div class="col-md-3">
        <h5>Фильтры</h5>

        <!-- Пример фильтра checkbox -->
        <div class="mb-3">
          <label class="form-label fw-bold">Цвет</label><br>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" checked=""> Красный
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" checked=""> Белый
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" checked=""> Чёрный
          </div>
        </div>

        <!-- Пример фильтра number -->
        <div class="mb-3">
          <label class="form-label fw-bold">Ширина</label>
          <div class="d-flex gap-2">
            <input type="number" class="form-control" placeholder="От" value="100">
            <input type="number" class="form-control" placeholder="До" value="130">
          </div>
        </div>

        <button class="btn btn-sm btn-secondary">Очистить фильтры</button>
      </div>

      <div class="col-md-9">
        <div class="row g-3">
          <!-- Карточка объявления -->
          <div class="col-md-6">
            <div class="card h-100">
              <img src="https://via.placeholder.com/400x200" class="card-img-top" alt="Объявление">
              <div class="card-body">
                <h5 class="card-title">iPhone 13 Pro</h5>
                <p class="card-text">Состояние отличное, в комплекте зарядка.</p>
                <p class="fw-bold">Цена: 75 000 ₽</p>
              </div>
            </div>
          </div>
          <!-- Добавить еще карточки по аналогии -->
        </div>
      </div>
    </div>
  </div>
</template>
