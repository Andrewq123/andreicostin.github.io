// Runs on every page: theme toggle, reveal on scroll, counters, hero parallax.
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme');
  var light = root.getAttribute('data-theme') === 'light';

  function apply() {
    root.setAttribute('data-theme', light ? 'light' : 'dark');
    if (btn) {
      btn.setAttribute('aria-pressed', String(light));
      btn.textContent = light ? 'Lights off' : 'Lights on';
    }
  }
  apply();
  if (btn) {
    btn.addEventListener('click', function () {
      light = !light;
      apply();
      try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch (e) {}
    });
  }

  var reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var hasIO = 'IntersectionObserver' in window;

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if (hasIO && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Animated counters: <strong data-count="1000" data-suffix="+">
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var n = +el.dataset.count, suffix = el.dataset.suffix || '';
    if (reduce || !hasIO) { el.textContent = n + suffix; return; }
    el.textContent = 0;
    new IntersectionObserver(function (entries, o) {
      if (!entries[0].isIntersecting) return;
      o.disconnect();
      var t0 = null;
      (function step(t) {
        if (t0 === null) t0 = t;
        var p = Math.min((t - t0) / 1200, 1);
        el.textContent = Math.round(n * p) + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(step);
      })(performance.now());
    }).observe(el);
  });

  // Hero parallax
  var imgs = document.querySelectorAll('.hero-img');
  if (imgs.length && !reduce) {
    var busy = false;
    window.addEventListener('scroll', function () {
      if (busy) return;
      busy = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        imgs.forEach(function (im) { im.style.transform = 'translate3d(0,' + (y * 0.25) + 'px,0)'; });
        busy = false;
      });
    }, { passive: true });
  }
})();
