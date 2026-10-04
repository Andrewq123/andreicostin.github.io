// Contact: validate in the browser, then open the visitor's email app with the message filled in.
// (GitHub Pages is static, so there is no server to receive a form.)
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var box = document.getElementById('form-error');
  var ok = document.getElementById('form-ok');
  var TO = 'acindustries.business@gmail.com';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    var message = form.elements.message.value.trim();
    var problems = [];
    if (!name) problems.push('Enter your name.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) problems.push('Enter a valid email address.');
    if (message.length < 10) problems.push('Write a message of at least 10 characters.');

    if (problems.length) {
      box.textContent = problems.join(' ');
      box.hidden = false;
      ok.hidden = true;
      return;
    }
    box.hidden = true;
    var subject = 'Portfolio message from ' + name;
    var body = message + '\n\n' + name + ' (' + email + ')';
    window.location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    ok.hidden = false;
  });
})();
