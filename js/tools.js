// Tools: bug report writer.
(function () {
  var f = document.getElementById('bug-form');
  if (!f) return;
  var out = document.getElementById('bug-out');
  var copy = document.getElementById('copy');

  function v(name) { return f.elements[name].value.trim() || '(not filled in)'; }

  function render() {
    var raw = f.elements.steps.value.trim();
    var steps = raw
      ? raw.split('\n').filter(Boolean).map(function (line, i) {
          return (i + 1) + '. ' + line.replace(/^\d+[.)]\s*/, '');
        }).join('\n')
      : '(not filled in)';
    out.textContent =
      v('title') + '\n\n' +
      'Severity: ' + f.elements.severity.value + '\n' +
      'Environment: ' + v('env') + '\n\n' +
      'Steps to reproduce:\n' + steps + '\n\n' +
      'Expected result:\n' + v('expected') + '\n\n' +
      'Actual result:\n' + v('actual');
  }

  f.addEventListener('input', render);
  f.addEventListener('submit', function (e) { e.preventDefault(); });
  render();

  function done() {
    copy.textContent = 'Copied';
    setTimeout(function () { copy.textContent = 'Copy report'; }, 1500);
  }
  copy.addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(out.textContent).then(done);
    } else {
      var r = document.createRange();
      r.selectNodeContents(out);
      var sel = window.getSelection();
      sel.removeAllRanges(); sel.addRange(r);
      try { document.execCommand('copy'); done(); } catch (e) {}
    }
  });
})();
