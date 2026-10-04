// Home: animated "skills test run".
(function () {
  var btn = document.getElementById('go');
  if (!btn) return;
  var rows = document.querySelectorAll('#tests li');
  btn.addEventListener('click', function () {
    btn.disabled = true;
    rows.forEach(function (r) {
      r.removeAttribute('data-s');
      r.lastElementChild.textContent = 'running';
    });
    var i = 0;
    (function next() {
      if (i >= rows.length) { btn.disabled = false; btn.textContent = 'Run again'; return; }
      var r = rows[i++], ok = r.getAttribute('data-r') === 'pass';
      setTimeout(function () {
        r.setAttribute('data-s', ok ? 'pass' : 'learn');
        r.lastElementChild.textContent = ok ? 'PASS' : 'LEARNING';
        next();
      }, 420);
    })();
  });
})();
