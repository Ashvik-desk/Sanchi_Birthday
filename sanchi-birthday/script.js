(function () {
  'use strict';

  /* ---------- Content (edit freely) ---------- */
  var SECRETS = [
    { tag: 'fact no. 1', text: 'You are now a year older and, statistically, a year more iconic. The data is clear.' },
    { tag: 'official ruling for Sachi Single', text: 'Today you are legally allowed to eat cake for breakfast. I checked.' },
    { tag: 'urgent request', text: 'Party chaiye mujhaaa!!! AAAAAAAAHHH!' },
    { tag: 'dear Height,', text: 'Thank you for being the person I can send forty-seven unhinged reels and messages to.' }
  ];

  // Put your photos in the images/ folder with these names (or change the src values).
  var SHOTS = [
    { src: 'images/photo-1.jpg', alt: 'Sanchi hiding her smile behind a cosy green and black knit sweater', ratio: '4/5', pos: '50% 62%', caption: 'cosy mode: on' },
    { src: 'images/photo-2.jpg', alt: 'Sanchi in a pink striped top and pink cap, taking a mirror selfie', ratio: '5/4', pos: '44% 50%', caption: 'pink alert' },
    { src: 'images/photo-3.jpg', alt: 'Sanchi in a heart-print sweater and sunglasses, leaning on an ornate railing with mountains behind', ratio: '3/4', pos: '50% 60%', caption: 'main character, mountain edition' },
    { src: 'images/photo-4.jpg', alt: 'Sanchi in a maroon outfit, mirror selfie in a carved frame', ratio: '3/4', pos: '38% 62%', caption: 'dressed to slay' },
    { src: 'images/photo-5.jpg', alt: 'Sanchi with three friends in sunglasses, taking a group selfie on a hillside', ratio: '4/3', pos: '50% 50%', caption: 'the squad, shades edition' },
    { src: 'images/photo-6.jpg', alt: 'Sanchi in a grey fuzzy hoodie and pixel sunglasses, laughing on a rooftop at night', ratio: '3/4', pos: '50% 40%', caption: 'rooftop, after dark' }
  ];
  var OFFSETS = [0, 36, 8, 24, 0, 36];
  var ROTS = [-3, 2.5, -1.5, 2, -2.5, 1.5];
  var TAPES = [-5, 4, -3, 6, -6, 3];

  /* ---------- Helpers ---------- */
  var seed = 11;
  function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- Starfield ---------- */
  var starColors = ['#fff3d6', '#fff3d6', '#c8b8ff', '#ffd98a', '#ffb0cf'];
  var starsEl = document.getElementById('stars');
  seed = 11;
  var frag = document.createDocumentFragment();
  for (var k = 0; k < 90; k++) {
    var sz = 1.5 + rnd() * 2.6;
    var x = Math.round(rnd() * 1000) / 10;
    var y = Math.round(rnd() * 1000) / 10;
    // the design draws x, y first and size is derived before; keep deterministic but simple
    var col = starColors[Math.floor(rnd() * starColors.length)];
    var dur = Math.round((2.4 + rnd() * 4) * 10) / 10;
    var delay = Math.round(rnd() * 60) / 10;
    var st = el('i');
    sz = Math.round(sz * 10) / 10;
    st.style.cssText = 'left:' + x + '%;top:' + y + '%;width:' + sz + 'px;height:' + sz + 'px;background:' + col +
      ';box-shadow:0 0 ' + Math.round(sz * 2.5) + 'px ' + col + ';--dur:' + dur + 's;--delay:' + delay + 's';
    frag.appendChild(st);
  }
  starsEl.appendChild(frag);

  /* ---------- Cake ---------- */
  var candleColors = ['#ffb0cf', '#c8b8ff', '#ffd98a', '#ffb0cf', '#c8b8ff'];
  var lit = [true, true, true, true, true];
  var candlesEl = document.getElementById('candles');
  var glow = document.getElementById('glow');
  var statusEl = document.getElementById('status');
  var mainBtn = document.getElementById('mainBtn');
  var wish = document.getElementById('wish');
  var confettiEl = document.getElementById('confetti');

  var candleEls = lit.map(function (_, idx) {
    var b = el('button', 'candle');
    b.type = 'button';
    b.innerHTML =
      '<div class="flame-anchor" aria-hidden="true">' +
        '<div class="flame-wrap"><div class="flame" style="--delay:' + (idx * 0.13) + 's"></div></div>' +
      '</div>' +
      '<div class="wick" aria-hidden="true"></div>' +
      '<div class="stick" aria-hidden="true" style="background:repeating-linear-gradient(-45deg,' + candleColors[idx] + ' 0 6px,rgba(255,255,255,.8) 6px 12px)"></div>';
    b.addEventListener('click', function () { if (lit[idx]) { lit[idx] = false; render(true); } });
    candlesEl.appendChild(b);
    return b;
  });

  function launchConfetti() {
    var colors = ['#ffd98a', '#ffb0cf', '#c8b8ff', '#fff3d6', '#9fe3d0'];
    confettiEl.textContent = '';
    var f = document.createDocumentFragment();
    var save = seed;
    seed = 4242;
    for (var n = 0; n < 46; n++) {
      var round = rnd() > 0.6;
      var p = el('i');
      p.style.cssText = 'left:' + (Math.round(rnd() * 1000) / 10) + '%;width:' + Math.round(7 + rnd() * 8) + 'px;height:' + Math.round(10 + rnd() * 12) +
        'px;border-radius:' + (round ? '50%' : '2px') + ';background:' + colors[Math.floor(rnd() * colors.length)] +
        ';--dur:' + (Math.round((2.6 + rnd() * 2.2) * 10) / 10) + 's;--delay:' + (Math.round(rnd() * 14) / 10) + 's';
      f.appendChild(p);
    }
    seed = save;
    confettiEl.appendChild(f);
  }

  var wasDone = false;
  function render(animate) {
    var count = lit.filter(Boolean).length;
    var done = count === 0;
    candleEls.forEach(function (b, idx) {
      var on = lit[idx];
      b.setAttribute('aria-label', on ? 'Blow out candle ' + (idx + 1) : 'Candle ' + (idx + 1) + ' is out');
      var fw = b.querySelector('.flame-wrap');
      fw.style.opacity = on ? 1 : 0;
      fw.style.transform = 'scale(' + (on ? 1 : 0.2) + ')';
      var anchor = b.querySelector('.flame-anchor');
      var smoke = anchor.querySelector('.smoke');
      if (!on && !smoke && animate) anchor.appendChild(el('div', 'smoke'));
      if (on && smoke) smoke.remove();
    });
    glow.style.opacity = Math.round((count / 5) * 100) / 100;
    statusEl.textContent = done ? 'Nicely done. Dark and dramatic.' : (count === 5 ? 'Five candles, all burning.' : count + ' still burning...');
    mainBtn.textContent = done ? "Relight them, I won't judge" : 'Blow them all out';
    wish.hidden = !done;
    if (done && !wasDone) launchConfetti();
    if (!done) confettiEl.textContent = '';
    wasDone = done;
  }
  mainBtn.addEventListener('click', function () {
    var allOut = lit.every(function (v) { return !v; });
    lit = lit.map(function () { return allOut; });
    render(true);
  });
  render(false);

  /* ---------- Secrets ---------- */
  var grid = document.getElementById('secretGrid');
  var foundLine = document.getElementById('foundLine');
  var found = 0;
  SECRETS.forEach(function (c, idx) {
    var card = el('div', 'secret rise');
    card.innerHTML =
      '<div class="secret-body"><div class="secret-tag">' + esc(c.tag) + '</div><div class="secret-text">' + esc(c.text) + '</div></div>';
    var foil = el('button', 'foil', 'scratch me');
    foil.type = 'button';
    foil.style.setProperty('--rot', (idx % 2 ? 4 : -4) + 'deg');
    foil.setAttribute('aria-label', 'Scratch to reveal secret ' + (idx + 1));
    foil.addEventListener('click', function () {
      if (foil.classList.contains('gone')) return;
      foil.classList.add('gone');
      foil.setAttribute('aria-label', 'Secret ' + (idx + 1) + ' revealed');
      foil.tabIndex = -1;
      found++;
      foundLine.textContent = found === SECRETS.length ? 'You found them all. Nerd. (Affectionate.)' : found + ' of ' + SECRETS.length + ' found.';
    });
    card.appendChild(foil);
    grid.appendChild(card);
  });

  /* ---------- Polaroids ---------- */
  var pols = document.getElementById('polaroids');
  SHOTS.forEach(function (sh, idx) {
    var item = el('div', 'pol-item rise');
    item.style.marginTop = OFFSETS[idx] + 'px';
    var fig = el('figure', 'pol');
    fig.style.setProperty('--rot', ROTS[idx] + 'deg');
    fig.style.setProperty('--tape', TAPES[idx] + 'deg');
    fig.style.setProperty('--ratio', sh.ratio);
    fig.style.setProperty('--pos', sh.pos);
    fig.appendChild(el('div', 'tape'));
    fig.lastChild.setAttribute('aria-hidden', 'true');

    var img = new Image();
    img.alt = sh.alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', function () {
      var slot = el('div', 'photo-slot',
        '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="12" cy="12" r="3.4"/><path d="M8 5l1.2-2h5.6L16 5"/></svg><span>photo goes here</span>');
      slot.setAttribute('role', 'img');
      slot.setAttribute('aria-label', sh.alt);
      if (img.parentNode) img.parentNode.replaceChild(slot, img);
    });
    img.src = sh.src;
    fig.appendChild(img);
    fig.appendChild(el('figcaption', null, esc(sh.caption)));
    item.appendChild(fig);
    pols.appendChild(item);
  });
})();
