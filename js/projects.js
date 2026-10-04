// Projects: filter cards by tag (exact match, so "Java" does not match "JavaScript").
(function () {
  var chips = document.querySelectorAll('.chip');
  if (!chips.length) return;
  var cards = document.querySelectorAll('.card[data-tags]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (x) { x.setAttribute('aria-pressed', String(x === chip)); });
      var tag = chip.dataset.tag;
      cards.forEach(function (card) {
        var tags = card.dataset.tags.split('|');
        card.hidden = tag !== 'all' && tags.indexOf(tag) < 0;
      });
    });
  });
})();
