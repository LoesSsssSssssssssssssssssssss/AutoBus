const carsData = [
  {
    brand: 'Nissan',
    logoImage: './style/img/nissanlogo.png',
    carImage: './style/img/Nissan.png',
  },
  {
    brand: 'Ford',
    logoImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ford_Motor_Company_Logo.svg/1200px-Ford_Motor_Company_Logo.svg.png',
    carImage: './style/img/Ford.png',
  },
  {
    brand: 'Toyota',
    logoImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1200px-Toyota_carlogo.svg.png',
    carImage: './style/img/Toyota.png',
  },
  {
    brand: 'BMW',
    logoImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png',
    carImage: './style/img/BMW.png',
  },
  {
    brand: 'Mercedes',
    logoImage: './style/img/mercedeslogo.png',
    carImage: './style/img/Mercedes.png',
  },
  {
    brand: 'Volkswagen',
    logoImage: './style/img/VW logo.png',
    carImage: './style/img/VW.png',
  },
  {
    brand: 'Audi',
    logoImage: './style/img/audi logo.png',
    carImage: './style/img/Audi.png',
  },
  {
    brand: 'Chevrolet',
    logoImage: './style/img/chevrolet logo.png',
    carImage: './style/img/CH.png',
  },
];

let currentIndex = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;
let dragDistance = 0;
const dragThreshold = 40;
let canSwipe = true;
let lastSwipeTime = 0;
const swipeCooldown = 50;
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
    logoItem.style.display = 'none'; // Добавляем: сразу скрываем все логотипы

    // Создаем изображение логотипа
    const logoImg = document.createElement('img');
    logoImg.className = 'brand-logo';
    logoImg.src = car.logoImage;
    logoImg.alt = `${car.brand} logo`;
    logoImg.loading = 'eager';
    logoImg.onerror = function () {
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
    carImg.loading = 'lazy';
    carImg.onerror = function () {
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
  for (let i = 0; i < Math.min(7, carsData.length); i++) {
    const car = carsData[i];
    const img1 = new Image();
    img1.src = car.logoImage;
    const img2 = new Image();
    img2.src = car.carImage;
  }
}

// Функция обновления слайдера с 7 логотипами
function updateSlider() {
  const totalItems = carsData.length;

  // Обновляем заголовок
  brandTitle.textContent = carsData[currentIndex].brand;

  // Обновляем логотипы - 7 штук
  const logos = document.querySelectorAll('.logo-item');

  // Сначала скрываем все логотипы
  logos.forEach((logo) => {
    logo.style.opacity = '0';
    logo.style.display = 'none'; // Изменено: полностью скрываем
    logo.style.pointerEvents = 'none';
    logo.className = 'logo-item';
  });

  // Показываем 7 логотипов: текущий и по 3 с каждой стороны
  for (let i = -3; i <= 3; i++) {
    let logoIndex = currentIndex + i;

    // Корректируем индекс для бесконечного цикла
    if (logoIndex < 0) {
      logoIndex = totalItems + logoIndex;
      if (logoIndex < 0) logoIndex = totalItems + logoIndex;
    }
    if (logoIndex >= totalItems) {
      logoIndex = logoIndex % totalItems;
    }

    const logo = logos[logoIndex];
    if (logo) {
      logo.style.display = 'block'; // Изменено: показываем только нужные
      logo.style.opacity = '1';
      logo.style.pointerEvents = 'all';
      logo.className = 'logo-item';

      if (i === 0) {
        logo.classList.add('active');
      } else if (i === -3) {
        logo.classList.add('left-3');
      } else if (i === -2) {
        logo.classList.add('left-2');
      } else if (i === -1) {
        logo.classList.add('left-1');
      } else if (i === 1) {
        logo.classList.add('right-1');
      } else if (i === 2) {
        logo.classList.add('right-2');
      } else if (i === 3) {
        logo.classList.add('right-3');
      }
    }
  }

  // Обновляем автомобили
  const cars = document.querySelectorAll('.car-item');

  // Сначала скрываем все автомобили
  cars.forEach((car) => {
    car.style.opacity = '0';
    car.style.pointerEvents = 'none';
    car.style.transform = 'scale(0)';
    car.className = 'car-item';
  });

  // Показываем 3 автомобиля: активный и по 1 с каждой стороны
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
  logosContainer.addEventListener('mousedown', startDrag);
  carsContainer.addEventListener('mousedown', startDrag);

  logosContainer.addEventListener('touchstart', startDragTouch, {
    passive: false,
  });
  carsContainer.addEventListener('touchstart', startDragTouch, {
    passive: false,
  });

  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', dragTouch, { passive: false });

  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);

  const slider = document.querySelector('.car-slider');
  slider.addEventListener('wheel', handleWheel);
  slider.addEventListener('click', handleQuickClick);
}

// Обработка колесика мыши для быстрого переключения
function handleWheel(e) {
  const now = Date.now();
  if (now - lastSwipeTime < 30) return;

  if (e.deltaY > 0) {
    nextSlide();
  } else if (e.deltaY < 0) {
    prevSlide();
  }
  e.preventDefault();
}

// Быстрые клики по бокам слайдера
function handleQuickClick(e) {
  const sliderRect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - sliderRect.left;
  const sliderWidth = sliderRect.width;

  if (clickX < sliderWidth / 3) {
    prevSlide();
    e.preventDefault();
  } else if (clickX > (sliderWidth * 2) / 3) {
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

  if (Math.abs(dragDistance) > dragThreshold && canSwipe) {
    const now = Date.now();
    if (now - lastSwipeTime >= swipeCooldown) {
      if (dragDistance > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  } else {
    canSwipe = true;
  }

  startX = 0;
  currentX = 0;
  dragDistance = 0;
}

// Данные для блока "Почему именно мы"
const whyUsData = [
  {
    number: '01',
    title: 'Гибкая оплата',
    content:
      'Мы предлагаем различные варианты оплаты: наличный и безналичный расчет, рассрочка, оплата картой. Выбирайте удобный для вас способ!',
  },
  {
    number: '02',
    title: 'Широкий ассортимент',
    content:
      'Более 50 000 наименований автозапчастей в наличии на складе. Оригинальные запчасти и качественные аналоги для всех популярных марок.',
  },
  {
    number: '03',
    title: 'Гарантии',
    content:
      'На все запчасти предоставляется гарантия от 6 до 36 месяцев. Мы уверены в качестве нашей продукции и даем официальные гарантийные обязательства.',
  },
  {
    number: '04',
    title: 'Быстрая доставка',
    content:
      'Доставка по городу в течение 2 часов. По области - в течение суток. По России - от 1 до 5 дней в зависимости от региона.',
  },
  {
    number: '05',
    title: 'Подбор запчастей',
    content:
      'Профессиональная консультация и подбор запчастей по VIN-коду или модели автомобиля. Поможем найти даже редкие детали.',
  },
  {
    number: '06',
    title: 'Низкие цены',
    content:
      'Прямые поставки от производителей позволяют нам предлагать цены на 15-20% ниже среднерыночных. Регулярные акции и скидки.',
  },
];

// Изображения для слайдера
const slidesImages = [
  './style/img/slide1.jpg',
  './style/img/slide2.jpg',
  './style/img/slide3.jpg',
  './style/img/slide4.jpg',
  './style/img/slide5.jpg',
  './style/img/slide6.jpg',
];

// Инициализация блока "Почему именно мы"
function initWhyUsSection() {
  const accordionContainer = document.getElementById('whyUsAccordion');
  const slideshowContainer = document.getElementById('slideshowContainer');

  // Заполняем аккордеон
  whyUsData.forEach((item, index) => {
    const accordionItem = document.createElement('div');
    accordionItem.className = 'accordion-item';
    accordionItem.dataset.index = index;

    const accordionHeader = document.createElement('div');
    accordionHeader.className = 'accordion-header';

    accordionHeader.innerHTML = `
      <div class="accordion-number">${item.number}</div>
      <div class="accordion-title">
        ${item.title}
      </div>
      <div class="accordion-arrow">▼</div>
    `;

    const accordionContent = document.createElement('div');
    accordionContent.className = 'accordion-content';

    const accordionContentInner = document.createElement('div');
    accordionContentInner.className = 'accordion-content-inner';
    accordionContentInner.textContent = item.content;

    accordionContent.appendChild(accordionContentInner);

    accordionHeader.addEventListener('click', function () {
      const isActive = accordionHeader.classList.contains('active');
      const content = this.nextElementSibling;

      if (!isActive) {
        // Закрываем все другие
        document
          .querySelectorAll('.accordion-header.active')
          .forEach((activeHeader) => {
            if (activeHeader !== this) {
              const activeContent = activeHeader.nextElementSibling;
              activeHeader.classList.remove('active');
              activeContent.style.height = '0';
            }
          });

        // Открываем текущий
        this.classList.add('active');
        const contentHeight = content.scrollHeight;
        content.style.height = contentHeight + 'px';
      } else {
        // Закрываем текущий
        this.classList.remove('active');
        content.style.height = '0';
      }
    });

    accordionItem.appendChild(accordionHeader);
    accordionItem.appendChild(accordionContent);
    accordionContainer.appendChild(accordionItem);
  });

  // Заполняем слайдер изображений
  slidesImages.forEach((imageSrc, index) => {
    const slideElement = document.createElement('div');
    slideElement.className = 'slide';
    slideElement.dataset.index = index;

    const imgElement = document.createElement('img');
    imgElement.className = 'slide-image';
    imgElement.src = imageSrc;
    imgElement.alt = `Изображение ${index + 1}`;
    imgElement.onerror = function () {
      this.style.display = 'none';
      slideElement.style.backgroundColor = getColorByIndex(index);
    };

    slideElement.appendChild(imgElement);
    slideshowContainer.appendChild(slideElement);
  });

  // Активируем первый слайд
  const firstSlide = document.querySelector('.slide');
  if (firstSlide) {
    firstSlide.classList.add('active');
  }

  // Автоматическое переключение слайдов
  let currentSlide = 0;
  const totalSlides = slidesImages.length;

  function nextSlideWhyUs() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateWhyUsSlider();
  }

  setInterval(nextSlideWhyUs, 5000);

  function updateWhyUsSlider() {
    document.querySelectorAll('.slide').forEach((slide) => {
      slide.classList.remove('active');
    });

    const activeSlide = document.querySelector(
      `.slide[data-index="${currentSlide}"]`
    );
    if (activeSlide) {
      activeSlide.classList.add('active');
    }
  }

  window.goToSlideWhyUs = function (index) {
    currentSlide = index;
    updateWhyUsSlider();
  };
}

function getColorByIndex(index) {
  const colors = [
    '#FFE4B5',
    '#E0FFFF',
    '#F0FFF0',
    '#FFF0F5',
    '#F5F5DC',
    '#F0F8FF',
  ];
  return colors[index % colors.length];
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function () {
  initSlider();

  if (document.getElementById('whyUsAccordion')) {
    initWhyUsSection();
  }
});

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

document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalOpenBtns = document.querySelectorAll('[data-modal-open]');

  // Добавляем обработчик ко всем кнопкам
  modalOpenBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      modalOverlay.classList.add('active');
      document.body.classList.add('modal-open'); // блокируем скролл
    });
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.classList.remove('modal-open'); // разрешаем скролл
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalOverlay.classList.remove('active');
      document.body.classList.remove('modal-open'); // разрешаем скролл
    }
  });
});

// Оптимальный вариант с визуальной обратной связью
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burgerMenu');
  const menu = document.getElementById('mobileMenu');

  if (burger && menu) {
    // Текущее состояние меню
    let isMenuOpen = false;

    // Открытие/закрытие
    burger.addEventListener('click', function () {
      isMenuOpen = !isMenuOpen;
      burger.classList.toggle('active', isMenuOpen);
      menu.classList.toggle('active', isMenuOpen);
      document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    });

    // Обработка кликов по ссылкам
    document.querySelectorAll('.mobile-nav a').forEach((link) => {
      link.addEventListener('click', function (e) {
        if (isMenuOpen) {
          e.preventDefault();
          const href = this.getAttribute('href');

          // Добавляем визуальную обратную связь
          this.classList.add('clicked');

          // Закрываем меню с задержкой
          setTimeout(() => {
            isMenuOpen = false;
            burger.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
            this.classList.remove('clicked');

            // Переход после закрытия меню
            if (href) {
              setTimeout(() => {
                if (href.startsWith('#')) {
                  const target = document.querySelector(href);
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = href;
                }
              }, 50);
            }
          }, 250); // Задержка закрытия
        }
      });
    });

    // Закрытие по клику вне меню
    menu.addEventListener('click', function (e) {
      if (e.target === menu) {
        isMenuOpen = false;
        burger.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isMenuOpen) {
        isMenuOpen = false;
        burger.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});

// Добавьте этот код в ваш script.js
function adjustMobileMenuHeight() {
  const mobileMenuContent = document.querySelector('.mobile-menu-content');
  if (!mobileMenuContent) return;

  const headerHeight = 100; // Высота шапки
  const bottomPadding = 40; // Отступ снизу
  const socialHeight = 75; // Высота блока с соцсетями
  const availableHeight =
    window.innerHeight - headerHeight - bottomPadding - socialHeight;

  // Устанавливаем максимальную высоту для основного контента
  const nav = document.querySelector('.mobile-nav');
  const contacts = document.querySelector('.mobile-contacts');

  if (nav && contacts) {
    const contentHeight = nav.offsetHeight + contacts.offsetHeight + 60; // + отступы

    if (contentHeight > availableHeight) {
      // Если контент не помещается, добавляем прокрутку
      mobileMenuContent.style.maxHeight = '100vh';
      mobileMenuContent.style.overflowY = 'auto';
    } else {
      // Если помещается, убираем прокрутку
      mobileMenuContent.style.maxHeight = 'none';
      mobileMenuContent.style.overflowY = 'visible';
    }
  }
}

// Вызываем при открытии меню и изменении размера окна
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burgerMenu');

  if (burger) {
    burger.addEventListener('click', function () {
      setTimeout(adjustMobileMenuHeight, 100); // Через 100мс после открытия
    });
  }

  window.addEventListener('resize', adjustMobileMenuHeight);
});

// === ПЛАВНАЯ ПРОКРУТКА ПО ЯКОРНЫМ ССЫЛКАМ ===
document.addEventListener('DOMContentLoaded', function () {
  // Отключаем стандартное поведение только для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Пропускаем ссылки без # или на саму страницу
      if (href === '#' || href === '') return;

      // Исключаем ссылки с data-modal-open
      if (this.hasAttribute('data-modal-open')) return;

      e.preventDefault();

      const targetElement = document.querySelector(href);
      if (!targetElement) return;

      // Получаем текущую позицию скролла
      const startPosition = window.pageYOffset;
      const targetPosition =
        targetElement.getBoundingClientRect().top + startPosition;
      const distance = targetPosition - startPosition;
      const duration = 800; // 800ms для плавности
      let startTime = null;

      // Функция анимации скролла
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      // Функция плавности (easeInOutCubic)
      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
      }

      // Запускаем анимацию
      requestAnimationFrame(animation);

      // Обновляем URL без скролла
      history.replaceState(null, null, href);
    });
  });

  // Обработка для мобильного меню
  document.querySelectorAll('.mobile-nav a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      e.preventDefault();

      // Закрываем мобильное меню
      const burger = document.getElementById('burgerMenu');
      const menu = document.getElementById('mobileMenu');
      if (burger && menu && menu.classList.contains('active')) {
        burger.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      }

      // Даем время на закрытие меню перед скроллом
      setTimeout(() => {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const startPosition = window.pageYOffset;
          const targetPosition =
            targetElement.getBoundingClientRect().top + startPosition;
          const distance = targetPosition - startPosition;
          const duration = 800;
          let startTime = null;

          function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);

            if (timeElapsed < duration) {
              requestAnimationFrame(animation);
            }
          }

          function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t * t + b;
            t -= 2;
            return (c / 2) * (t * t * t + 2) + b;
          }

          requestAnimationFrame(animation);
          history.replaceState(null, null, href);
        }
      }, 300); // Ждем закрытия меню
    });
  });
});
