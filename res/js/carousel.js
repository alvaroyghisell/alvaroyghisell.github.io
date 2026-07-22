/**
 * BODA GHISELL & ÁLVARO — Carousel
 * Crossfade image carousel with autoplay & dots
 */
(function () {
  'use strict';

  const TOTAL_IMAGES = 8;
  const BASE_URL =
    'https://raw.githubusercontent.com/alvaroyghisell/alvaroyghisell.github.io/refs/heads/main/res/img/';
  const AUTOPLAY_INTERVAL = 5000; // ms

  const carouselEl = document.getElementById('carousel');
  const dotsContainer = document.getElementById('carousel-dots');

  let slides = [];
  let dots = [];
  let current = 0;
  let timer = null;

  /**
   * Create slides and dots dynamically
   */
  function init() {
    for (let i = 1; i <= TOTAL_IMAGES; i++) {
      // Slide
      const slide = document.createElement('div');
      slide.className = 'carousel__slide' + (i === 1 ? ' active' : '');
      const img = document.createElement('img');
      img.src = BASE_URL + i + '.jpeg';
      img.alt = 'Ghisell y Álvaro — Foto ' + i;
      img.loading = i <= 2 ? 'eager' : 'lazy';
      slide.appendChild(img);
      carouselEl.appendChild(slide);
      slides.push(slide);

      // Dot
      const dot = document.createElement('button');
      dot.className = 'carousel__dot' + (i === 1 ? ' active' : '');
      dot.setAttribute('aria-label', 'Foto ' + i);
      dot.addEventListener('click', function () {
        goTo(i - 1);
        resetTimer();
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }

    startTimer();
  }

  /**
   * Navigate to a specific slide
   */
  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  /**
   * Advance to next slide
   */
  function next() {
    goTo((current + 1) % TOTAL_IMAGES);
  }

  /**
   * Autoplay management
   */
  function startTimer() {
    timer = setInterval(next, AUTOPLAY_INTERVAL);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  // Pause on tab hidden
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      clearInterval(timer);
    } else {
      resetTimer();
    }
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  carouselEl.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carouselEl.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left → next
        goTo((current + 1) % TOTAL_IMAGES);
      } else {
        // Swipe right → prev
        goTo((current - 1 + TOTAL_IMAGES) % TOTAL_IMAGES);
      }
      resetTimer();
    }
  }

  // Init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
