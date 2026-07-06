/**
 * Detail pages – theme toggle (shared with main site via localStorage).
 */
(function () {
  'use strict';

  const root = document.documentElement;

  function applyTheme(theme) {
    const normalized = theme === 'light' ? 'light' : 'dark';
    root.setAttribute('data-theme', normalized);
    const icon = document.querySelector('[data-theme-icon]');
    const btn = document.querySelector('[data-theme-toggle]');
    if (icon) {
      icon.className = normalized === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }
    if (btn) {
      const label = normalized === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const stored = localStorage.getItem('site-theme');
    applyTheme(stored === 'light' ? 'light' : 'dark');

    const btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem('site-theme', next);
      applyTheme(next);
    });
  });
})();
