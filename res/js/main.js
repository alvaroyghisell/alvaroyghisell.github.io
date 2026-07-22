/**
 * BODA GHISELL & ÁLVARO — Main Script
 * Scroll reveal animations & floating petals
 */
(function () {
  'use strict';

  /* ================================================
     SCROLL REVEAL — Intersection Observer
     ================================================ */
  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ================================================
     FLOATING PETALS — Decorative background
     ================================================ */
  function initPetals() {
    const containers = document.querySelectorAll('.floating-petals');
    containers.forEach(function (container) {
      const count = window.innerWidth < 768 ? 6 : 12;
      for (let i = 0; i < count; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.width = (4 + Math.random() * 8) + 'px';
        petal.style.height = petal.style.width;
        petal.style.animationDuration = (12 + Math.random() * 18) + 's';
        petal.style.animationDelay = (Math.random() * 15) + 's';
        container.appendChild(petal);
      }
    });
  }

  /* ================================================
     SMOOTH SCROLL for hero scroll-down indicator
     ================================================ */
  function initSmoothScroll() {
    const scrollBtn = document.getElementById('hero-scroll');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', function () {
        const target = document.getElementById('intro');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  /* ================================================
     INIT
     ================================================ */
  function init() {
    initReveal();
    initPetals();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
