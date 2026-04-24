
  const cardWidth = 404; // 380 + 24 gap

  // SLIDER
  let slideIndex = 0;
  const track = document.getElementById('sliderTrack');
  const dotsEl = document.getElementById('dots');

  function sliderCardCount() {
    return document.querySelectorAll('.car-card').length;
  }

  function sliderVisible() {
    const container = document.querySelector('.slider-container');
    if (!container) return 1;
    return Math.max(1, Math.floor(container.offsetWidth / cardWidth));
  }

  function sliderMax() {
    return Math.max(0, sliderCardCount() - sliderVisible());
  }

  function renderSliderDots() {
    if (!dotsEl) return;
    const max = sliderMax();
    dotsEl.innerHTML = '';
    for (let i = 0; i <= max; i++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'dot' + (i === slideIndex ? ' active' : '');
      b.setAttribute('aria-label', 'Слайд ' + (i + 1) + ' из ' + (max + 1));
      b.addEventListener('click', () => goSlide(i));
      dotsEl.appendChild(b);
    }
  }

  function goSlide(n) {
    const max = sliderMax();
    slideIndex = Math.max(0, Math.min(n, max));
    if (track) track.style.transform = 'translateX(-' + (slideIndex * cardWidth) + 'px)';
    if (!dotsEl) return;
    dotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === slideIndex));
  }

  function nextSlideAuto() {
    const max = sliderMax();
    goSlide(slideIndex >= max ? 0 : slideIndex + 1);
  }

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.addEventListener('click', () => goSlide(slideIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => nextSlideAuto());

  function initSlider() {
    slideIndex = Math.min(slideIndex, sliderMax());
    renderSliderDots();
    goSlide(slideIndex);
  }
  initSlider();
  window.addEventListener('resize', initSlider);
  setInterval(nextSlideAuto, 4000);

  // FAQ
  function toggleFaq(el) {
    const item = el.parentElement;
    item.classList.toggle('open');
  }

  function validPhone(str) {
    const digits = String(str).replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15;
  }

  // MODAL
  function openModal() {
    document.getElementById('modal').classList.add('open');
    document.body.style.overflow = 'hidden';
    document.getElementById('modalSuccess').style.display = 'none';
    document.getElementById('fg-mname').classList.remove('has-error');
    document.getElementById('fg-mphone').classList.remove('has-error');
  }
  function closeModal() {
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });

  document.querySelectorAll('[data-callback]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  });

  function submitModal() {
    const name = document.getElementById('mname').value.trim();
    const phone = document.getElementById('mphone').value.trim();
    let ok = true;
    document.getElementById('fg-mname').classList.toggle('has-error', name.length < 2);
    document.getElementById('fg-mphone').classList.toggle('has-error', !validPhone(phone));
    if (name.length < 2 || !validPhone(phone)) ok = false;
    if (!ok) return;
    document.getElementById('modalSuccess').style.display = 'block';
    document.getElementById('mname').value = '';
    document.getElementById('mphone').value = '';
    setTimeout(closeModal, 2500);
  }


  // VALID PHONE (твоя логіка тут)
  function validPhone(phone) {
    return phone.replace(/\D/g, '').length >= 10;
  }
  // CLEAR ERROR ON INPUT
  function bindClearErrors(ids) {
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      el.addEventListener('input', () => {
        const group = document.getElementById('fg-' + id);
        if (group) group.classList.remove('has-error');
      });
    });
  }

  bindClearErrors(['fname', 'fphone', 'mname', 'mphone']);

  // MAIN FORM
  const mainForm = document.getElementById('mainForm');

  if (mainForm) {
    mainForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fname').value.trim();
      const phone = document.getElementById('fphone').value.trim();

      const nameError = name.length < 2;
      const phoneError = !validPhone(phone);

      document.getElementById('fg-fname').classList.toggle('has-error', nameError);
      document.getElementById('fg-fphone').classList.toggle('has-error', phoneError);

      if (nameError || phoneError) return;

      // SUCCESS
      document.getElementById('successMsg').style.display = 'block';

      mainForm.reset();
    });
  }

  // MODAL FORM (працює навіть якщо дублюється)
  document.addEventListener('submit', (e) => {

    if (e.target && e.target.id === 'modalForm') {
      e.preventDefault();

      const name = document.getElementById('mname').value.trim();
      const phone = document.getElementById('mphone').value.trim();

      const nameError = name.length < 2;
      const phoneError = !validPhone(phone);

      document.getElementById('fg-mname').classList.toggle('has-error', nameError);
      document.getElementById('fg-mphone').classList.toggle('has-error', phoneError);

      if (nameError || phoneError) return;

      // SUCCESS
      document.getElementById('modalSuccess').style.display = 'block';

      e.target.reset();

      setTimeout(() => {
        document.getElementById('modalSuccess').style.display = 'none';
      }, 2500);
    }

  });
  // function submitForm() {
  //   const name = document.getElementById('fname').value.trim();
  //   const phone = document.getElementById('fphone').value.trim();
  //   document.getElementById('fg-fname').classList.toggle('has-error', name.length < 2);
  //   document.getElementById('fg-fphone').classList.toggle('has-error', !validPhone(phone));
  //   if (name.length < 2 || !validPhone(phone)) return;
  //   document.getElementById('successMsg').style.display = 'block';
  //   document.getElementById('fname').value = '';
  //   document.getElementById('fphone').value = '';
  //   document.getElementById('fcar').value = '';
  //   document.getElementById('fcomment').value = '';
  //   document.getElementById('fg-fname').classList.remove('has-error');
  //   document.getElementById('fg-fphone').classList.remove('has-error');
  // }

  // ['fname', 'fphone'].forEach(function(id) {
  //   const el = document.getElementById(id);
  //   if (el) el.addEventListener('input', function() {
  //     document.getElementById('fg-' + (id === 'fname' ? 'fname' : 'fphone')).classList.remove('has-error');
  //   });
  // });

  // SHIPPING CALC
    function calcShipping() {
    const country = document.getElementById('cCountry').value;
    const price = parseFloat(document.getElementById('cPrice').value) || 0;
    const engine = parseFloat(document.getElementById('cEngine').value) || 2.0;
    const year = parseInt(document.getElementById('cYear').value, 10) || 2022;

    const engineType = document.getElementById('cEngineType').value;

    const now = new Date().getFullYear();
    const age = now - year;

    
    // =========================
    let shipping = 1500;

    if (country === 'usa') shipping = 1800;
    if (country === 'korea') shipping = 1200;
    if (country === 'china') shipping = 1400;


    // =========================
    let coef = 1;

    if (engineType === 'hybrid') coef = 0.55;
    if (engineType === 'electric') coef = 0;


    // =========================
    let duty = price * 0.1;

    if (engineType === 'electric') duty = 0;


    // =========================
    const baseRate =
      engine <= 1.5 ? 50 :
      engine <= 2.0 ? 65 :
      engine <= 2.5 ? 100 : 130;

    let excise = baseRate * engine * age * coef;

    if (engineType === 'electric') {
      excise = 100 * age; 
    }

    // =========================
    let vat = (price + duty + excise) * 0.2;

    if (engineType === 'electric') {
      vat = 0;
    }

    // =========================
    const customs = Math.round((duty + excise + vat) / 100) * 100;

    const serviceFee = 1200;

    const total = Math.round((price + shipping + customs + serviceFee) / 100) * 100;

    // =========================
    document.getElementById('rShipping').textContent = '$' + shipping.toLocaleString('ru');
    document.getElementById('rCustoms').textContent = '$' + customs.toLocaleString('ru');
    document.getElementById('rTotal').textContent = '$' + total.toLocaleString('ru');
  }

  calcShipping();
    
  // function calcShipping() {
  //   const country = document.getElementById('cCountry').value;
  //   const price = parseFloat(document.getElementById('cPrice').value) || 0;
  //   const engine = parseFloat(document.getElementById('cEngine').value) || 2.0;
  //   const year = parseInt(document.getElementById('cYear').value, 10) || 2022;
  //   const now = new Date().getFullYear();
  //   const age = now - year;

  //   const shipping = country === 'usa' ? 1800 : country === 'korea' ? 1200 : 1400;

  //   const exciseBase = engine <= 1.5 ? 54 : engine <= 2.0 ? 67.5 : engine <= 2.5 ? 105 : 135;
  //   const excise = exciseBase * engine * 1000 * (age > 5 ? 1.5 : 1) / 100 * engine;
  //   const duty = price * 0.1;
  //   const vat = (price + duty + excise) * 0.2;
  //   const customs = Math.round((excise + duty + vat) / 100) * 100;
  //   const ourFee = 1200;

  //   const total = Math.round((price + shipping + customs + ourFee) / 100) * 100;

  //   document.getElementById('rShipping').textContent = '$' + shipping.toLocaleString('ru');
  //   document.getElementById('rCustoms').textContent = '$' + customs.toLocaleString('ru');
  //   document.getElementById('rTotal').textContent = '$' + total.toLocaleString('ru');
  // }
  // calcShipping();

  // SCROLL REVEAL
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '.why-card, .step, .country-card, .review-card, .faq-item, .car-card, .credit-benefit, .calc-wrapper, .contact-inner > div'
  ).forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity .65s ease, transform .65s ease';
    observer.observe(el);
  });


  // cookie
  const modal = document.getElementById('cookieModal');
  const acceptBtn = document.getElementById('acceptCookies');
  const declineBtn = document.getElementById('declineCookies');

  // перевіряємо cookie
  function getCookie(name) {
    return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
  }

  // якщо ще не було вибору — показуємо
  if (!getCookie('cookieConsent')) {
    modal.classList.add('active');
  }

  // прийняти
  acceptBtn.addEventListener('click', () => {
    document.cookie = "cookieConsent=accepted; path=/; max-age=31536000";
    modal.classList.remove('active');
  });

  // відхилити
  declineBtn.addEventListener('click', () => {
    document.cookie = "cookieConsent=declined; path=/; max-age=31536000";
    modal.classList.remove('active');
  });

 // маска телефона
//  function maskGeoMobile(input) {
//   if (!input) return;

//   input.addEventListener('input', () => {
//     let digits = input.value.replace(/\D/g, '');

//     if (!digits.startsWith('995')) {
//       digits = '995' + digits;
//     }

//     digits = digits.substring(0, 12);

//     let result = '+995';

//     if (digits.length > 3) {
//       result += ' ' + digits.substring(3, 6);
//     }
//     if (digits.length >= 7) {
//       result += ' ' + digits.substring(6, 9);
//     }
//     if (digits.length >= 10) {
//       result += ' ' + digits.substring(9, 12);
//     }

//     input.value = result;
//   });

//   input.addEventListener('focus', () => {
//     if (!input.value) input.value = '+995 ';
//   });

//   input.addEventListener('blur', () => {
//     const digits = input.value.replace(/\D/g, '');
//     if (digits.length < 12) input.value = '';
//   });
// }

// // 🔥 головне — ініціалізація після завантаження DOM
// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('.phone-input').forEach(input => {
//     maskGeoMobile(input);
//   });

//   maskGeoMobile(document.querySelector('.phone-input:last-child'));
// });