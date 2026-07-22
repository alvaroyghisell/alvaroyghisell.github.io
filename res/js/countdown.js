/**
 * BODA GHISELL & ÁLVARO — Countdown Timer
 * Cuenta atrás hacia el 17 de octubre de 2026 a las 13:00 (hora de España)
 */
(function () {
  'use strict';

  // Wedding date: 17 Oct 2026, 13:00 CEST (UTC+2)
  const WEDDING_DATE = new Date('2026-10-17T13:00:00+02:00');

  const daysEl   = document.getElementById('countdown-days');
  const hoursEl  = document.getElementById('countdown-hours');
  const minsEl   = document.getElementById('countdown-mins');
  const secsEl   = document.getElementById('countdown-secs');
  const msgEl    = document.getElementById('countdown-message');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function update() {
    const now  = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
      daysEl.textContent  = '00';
      hoursEl.textContent = '00';
      minsEl.textContent  = '00';
      secsEl.textContent  = '00';
      if (msgEl) {
        msgEl.textContent = '¡Hoy es el gran día! 🎉';
      }
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins  = Math.floor((diff / (1000 * 60)) % 60);
    const secs  = Math.floor((diff / 1000) % 60);

    daysEl.textContent  = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent  = pad(mins);
    secsEl.textContent  = pad(secs);
  }

  // Initial update + interval
  update();
  setInterval(update, 1000);
})();
