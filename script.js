// ======================== СЛАЙДЕР АВТОМОБИЛЕЙ ========================
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

// Инициализация слайдера
function initSlider() {
  const brandTitle = document.getElementById('brandTitle');
  const logosContainer = document.getElementById('logosContainer');
  const carsContainer = document.getElementById('carsContainer');

  if (!brandTitle || !logosContainer || !carsContainer) return;

  // Создаем элементы для логотипов
  carsData.forEach((car, index) => {
    const logoItem = document.createElement('div');
    logoItem.className = 'logo-item';
    logoItem.dataset.index = index;
    logoItem.style.display = 'none';

    const logoImg = document.createElement('img');
    logoImg.className = 'brand-logo';
    logoImg.src = car.logoImage;
    logoImg.alt = `${car.brand} logo`;
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

    const carImg = document.createElement('img');
    carImg.className = 'car-image';
    carImg.src = car.carImage;
    carImg.alt = `${car.brand} car`;
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

function updateSlider() {
  const brandTitle = document.getElementById('brandTitle');
  const logos = document.querySelectorAll('.logo-item');
  const cars = document.querySelectorAll('.car-item');

  if (!brandTitle) return;

  const totalItems = carsData.length;
  brandTitle.textContent = carsData[currentIndex].brand;

  // Обновляем логотипы
  logos.forEach((logo) => {
    logo.style.opacity = '0';
    logo.style.display = 'none';
    logo.style.pointerEvents = 'none';
    logo.className = 'logo-item';
  });

  for (let i = -3; i <= 3; i++) {
    let logoIndex = currentIndex + i;

    if (logoIndex < 0) {
      logoIndex = totalItems + logoIndex;
      if (logoIndex < 0) logoIndex = totalItems + logoIndex;
    }
    if (logoIndex >= totalItems) {
      logoIndex = logoIndex % totalItems;
    }

    const logo = logos[logoIndex];
    if (logo) {
      logo.style.display = 'block';
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
  cars.forEach((car) => {
    car.style.opacity = '0';
    car.style.pointerEvents = 'none';
    car.style.transform = 'scale(0)';
    car.className = 'car-item';
  });

  for (let i = -1; i <= 1; i++) {
    let carIndex = currentIndex + i;

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

  canSwipe = true;
  lastSwipeTime = Date.now();
}

function goToSlide(index) {
  const now = Date.now();
  if (!canSwipe || now - lastSwipeTime < swipeCooldown) return;

  canSwipe = false;
  currentIndex = index;
  updateSlider();
}

function nextSlide() {
  const now = Date.now();
  if (!canSwipe || now - lastSwipeTime < swipeCooldown) return;

  canSwipe = false;
  currentIndex = (currentIndex + 1) % carsData.length;
  updateSlider();
}

function prevSlide() {
  const now = Date.now();
  if (!canSwipe || now - lastSwipeTime < swipeCooldown) return;

  canSwipe = false;
  currentIndex = (currentIndex - 1 + carsData.length) % carsData.length;
  updateSlider();
}

function addDragEvents() {
  const logosContainer = document.getElementById('logosContainer');
  const carsContainer = document.getElementById('carsContainer');

  if (!logosContainer || !carsContainer) return;

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
  if (slider) {
    slider.addEventListener('wheel', handleWheel);
    slider.addEventListener('click', handleQuickClick);
  }
}

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

// Горячие клавиши для слайдера
function initSliderHotkeys() {
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
}

// ======================== АККОРДЕОН "ПОЧЕМУ МЫ" ========================
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

const slidesImages = [
  './style/img/slide1.jpg',
  './style/img/slide2.jpg',
  './style/img/slide3.jpg',
  './style/img/slide4.jpg',
  './style/img/slide5.jpg',
  './style/img/slide6.jpg',
];

function initWhyUsSection() {
  const accordionContainer = document.getElementById('whyUsAccordion');
  const slideshowContainer = document.getElementById('slideshowContainer');

  if (!accordionContainer || !slideshowContainer) return;

  // Заполняем аккордеон
  whyUsData.forEach((item, index) => {
    const accordionItem = document.createElement('div');
    accordionItem.className = 'accordion-item';
    accordionItem.dataset.index = index;

    const accordionHeader = document.createElement('div');
    accordionHeader.className = 'accordion-header';

    accordionHeader.innerHTML = `
      <div class="accordion-number">${item.number}</div>
      <div class="accordion-title">${item.title}</div>
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
        document
          .querySelectorAll('.accordion-header.active')
          .forEach((activeHeader) => {
            if (activeHeader !== this) {
              const activeContent = activeHeader.nextElementSibling;
              activeHeader.classList.remove('active');
              activeContent.style.height = '0';
            }
          });

        this.classList.add('active');
        const contentHeight = content.scrollHeight;
        content.style.height = contentHeight + 'px';
      } else {
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

// ======================== МОДАЛЬНОЕ ОКНО ========================
function initModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalOpenBtns = document.querySelectorAll('[data-modal-open]');

  if (!modalOverlay) return;

  modalOpenBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
      document.body.classList.add('modal-open');
      resetFormValidation(); // Сброс валидации при открытии
    });
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.classList.remove('modal-open');
      resetFormValidation(); // Сброс валидации при закрытии
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalOverlay.classList.remove('active');
      document.body.classList.remove('modal-open');
      resetFormValidation(); // Сброс валидации при закрытии
    }
  });
}

// ======================== МОБИЛЬНОЕ МЕНЮ ========================
function initMobileMenu() {
  const burger = document.getElementById('burgerMenu');
  const menu = document.getElementById('mobileMenu');

  if (!burger || !menu) return;

  let isMenuOpen = false;

  burger.addEventListener('click', function () {
    isMenuOpen = !isMenuOpen;
    burger.classList.toggle('active', isMenuOpen);
    menu.classList.toggle('active', isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-nav a').forEach((link) => {
    link.addEventListener('click', function (e) {
      if (isMenuOpen) {
        e.preventDefault();
        const href = this.getAttribute('href');

        this.classList.add('clicked');

        setTimeout(() => {
          isMenuOpen = false;
          burger.classList.remove('active');
          menu.classList.remove('active');
          document.body.style.overflow = '';
          this.classList.remove('clicked');

          if (href) {
            setTimeout(() => {
              if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }
            }, 50);
          }
        }, 250);
      }
    });
  });

  menu.addEventListener('click', function (e) {
    if (e.target === menu) {
      isMenuOpen = false;
      burger.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isMenuOpen) {
      isMenuOpen = false;
      burger.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ======================== ПЛАВНАЯ ПРОКРУТКА ========================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href === '#' || href === '') return;
      if (this.hasAttribute('data-modal-open')) return;

      e.preventDefault();

      const targetElement = document.querySelector(href);
      if (!targetElement) return;

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
    });
  });
}

// ======================== ВАЛИДАЦИЯ ФОРМЫ ========================
let isFormSubmitting = false;

// Сброс валидации
function resetFormValidation() {
  document.querySelectorAll('.error-message').forEach((error) => {
    error.style.display = 'none';
    error.textContent = '';
  });

  document.querySelectorAll('#modalForm input').forEach((input) => {
    input.classList.remove('error', 'valid');
  });

  const successMessage = document.getElementById('successMessage');
  if (successMessage) {
    successMessage.style.display = 'none';
    successMessage.textContent = '';
  }

  isFormSubmitting = false;
  const submitBtn = document.getElementById('submitBtn');
  const loadingSpinner = document.getElementById('loadingSpinner');
  if (submitBtn) submitBtn.disabled = false;
  if (loadingSpinner) loadingSpinner.style.display = 'none';
}

// Валидация поля
function validateField(field) {
  const value = field.type === 'checkbox' ? field.checked : field.value.trim();
  const fieldId = field.id;
  const errorElement = document.getElementById(`${fieldId}Error`);

  // Очищаем предыдущую ошибку
  if (errorElement) {
    errorElement.style.display = 'none';
    errorElement.textContent = '';
    field.classList.remove('error');
  }

  let isValid = true;
  let errorMessage = '';

  switch (fieldId) {
    case 'name':
      if (!value) {
        errorMessage = 'Введите ваше имя';
        isValid = false;
      } else if (value.length < 2) {
        errorMessage = 'Имя должно содержать минимум 2 символа';
        isValid = false;
      } else if (!/^[а-яА-ЯёЁa-zA-Z\s\-]+$/u.test(value)) {
        errorMessage = 'Имя может содержать только буквы, пробелы и дефисы';
        isValid = false;
      }
      break;

    case 'phone':
      if (!value) {
        errorMessage = 'Введите номер телефона';
        isValid = false;
      } else {
        const phoneDigits = value.replace(/\D/g, '');
        // Проверяем что номер начинается с 7 или 8 и имеет 11 цифр
        if (phoneDigits.length !== 11 || !/^[78]/.test(phoneDigits)) {
          errorMessage =
            'Введите корректный номер телефона (например: +7(999)123-45-67)';
          isValid = false;
        }
      }
      break;

    case 'vin':
      if (value && !/^[A-HJ-NPR-Z0-9]{17}$/i.test(value)) {
        errorMessage = 'VIN должен содержать 17 символов (буквы и цифры)';
        isValid = false;
      }
      break;

    case 'part':
      if (value && value.length > 200) {
        errorMessage = 'Описание не должно превышать 200 символов';
        isValid = false;
      }
      break;

    case 'agreement':
      if (!value) {
        // для чекбокса value будет true/false
        errorMessage = 'Необходимо согласие на обработку персональных данных';
        isValid = false;
      }
      break;
  }

  // Показываем ошибку если есть
  if (!isValid && errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
    field.classList.add('error');
  } // В функции validateField, после строк field.classList.add('error');
  if (!isValid && errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
    field.classList.add('error');

    // Для чекбокса добавляем класс к родительскому label
    if (fieldId === 'agreement') {
      const checkboxLabel = field.closest('.modal-checkbox');
      if (checkboxLabel) {
        checkboxLabel.classList.add('error');
        checkboxLabel.classList.remove('valid');
      }
    }
  } else if (isValid && value) {
    if (field.type !== 'checkbox') {
      field.classList.add('valid');
    } else if (fieldId === 'agreement') {
      // Для чекбокса добавляем valid к label
      const checkboxLabel = field.closest('.modal-checkbox');
      if (checkboxLabel) {
        checkboxLabel.classList.add('valid');
        checkboxLabel.classList.remove('error');
      }
    }
  }
}

// Маска телефона
function initPhoneMask() {
  const phoneInput = document.getElementById('phone');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', function (e) {
    let value = this.value.replace(/\D/g, '');

    if (value.startsWith('7') || value.startsWith('8')) {
      value = '7' + value.substring(1);
    } else if (!value.startsWith('7')) {
      value = '7' + value;
    }

    let formatted = '+7';
    if (value.length > 1) {
      formatted += '(' + value.substring(1, 4);
    }
    if (value.length >= 4) {
      formatted += ')' + value.substring(4, 7);
    }
    if (value.length >= 7) {
      formatted += '-' + value.substring(7, 9);
    }
    if (value.length >= 9) {
      formatted += '-' + value.substring(9, 11);
    }

    this.value = formatted.substring(0, 16);
  });
}

// Автоматический верхний регистр для VIN
function initVINUppercase() {
  const vinInput = document.getElementById('vin');
  if (!vinInput) return;

  vinInput.addEventListener('input', function () {
    this.value = this.value.toUpperCase().replace(/\s/g, '');
  });
}

// Валидация всей формы
function validateForm() {
  let isValid = true;

  const fields = ['name', 'phone', 'vin', 'part', 'agreement'];
  fields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field && !validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

// Инициализация обработчиков формы
function initFormValidation() {
  const modalForm = document.getElementById('modalForm');
  if (!modalForm) return;

  // Инициализация масок
  initPhoneMask();
  initVINUppercase();

  // Валидация при вводе
  modalForm.querySelectorAll('input').forEach((input) => {
    input.addEventListener('blur', function () {
      validateField(this);
    });

    input.addEventListener('input', function () {
      const errorElement = document.getElementById(`${this.id}Error`);
      if (errorElement) {
        errorElement.style.display = 'none';
        this.classList.remove('error');
      }
    });
  });

  // Обработка отправки формы
  modalForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (isFormSubmitting) return;

    // Валидация формы
    if (!validateForm()) {
      return;
    }

    // Показываем состояние загрузки
    isFormSubmitting = true;
    const submitBtn = document.getElementById('submitBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const successMessage = document.getElementById('successMessage');

    if (submitBtn) submitBtn.disabled = true;
    if (loadingSpinner) loadingSpinner.style.display = 'inline-block';
    if (successMessage) {
      successMessage.style.display = 'none';
      successMessage.textContent = '';
    }

    // Сбор данных формы
    const formData = new FormData(this);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      vin: formData.get('vin') || '',
      part: formData.get('part') || '',
      agreement: formData.get('agreement') ? 'да' : 'нет',
    };

    try {
      // Отправка на сервер
      const response = await fetch('sendmail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data),
      });

      const responseText = await response.text();

      if (response.ok) {
        try {
          const result = JSON.parse(responseText);

          if (result.success || !result.error) {
            // Успешная отправка
            if (successMessage) {
              successMessage.textContent =
                result.message ||
                'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.';
              successMessage.style.color = '#4CAF50';
              successMessage.style.display = 'block';
            }

            // Сброс формы через 3 секунды
            setTimeout(() => {
              modalForm.reset();
              resetFormValidation();

              const modalOverlay = document.getElementById('modalOverlay');
              if (modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.classList.remove('modal-open');
              }
            }, 3000);
          } else {
            throw new Error(result.error || 'Ошибка сервера');
          }
        } catch (parseError) {
          // Если ответ не JSON, но статус OK
          if (successMessage) {
            successMessage.textContent =
              'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.';
            successMessage.style.color = '#4CAF50';
            successMessage.style.display = 'block';
          }

          setTimeout(() => {
            modalForm.reset();
            resetFormValidation();

            const modalOverlay = document.getElementById('modalOverlay');
            if (modalOverlay) {
              modalOverlay.classList.remove('active');
              document.body.classList.remove('modal-open');
            }
          }, 3000);
        }
      } else {
        throw new Error('Ошибка сервера: ' + response.status);
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);

      if (successMessage) {
        successMessage.textContent =
          'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или позвоните нам.';
        successMessage.style.color = '#f44336';
        successMessage.style.display = 'block';
      }

      isFormSubmitting = false;
      if (submitBtn) submitBtn.disabled = false;
      if (loadingSpinner) loadingSpinner.style.display = 'none';
    }
  });
}

// ======================== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ ========================
document.addEventListener('DOMContentLoaded', function () {
  // Инициализация формы
  initFormValidation();

  // Инициализация слайдера (если нужно)
  initSlider();
  initSliderHotkeys();

  // Инициализация аккордеона (если нужно)
  initWhyUsSection();

  // Инициализация модального окна
  initModal();

  // Инициализация мобильного меню
  initMobileMenu();

  // Инициализация плавной прокрутки
  initSmoothScroll();
});
