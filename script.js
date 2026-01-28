/*
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Автомобильный слайдер</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Arial', sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        user-select: none;
        -webkit-user-select: none;
      }

      .car-slider {
        max-width: 1200px;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.95);
        border-radius: 30px;
        padding: 50px 30px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        position: relative;
        overflow: hidden;
      }

      .brand-title {
        text-align: center;
        font-size: 42px;
        font-weight: bold;
        color: #2d3748;
        margin-bottom: 50px;
        height: 60px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      }

      
      .logos-section {
        margin-bottom: 60px;
        height: 150px;
        position: relative;
      }

      .logos-container {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        touch-action: pan-y;
      }

      .logo-item {
        position: absolute;
        width: 100px;
        height: 100px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
        cursor: pointer;
        filter: grayscale(100%) brightness(0.6);
        opacity: 0.5;
        transform-origin: center center;
        pointer-events: all;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .logo-item.active {
        width: 150px;
        height: 150px;
        filter: grayscale(0%) brightness(1);
        opacity: 1;
        z-index: 10;
        transform: translateX(0) scale(1);
      }

      .logo-item.left {
        transform: translateX(-180px) scale(0.7);
        opacity: 0.8;
      }

      .logo-item.right {
        transform: translateX(180px) scale(0.7);
        opacity: 0.8;
      }

     
      .cars-section {
        height: 400px;
        position: relative;
      }

      .cars-container {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        touch-action: pan-y;
      }

      .car-item {
        position: absolute;
        width: 500px;
        height: 300px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        opacity: 0.3;
        filter: brightness(0.4);
        transform-origin: center center;
        pointer-events: all;
        overflow: hidden;
        border-radius: 15px;
      }

      .car-item.active {
        width: 700px;
        height: 400px;
        opacity: 1;
        filter: brightness(1);
        z-index: 10;
        transform: translateX(0) scale(1);
      }

      .car-item.left {
        transform: translateX(-400px) scale(0.6);
        opacity: 0.6;
        filter: brightness(0.7);
      }

      .car-item.right {
        transform: translateX(400px) scale(0.6);
        opacity: 0.6;
        filter: brightness(0.7);
      }

    
      .brand-logo,
      .car-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        pointer-events: none;
      }

      .car-image {
        object-fit: cover;
        border-radius: 15px;
      }

     
      .swipe-hint {
        text-align: center;
        margin-top: 40px;
        color: #718096;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        opacity: 0.8;
      }

      .swipe-icon {
        animation: swipeAnimation 1s infinite;
      }

      @keyframes swipeAnimation {
        0%,
        100% {
          transform: translateX(0);
          opacity: 0.5;
        }
        50% {
          transform: translateX(10px);
          opacity: 1;
        }
      }

      
      @media (max-width: 1024px) {
        .car-slider {
          padding: 30px 20px;
        }

        .brand-title {
          font-size: 32px;
        }

        .logo-item {
          width: 80px;
          height: 80px;
        }

        .logo-item.active {
          width: 120px;
          height: 120px;
        }

        .logo-item.left {
          transform: translateX(-150px) scale(0.7);
        }

        .logo-item.right {
          transform: translateX(150px) scale(0.7);
        }

        .car-item {
          width: 350px;
          height: 210px;
        }

        .car-item.active {
          width: 500px;
          height: 300px;
        }

        .car-item.left {
          transform: translateX(-280px) scale(0.6);
        }

        .car-item.right {
          transform: translateX(280px) scale(0.6);
        }
      }

      @media (max-width: 768px) {
        .car-slider {
          padding: 20px 15px;
        }

        .brand-title {
          font-size: 28px;
          margin-bottom: 40px;
        }

        .logos-section {
          height: 120px;
          margin-bottom: 40px;
        }

        .logo-item {
          width: 60px;
          height: 60px;
        }

        .logo-item.active {
          width: 90px;
          height: 90px;
        }

        .logo-item.left {
          transform: translateX(-100px) scale(0.7);
        }

        .logo-item.right {
          transform: translateX(100px) scale(0.7);
        }

        .cars-section {
          height: 250px;
        }

        .car-item {
          width: 200px;
          height: 120px;
        }

        .car-item.active {
          width: 280px;
          height: 168px;
        }

        .car-item.left {
          transform: translateX(-150px) scale(0.6);
        }

        .car-item.right {
          transform: translateX(150px) scale(0.6);
        }

        .swipe-hint {
          font-size: 14px;
        }
      }
    </style>
  </head>
  <body>
    <div class="car-slider">
      <h1 class="brand-title" id="brandTitle">Volkswagen</h1>

      <!-- Секция с логотипами -->
      <div class="logos-section">
        <div class="logos-container" id="logosContainer">
          <!-- Логотипы будут добавлены через JS -->
        </div>
      </div>

      <!-- Секция с автомобилями -->
      <div class="cars-section">
        <div class="cars-container" id="carsContainer">
          <!-- Изображения автомобилей будут добавлены через JS -->
        </div>
      </div>

      <!-- Подсказка -->
      <div class="swipe-hint">
        <span class="swipe-icon">← →</span>
        Перетащите для переключения
      </div>
    </div>

    <script>
      // Данные для слайдера с настоящими изображениями
      const carsData = [
        {
          brand: 'Volkswagen',
          logoImage:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Volkswagen_logo_2019.svg/1200px-Volkswagen_logo_2019.svg.png',
          carImage:
            'https://images.unsplash.com/photo-1563720223485-41b7d8f5a398?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        },
        {
          brand: 'Ford',
          logoImage:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ford_Motor_Company_Logo.svg/1200px-Ford_Motor_Company_Logo.svg.png',
          carImage:
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        },
        {
          brand: 'Toyota',
          logoImage:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1200px-Toyota_carlogo.svg.png',
          carImage:
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        },
        {
          brand: 'BMW',
          logoImage:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png',
          carImage:
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        },
        {
          brand: 'Volkswagen',
          logoImage: './VW logo.png',
          carImage: './VW.png',
        },
        {
          brand: 'Audi',
          logoImage: './audi logo.png',
          carImage: './Audi.png',
        },
        {
          brand: 'Chevrolet',
          logoImage: './chevrolet logo.png',
          carImage: 'CH.png',
        },
      ];

      let currentIndex = 0;
      let isDragging = false;
      let startX = 0;
      let currentX = 0;
      let dragDistance = 0;
      const dragThreshold = 40; // Уменьшен порог для более быстрого реагирования
      let canSwipe = true;
      let lastSwipeTime = 0;
      const swipeCooldown = 50; // Уменьшено с ~200ms до 50ms
      const brandTitle = document.getElementById('brandTitle');
      const logosContainer = document.getElementById('logosContainer');
      const carsContainer = document.getElementById('carsContainer');

      // Инициализация слайдера
      function initSlider() {
        // Предзагрузка изображений для плавности
        preloadImages();

        // Создаем элементы для логотипов
        carsData.forEach((car, index) => {
          const logoItem = document.createElement('div');
          logoItem.className = 'logo-item';
          logoItem.dataset.index = index;

          // Создаем изображение логотипа
          const logoImg = document.createElement('img');
          logoImg.className = 'brand-logo';
          logoImg.src = car.logoImage;
          logoImg.alt = `${car.brand} logo`;
          logoImg.loading = 'eager'; // Быстрая загрузка
          logoImg.onerror = function () {
            // Если изображение не загрузилось, показываем текст
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.textContent = car.brand.substring(0, 2).toUpperCase();
            fallback.style.color = '#333';
            fallback.style.fontSize = '24px';
            fallback.style.fontWeight = 'bold';
            logoItem.appendChild(fallback);
          };

          logoItem.appendChild(logoImg);
          logoItem.addEventListener('click', () => goToSlide(index));
          logosContainer.appendChild(logoItem);
        });

        // Создаем элементы для автомобилей
        carsData.forEach((car, index) => {
          const carItem = document.createElement('div');
          carItem.className = 'car-item';
          carItem.dataset.index = index;

          // Создаем изображение автомобиля
          const carImg = document.createElement('img');
          carImg.className = 'car-image';
          carImg.src = car.carImage;
          carImg.alt = `${car.brand} car`;
          carImg.loading = 'lazy'; // Ленивая загрузка для остальных
          carImg.onerror = function () {
            // Если изображение не загрузилось, показываем заглушку
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.style.width = '100%';
            fallback.style.height = '100%';
            fallback.style.backgroundColor = '#f0f0f0';
            fallback.style.display = 'flex';
            fallback.style.justifyContent = 'center';
            fallback.style.alignItems = 'center';
            fallback.style.color = '#666';
            fallback.textContent = car.brand;
            carItem.appendChild(fallback);
          };

          carItem.appendChild(carImg);
          carItem.addEventListener('click', () => goToSlide(index));
          carsContainer.appendChild(carItem);
        });

        updateSlider();
        addDragEvents();
      }

      // Предзагрузка изображений для плавности
      function preloadImages() {
        // Предзагружаем первые 3 изображения для плавности
        for (let i = 0; i < Math.min(3, carsData.length); i++) {
          const car = carsData[i];
          const img1 = new Image();
          img1.src = car.logoImage;
          const img2 = new Image();
          img2.src = car.carImage;
        }
      }

      // Упрощенная функция обновления слайдера
      function updateSlider() {
        const totalItems = carsData.length;

        // Обновляем заголовок
        brandTitle.textContent = carsData[currentIndex].brand;

        // Обновляем логотипы
        const logos = document.querySelectorAll('.logo-item');

        // Всегда показываем только 3 логотипа
        for (let i = -1; i <= 1; i++) {
          let logoIndex = currentIndex + i;

          // Корректируем индекс для бесконечного цикла
          if (logoIndex < 0) logoIndex = totalItems - 1;
          if (logoIndex >= totalItems) logoIndex = 0;

          const logo = logos[logoIndex];
          if (logo) {
            logo.style.opacity = '1';
            logo.style.pointerEvents = 'all';
            logo.style.transform = '';
            logo.className = 'logo-item';

            if (i === 0) {
              logo.classList.add('active');
            } else if (i === -1) {
              logo.classList.add('left');
            } else if (i === 1) {
              logo.classList.add('right');
            }
          }
        }

        // Скрываем остальные логотипы
        logos.forEach((logo, index) => {
          let shouldShow = false;
          for (let i = -1; i <= 1; i++) {
            let checkIndex = currentIndex + i;
            if (checkIndex < 0) checkIndex = totalItems - 1;
            if (checkIndex >= totalItems) checkIndex = 0;

            if (index === checkIndex) {
              shouldShow = true;
              break;
            }
          }

          if (!shouldShow) {
            logo.style.opacity = '0';
            logo.style.pointerEvents = 'none';
            logo.style.transform = 'scale(0)';
          }
        });

        // Обновляем автомобили
        const cars = document.querySelectorAll('.car-item');

        // Всегда показываем только 3 автомобиля
        for (let i = -1; i <= 1; i++) {
          let carIndex = currentIndex + i;

          // Корректируем индекс для бесконечного цикла
          if (carIndex < 0) carIndex = totalItems - 1;
          if (carIndex >= totalItems) carIndex = 0;

          const car = cars[carIndex];
          if (car) {
            car.style.opacity = '1';
            car.style.pointerEvents = 'all';
            car.style.transform = '';
            car.className = 'car-item';

            if (i === 0) {
              car.classList.add('active');
            } else if (i === -1) {
              car.classList.add('left');
            } else if (i === 1) {
              car.classList.add('right');
            }
          }
        }

        // Скрываем остальные автомобили
        cars.forEach((car, index) => {
          let shouldShow = false;
          for (let i = -1; i <= 1; i++) {
            let checkIndex = currentIndex + i;
            if (checkIndex < 0) checkIndex = totalItems - 1;
            if (checkIndex >= totalItems) checkIndex = 0;

            if (index === checkIndex) {
              shouldShow = true;
              break;
            }
          }

          if (!shouldShow) {
            car.style.opacity = '0';
            car.style.pointerEvents = 'none';
            car.style.transform = 'scale(0)';
          }
        });

        // Разрешаем следующий свайп сразу
        canSwipe = true;
        lastSwipeTime = Date.now();
      }

      // Переход к определенному слайду
      function goToSlide(index) {
        const now = Date.now();
        if (!canSwipe || now - lastSwipeTime < swipeCooldown) return;

        canSwipe = false;
        currentIndex = index;
        updateSlider();
      }

      // Переход к следующему слайду
      function nextSlide() {
        const now = Date.now();
        if (!canSwipe || now - lastSwipeTime < swipeCooldown) return;

        canSwipe = false;
        currentIndex = (currentIndex + 1) % carsData.length;
        updateSlider();
      }

      // Переход к предыдущему слайду
      function prevSlide() {
        const now = Date.now();
        if (!canSwipe || now - lastSwipeTime < swipeCooldown) return;

        canSwipe = false;
        currentIndex = (currentIndex - 1 + carsData.length) % carsData.length;
        updateSlider();
      }

      // Добавление обработчиков перетаскивания
      function addDragEvents() {
        // Для десктопных устройств
        logosContainer.addEventListener('mousedown', startDrag);
        carsContainer.addEventListener('mousedown', startDrag);

        // Для мобильных устройств
        logosContainer.addEventListener('touchstart', startDragTouch, {
          passive: false,
        });
        carsContainer.addEventListener('touchstart', startDragTouch, {
          passive: false,
        });

        // Отслеживание движения
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', dragTouch, { passive: false });

        // Завершение перетаскивания
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);

        // Добавляем возможность быстрого свайпа мышкой по всей области слайдера
        const slider = document.querySelector('.car-slider');
        slider.addEventListener('wheel', handleWheel);

        // Добавляем быстрые клики по бокам слайдера
        slider.addEventListener('click', handleQuickClick);
      }

      // Обработка колесика мыши для быстрого переключения
      function handleWheel(e) {
        const now = Date.now();
        if (now - lastSwipeTime < 30) return; // Ограничение 30ms для колесика

        if (e.deltaY > 0) {
          // Колесико вниз - следующий слайд
          nextSlide();
        } else if (e.deltaY < 0) {
          // Колесико вверх - предыдущий слайд
          prevSlide();
        }
        e.preventDefault();
      }

      // Быстрые клики по бокам слайдера
      function handleQuickClick(e) {
        const sliderRect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - sliderRect.left;
        const sliderWidth = sliderRect.width;

        // Если клик в левой трети - предыдущий слайд
        if (clickX < sliderWidth / 3) {
          prevSlide();
          e.preventDefault();
        }
        // Если клик в правой трети - следующий слайд
        else if (clickX > (sliderWidth * 2) / 3) {
          nextSlide();
          e.preventDefault();
        }
      }

      function startDrag(e) {
        isDragging = true;
        startX = e.clientX;
        currentX = startX;
        dragDistance = 0;
        e.preventDefault();
      }

      function startDragTouch(e) {
        if (e.touches.length === 1) {
          isDragging = true;
          startX = e.touches[0].clientX;
          currentX = startX;
          dragDistance = 0;
          e.preventDefault();
        }
      }

      function drag(e) {
        if (!isDragging) return;
        currentX = e.clientX;
        dragDistance = currentX - startX;
        e.preventDefault();
      }

      function dragTouch(e) {
        if (!isDragging || e.touches.length !== 1) return;
        currentX = e.touches[0].clientX;
        dragDistance = currentX - startX;
        e.preventDefault();
      }

      function endDrag() {
        if (!isDragging) return;

        isDragging = false;

        // Определяем направление и силу свайпа
        if (Math.abs(dragDistance) > dragThreshold && canSwipe) {
          const now = Date.now();
          if (now - lastSwipeTime >= swipeCooldown) {
            if (dragDistance > 0) {
              // Свайп вправо - предыдущий слайд
              prevSlide();
            } else {
              // Свайп влево - следующий слайд
              nextSlide();
            }
          }
        } else {
          // Если свайп был слабым, разрешаем следующий
          canSwipe = true;
        }

        startX = 0;
        currentX = 0;
        dragDistance = 0;
      }

      // Инициализация при загрузке
      document.addEventListener('DOMContentLoaded', initSlider);

      // Горячие клавиши для клавиатуры
      document.addEventListener('keydown', (e) => {
        const now = Date.now();
        if (now - lastSwipeTime < swipeCooldown) return;

        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'ф') {
          prevSlide();
          e.preventDefault();
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'в') {
          nextSlide();
          e.preventDefault();
        }
      });
    </script>
  </body>
</html>
*/
