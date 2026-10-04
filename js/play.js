// Play: Bug Squash game and JARVIS-lite command box.

// ---------- Bug Squash ----------
(function () {
  var arena = document.getElementById('arena');
  if (!arena) return;
  var scoreEl = document.getElementById('score');
  var timeEl = document.getElementById('time');
  var bestEl = document.getElementById('best');
  var startBtn = document.getElementById('start');
  var cells = [], best = 0, score = 0, left = 30, tick, spawn, active = -1;

  try { best = +localStorage.getItem('best') || 0; } catch (e) {}
  bestEl.textContent = best;

  for (var i = 0; i < 12; i++) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'cell';
    b.disabled = true;
    b.setAttribute('aria-label', 'Empty square');
    arena.appendChild(b);
    cells.push(b);
  }

  function clearBug() {
    if (active >= 0) {
      cells[active].textContent = '';
      cells[active].classList.remove('bug');
      cells[active].setAttribute('aria-label', 'Empty square');
    }
    active = -1;
  }
  function showBug() {
    clearBug();
    active = Math.floor(Math.random() * cells.length);
    cells[active].textContent = '\uD83D\uDC1E';
    cells[active].classList.add('bug');
    cells[active].setAttribute('aria-label', 'Bug, squash it');
  }
  cells.forEach(function (c, idx) {
    c.addEventListener('click', function () {
      if (idx === active) { score++; scoreEl.textContent = score; showBug(); }
    });
  });
  function end() {
    clearInterval(tick); clearInterval(spawn); clearBug();
    cells.forEach(function (c) { c.disabled = true; });
    startBtn.disabled = false;
    startBtn.textContent = 'Play again';
    if (score > best) {
      best = score; bestEl.textContent = best;
      try { localStorage.setItem('best', best); } catch (e) {}
    }
  }
  startBtn.addEventListener('click', function () {
    score = 0; left = 30;
    scoreEl.textContent = 0; timeEl.textContent = 30;
    cells.forEach(function (c) { c.disabled = false; });
    startBtn.disabled = true;
    showBug();
    spawn = setInterval(showBug, 900);
    tick = setInterval(function () {
      left--; timeEl.textContent = left;
      if (left <= 0) end();
    }, 1000);
  });
})();

// ---------- JARVIS-lite (fixed answers, not a real AI) ----------
(function () {
  var form = document.getElementById('term-form');
  if (!form) return;
  var out = document.getElementById('term-out');
  var inp = document.getElementById('term-in');

  var jokes = [
    "A QA engineer walks into a bar. Orders 1 beer, 0 beers, 99999 beers, -1 beers and a lizard.",
    "There are 10 kinds of people: those who understand binary and those who don't.",
    "It works on my machine.",
    "A programmer's partner says: go to the shop, buy milk, and if they have eggs, buy 6. He came back with 6 milks."
  ];
  var cmds = {
    help: function () { return "Commands: about, skills, projects, games, contact, joke, time, theme, clear"; },
    hello: function () { return "Hello! I'm a small demo, not a real AI."; },
    about: function () { return "Andrei Costin. Junior QA tester and C++ developer, looking for part-time, remote work."; },
    skills: function () { return "C++ (advanced), Java, Python, HTML/CSS/JS, manual testing and debugging. Learning C."; },
    projects: function () { return "PYRO (my JARVIS-style assistant), a Java schedule app, web and console games, and C++ games in development. See the Projects page."; },
    games: function () { return "Try Bug Squash above."; },
    contact: function () { return "acindustries.business@gmail.com"; },
    joke: function () { return jokes[Math.floor(Math.random() * jokes.length)]; },
    time: function () { return new Date().toLocaleTimeString(); }
  };

  function print(text, cls) {
    var p = document.createElement('p');
    p.textContent = text;
    if (cls) p.className = cls;
    out.appendChild(p);
    out.scrollTop = out.scrollHeight;
  }
  print("JARVIS-lite is online. Type help.");

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = inp.value.trim().toLowerCase();
    inp.value = '';
    if (!q) return;
    print('> ' + q, 'me');
    if (q === 'clear') { out.textContent = ''; return; }
    if (q === 'theme') {
      var t = document.getElementById('theme');
      if (t) t.click();
      print("Theme switched.");
      return;
    }
    if (Object.prototype.hasOwnProperty.call(cmds, q)) print(cmds[q]());
    else print("I don't know \"" + q + "\" yet. Type help.");
  });
})();
