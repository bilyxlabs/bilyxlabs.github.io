/**
 * Bilyx theme bootstrap – runs in <head> before paint.
 * Default: dark. Only uses light if the user previously chose light.
 * Also normalizes /index.html URLs to / for clean root URLs.
 */
(function () {
  var stored = localStorage.getItem('site-theme');
  var theme = stored === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);

  var path = window.location.pathname;
  if (/\/index\.html$/i.test(path)) {
    var cleanPath = path.replace(/\/index\.html$/i, '/') || '/';
    window.history.replaceState(
      null,
      '',
      cleanPath + window.location.search + window.location.hash
    );
  }
})();
