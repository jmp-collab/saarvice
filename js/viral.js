/**
 * SAARVICE V3 — 100X SAARLAND VIRALITY ENGINE (js/viral.js)
 *
 * Implementiert sämtliche 100 Viralitäts-Mechaniken für die KPI:
 * "Maximale Viralität unter Saarländern" (Zero External Dependencies).
 */
(function () {
  'use strict';

  function $(id) { return document.getElementById(id); }

  /* ------------------------------------------------------------------ *
   * 1. SYNTHESIZED WEB-AUDIO SOUNDBOARD (#051, #060)
   * ------------------------------------------------------------------ */
  var ViralAudio = (function () {
    var ctx = null;
    function getCtx() {
      if (!ctx && (window.AudioContext || window.webkitAudioContext)) {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (ctx && ctx.state === 'suspended') ctx.resume();
      return ctx;
    }

    function sizzle() {
      var c = getCtx(); if (!c) return;
      var len = Math.floor(c.sampleRate * 0.4);
      var buf = c.createBuffer(1, len, c.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * 0.16));
      var src = c.createBufferSource(); src.buffer = buf;
      var f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 3200;
      var g = c.createGain(); g.gain.setValueAtTime(0.35, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.38);
      src.connect(f); f.connect(g); g.connect(c.destination); src.start();
    }

    function maggiPlop() {
      var c = getCtx(); if (!c) return;
      var o = c.createOscillator(), g = c.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(750, c.currentTime);
      o.frequency.exponentialRampToValueAtTime(210, c.currentTime + 0.13);
      g.gain.setValueAtTime(0.35, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.14);
      o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.15);
    }

    function grubenHorn() {
      var c = getCtx(); if (!c) return;
      var o1 = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain();
      o1.type = 'sawtooth'; o2.type = 'sawtooth';
      o1.frequency.setValueAtTime(110, c.currentTime);
      o2.frequency.setValueAtTime(165, c.currentTime);
      var f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 480;
      g.gain.setValueAtTime(0.25, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.75);
      o1.connect(f); o2.connect(f); f.connect(g); g.connect(c.destination);
      o1.start(); o2.start(); o1.stop(c.currentTime + 0.75); o2.stop(c.currentTime + 0.75);
    }

    function stubbiPlop() {
      var c = getCtx(); if (!c) return;
      var o = c.createOscillator(), g = c.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(180, c.currentTime);
      o.frequency.exponentialRampToValueAtTime(920, c.currentTime + 0.09);
      g.gain.setValueAtTime(0.45, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.12);
      o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.13);
      setTimeout(sizzle, 75);
    }

    function crunchCut() {
      var c = getCtx(); if (!c) return;
      var len = Math.floor(c.sampleRate * 0.22);
      var buf = c.createBuffer(1, len, c.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (i % 40 < 20 ? 1 : 0.2) * Math.exp(-i / (c.sampleRate * 0.1));
      var src = c.createBufferSource(); src.buffer = buf;
      var f = c.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 1600;
      var g = c.createGain(); g.gain.value = 0.4;
      src.connect(f); f.connect(g); g.connect(c.destination); src.start();
    }

    function brassStamp() {
      var c = getCtx(); if (!c) return;
      var o = c.createOscillator(), g = c.createGain();
      o.type = 'square';
      o.frequency.setValueAtTime(95, c.currentTime);
      o.frequency.exponentialRampToValueAtTime(42, c.currentTime + 0.18);
      g.gain.setValueAtTime(0.4, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.19);
      o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.2);
    }

    return {
      sizzle: sizzle,
      maggi: maggiPlop,
      horn: grubenHorn,
      stubbi: stubbiPlop,
      cut: crunchCut,
      stamp: brassStamp
    };
  })();

  /* ------------------------------------------------------------------ *
   * 2. DIELECTRIC BUCHENFUNKEN BURST & KONFETTI (#030, #052)
   * ------------------------------------------------------------------ */
  function spawnSparks(x, y, count) {
    var n = count || 14;
    for (var i = 0; i < n; i++) {
      var el = document.createElement('span');
      el.style.position = 'fixed';
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.width = '6px';
      el.style.height = '6px';
      el.style.borderRadius = '50%';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '9999';
      el.style.background = i % 2 === 0 ? '#e3b23c' : '#d94f3d';
      el.style.boxShadow = '0 0 8px #e3b23c';
      document.body.appendChild(el);

      var angle = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.5;
      var dist = 30 + Math.random() * 65;
      var dx = Math.cos(angle) * dist;
      var dy = Math.sin(angle) * dist - 20;

      el.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(0.1)', opacity: 0 }
      ], { duration: 520 + Math.random() * 250, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' })
        .onfinish = function () { el.remove(); };
    }
  }

  function triggerSaarlandExplosion() {
    ViralAudio.horn();
    var icons = ['🥩', '🔥', '💧', '🥖', '🍺', '🥨', '⚒️'];
    for (var i = 0; i < 32; i++) {
      (function (idx) {
        var item = document.createElement('div');
        item.textContent = icons[idx % icons.length];
        item.style.position = 'fixed';
        item.style.left = Math.random() * 96 + 'vw';
        item.style.top = '-40px';
        item.style.fontSize = (20 + Math.random() * 18) + 'px';
        item.style.zIndex = '9999';
        item.style.pointerEvents = 'none';
        document.body.appendChild(item);
        item.animate([
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          { transform: 'translateY(105vh) rotate(' + (Math.random() * 360) + 'deg)', opacity: 0.2 }
        ], { duration: 1800 + Math.random() * 1200, easing: 'ease-in' })
          .onfinish = function () { item.remove(); };
      })(i);
    }
  }

  /* ------------------------------------------------------------------ *
   * 3. SAARLAND-STEMPELHEFT (ACHIEVEMENT ENGINE) (#028, #029)
   * ------------------------------------------------------------------ */
  var STAMPS_KEY = 'saarvice_stamps_v3';
  var unlockedStamps = { visit: true };
  try {
    var savedStamps = JSON.parse(localStorage.getItem(STAMPS_KEY) || '{}');
    for (var k in savedStamps) if (savedStamps[k]) unlockedStamps[k] = true;
  } catch (e) {}

  function unlockStamp(id) {
    unlockedStamps[id] = true;
    try { localStorage.setItem(STAMPS_KEY, JSON.stringify(unlockedStamps)); } catch (e) {}
    renderStamps();
  }

  function renderStamps() {
    var total = 0;
    var slots = document.querySelectorAll('.stamp-slot');
    slots.forEach(function (slot) {
      var sid = slot.getAttribute('data-stamp-id');
      if (unlockedStamps[sid]) {
        slot.classList.add('unlocked');
        total++;
      }
    });
    if (!slots.length) {
      total = Object.keys(unlockedStamps).length;
    }
    var pillVal = $('stamp-count-val');
    var bookTxt = $('booklet-progress-text');
    if (pillVal) pillVal.textContent = String(Math.min(8, total));
    if (bookTxt) bookTxt.textContent = Math.min(8, total) + ' / 8 Stempel';

    if (total >= 5) {
      var chip = $('wallet-tier-chip');
      if (chip && chip.textContent.indexOf('EHREN') === -1) {
        chip.textContent = 'STUFE 4: EHRENGAST DIGITAL ★';
      }
    }
  }

  /* ------------------------------------------------------------------ *
   * 4. HEADER CONTROLS: TAGESZEIT, DIALEKT-MODUS, COLORWAYS, ZOLL (#001, #005, #024, #054, #055)
   * ------------------------------------------------------------------ */
  function initHeaderControls() {
    // Scroll Heat Bar (#055)
    var heatBar = $('scroll-heat-bar');
    if (heatBar) {
      window.addEventListener('scroll', function () {
        var docH = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docH > 0 ? Math.min(100, Math.max(0, (window.scrollY / docH) * 100)) : 0;
        heatBar.style.width = pct + '%';
      }, { passive: true });
    }

    // Tageszeit-Begrüßung uff Platt (#005)
    var greetEl = $('saar-time-greeting');
    if (greetEl) {
      var hr = new Date().getHours();
      if (hr < 10) greetEl.textContent = '☕ Gude Morje! Erstmal Kaffee, dann Schwenker.';
      else if (hr < 14) greetEl.textContent = '🔥 Mahlzeit! Um zwölf wird geschwenkt, ne?';
      else if (hr < 18) greetEl.textContent = '🥖 Gude! Zeit für e Sando & e kaltes Shandy.';
      else if (hr < 22) greetEl.textContent = '🍺 N\'Owend! Das Buchenfeuer glüht schon.';
      else greetEl.textContent = '⚒️ Nachtschicht uff der Grub? Hauptsach gudd gess!';
    }

    // Referral Detection (#050)
    try {
      var params = new URLSearchParams(window.location.search);
      var ref = params.get('ref');
      if (ref && $('ref-welcome-banner')) {
        $('ref-sender-code').textContent = '#' + ref.replace(/[^a-zA-Z0-9_-]/g, '');
        $('ref-welcome-banner').hidden = false;
        unlockStamp('visit');
      }
    } catch (e) {}

    // Globaler Dialekt-Umschalter (#001, #009)
    var dialectBtn = $('dialect-toggle-btn');
    var dialectLbl = $('dialect-mode-label');
    var isPlatt = false;
    try { isPlatt = localStorage.getItem('saarvice_dialect') === 'platt'; } catch (e) {}

    function applyDialect(platt) {
      isPlatt = platt;
      try { localStorage.setItem('saarvice_dialect', platt ? 'platt' : 'de'); } catch (e) {}
      if (dialectBtn) dialectBtn.classList.toggle('is-platt', platt);
      if (dialectLbl) dialectLbl.textContent = platt ? '100% Saarlännisch' : 'Hochdeutsch';

      document.querySelectorAll('[data-saar]').forEach(function (el) {
        if (!el.getAttribute('data-orig')) {
          el.setAttribute('data-orig', el.textContent);
        }
        el.textContent = platt ? el.getAttribute('data-saar') : el.getAttribute('data-orig');
      });
      if (platt) unlockStamp('platt');
    }

    if (dialectBtn) {
      dialectBtn.addEventListener('click', function () {
        ViralAudio.maggi();
        applyDialect(!isPlatt);
      });
      if (isPlatt) applyDialect(true);
    }

    // Cult Colorway Switcher (#054)
    var themeBtn = $('theme-cycle-btn');
    var themeLbl = $('theme-mode-label');
    var themes = [
      { id: 'saarkohle', label: 'Saarkohle' },
      { id: 'hochofen', label: 'Hochofen-Glut' },
      { id: 'viezkeller', label: 'Viez-Keller' },
      { id: 'grubengold', label: 'Grubengold UV' }
    ];
    var tIdx = 0;

    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        tIdx = (tIdx + 1) % themes.length;
        var t = themes[tIdx];
        if (t.id === 'saarkohle') document.documentElement.removeAttribute('data-theme');
        else document.documentElement.setAttribute('data-theme', t.id);
        if (themeLbl) themeLbl.textContent = t.label;
        ViralAudio.stamp();
      });
    }

    // Pälzer-Zollkontrolle (#024)
    var zollBtn = $('paelzer-zoll-btn');
    if (zollBtn) {
      zollBtn.addEventListener('click', function () {
        ViralAudio.horn();
        var msg = '🛂 SAARLÄNDISCHE GRENZ- & KULTURKONTROLLE\n\n' +
          'Frage 1: Sagst du „Schwenker“ oder „Rollbraten“?\n' +
          'Frage 2: Trinkst du dein Bier aus dem 0,33l Stubbi?\n\n' +
          '✅ TAGES-VISUM ERTEILT: Auch Freunde aus der Pfalz & dem Rest der Republik bekommen bei SAARVICE volles kulinarisches Asyl — solange kein Gasgrill mitgebracht wird!';
        alert(msg);
      });
    }

    // 5x Logo-Click oder Keyboard "0681" / "maggi" Easter Egg (#030)
    var logoLink = $('nav-logo-link');
    var clicks = 0;
    if (logoLink) {
      logoLink.addEventListener('click', function () {
        clicks++;
        if (clicks >= 5) {
          clicks = 0;
          triggerSaarlandExplosion();
        }
      });
    }

    var keyBuf = '';
    window.addEventListener('keydown', function (e) {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      keyBuf = (keyBuf + (e.key || '').toLowerCase()).slice(-8);
      if (keyBuf.indexOf('0681') !== -1 || keyBuf.indexOf('maggi') !== -1 || keyBuf.indexOf('saar') !== -1) {
        keyBuf = '';
        triggerSaarlandExplosion();
      }
    });

    // Tab Visibility Title Switcher (#093)
    var origTitle = document.title;
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        document.title = '🔥 Uffbasse! Dei Schwenker brennt an! — SAARVICE';
      } else {
        document.title = origTitle;
      }
    });
  }

  /* ------------------------------------------------------------------ *
   * 5. ANISOTROPIC SHEEN, SOUNDBOARD, SCHWENKER-COMBO & MAGGI (#012, #025, #051, #053, #069)
   * ------------------------------------------------------------------ */
  function initSensoryAndMenuExtras() {
    // Anisotropic Mouse Tracking on Cards (#053)
    document.querySelectorAll('.dish-card, .side-card, .viral-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', (e.clientX - r.left) + 'px');
        card.style.setProperty('--mouse-y', (e.clientY - r.top) + 'px');
      });
    });

    // Soundboard Pads (#051)
    document.querySelectorAll('.sound-pad-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var s = btn.getAttribute('data-sound');
        if (ViralAudio[s]) ViralAudio[s]();
        spawnSparks(e.clientX || window.innerWidth / 2, e.clientY || 200, 10);
      });
    });

    // Schwenker Cockpit Score & Bier-Verbot (#025, #026)
    var score = 100;
    var swingBtn = $('cockpit-swing-btn');
    var flipBtn = $('cockpit-flip-btn');
    var bierBtn = $('cockpit-bier-btn');
    var statusEl = $('telemetry-status');
    var umamiEl = $('telemetry-umami');

    if (swingBtn) {
      swingBtn.addEventListener('click', function (e) {
        score += 15;
        if (umamiEl) umamiEl.textContent = score + ' Pkt.';
        if (statusEl) {
          statusEl.style.color = '#3d8b5c';
          statusEl.textContent = 'Sauberer Schwung! (' + score + ' Pkt.)';
        }
        unlockStamp('schwenk');
        spawnSparks(e.clientX || 300, e.clientY || 300, 12);
      });
    }
    if (flipBtn) {
      flipBtn.addEventListener('click', function () {
        score += 25;
        if (umamiEl) umamiEl.textContent = score + ' Pkt.';
        if (statusEl) {
          statusEl.style.color = '#e3b23c';
          statusEl.textContent = 'Perfekte Kruste gewendet!';
        }
        unlockStamp('schwenk');
      });
    }
    if (bierBtn) {
      bierBtn.addEventListener('click', function () {
        ViralAudio.horn();
        if (statusEl) {
          statusEl.style.color = '#d94f3d';
          statusEl.textContent = 'FREVEL! Bier gehört in de Schwenker (Person), net in die Asche!';
        }
      });
    }

    // Oma Hilde Brass Stamp on Dish Cards (#047)
    document.querySelectorAll('.oma-stamp-btn[data-stamp-target]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var targetId = btn.getAttribute('data-stamp-target');
        var seal = $(targetId);
        var likesEl = btn.querySelector('.stamp-likes');
        ViralAudio.stamp();
        if (seal) seal.classList.add('is-visible');
        if (!btn.classList.contains('is-stamped')) {
          btn.classList.add('is-stamped');
          if (likesEl) likesEl.textContent = String((parseInt(likesEl.textContent, 10) || 300) + 1);
        }
        unlockStamp('oma');
        spawnSparks(e.clientX || 300, e.clientY || 300, 14);
      });
    });

    // LMIV Allergen & Diet Quick Filter (#065)
    var allergenBtns = document.querySelectorAll('.allergen-btn');
    allergenBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var wasActive = btn.classList.contains('active');
        allergenBtns.forEach(function (b) { b.classList.remove('active'); });
        var tag = wasActive ? null : btn.getAttribute('data-diet');
        if (!wasActive) btn.classList.add('active');

        document.querySelectorAll('[data-diet-tags]').forEach(function (card) {
          var tags = (card.getAttribute('data-diet-tags') || '').split(',');
          if (!tag || tags.indexOf(tag) !== -1) {
            card.style.opacity = '1';
            card.style.filter = 'none';
          } else {
            card.style.opacity = '0.28';
            card.style.filter = 'grayscale(0.8)';
          }
        });
      });
    });

    // Secret Vault #001 Unlock (#027)
    var vaultBtn = $('vault-unlock-btn');
    var vaultInput = $('vault-code-input');
    var vaultOut = $('vault-secret-output');
    if (vaultBtn && vaultInput && vaultOut) {
      vaultBtn.addEventListener('click', function () {
        var val = vaultInput.value.trim().toUpperCase();
        if (val === '0681' || val === 'MAGGI' || val === 'SAAR' || val === 'LYONER') {
          vaultOut.hidden = false;
          ViralAudio.horn();
          unlockStamp('vault');
        } else {
          vaultInput.value = '0681';
          vaultOut.hidden = false;
          ViralAudio.horn();
          unlockStamp('vault');
        }
      });
    }

    // Sando Cut Slider (#056, #068)
    var cutSlider = $('sando-cut-slider');
    var cutPct = $('sando-cut-pct');
    var cutReadout = $('sando-layer-readout');
    if (cutSlider && cutReadout) {
      var layers = [
        '<strong>Schicht 1 (0–20%):</strong> Handgebackenes japanisches Shokupan-Milchbrot, innen mit Buchenholz-Rauchbutter goldbraun angeröstet.',
        '<strong>Schicht 2 (20–40%):</strong> Hausgemachte „Saarvice Brown Glaze“ — ein Umami-Biest aus Shiro-Miso, Original Maggi-Würze, Dijon-Senf & brauner Butter.',
        '<strong>Schicht 3 & 4 (40–70%):</strong> 180g Freiland-Schwenkernacken (24h in Bier, Zwiebeln & Majoran mariniert) im dreifachen 175 °C Panko-Knuspermantel (88 dB Crunch!).',
        '<strong>Schicht 5 (70–90%):</strong> Frischer Boskoop-Apfel-Sauerkraut-Slaw mit gerösteter Kümmelsaat für die knackige Säure-Balance.',
        '<strong>Schicht 6 (100% — DER CUT):</strong> Perfekter 45°-Diagonalschnitt! Der rosa Saftkern dampft — bereit für dein Kamera-Reel!'
      ];
      cutSlider.addEventListener('input', function () {
        var v = parseInt(cutSlider.value, 10) || 0;
        if (cutPct) cutPct.textContent = v + '%';
        var idx = Math.min(4, Math.floor(v / 21));
        cutReadout.innerHTML = layers[idx];
        if (v === 100 || v === 50) ViralAudio.cut();
      });
    }

    // Dibbelabbes Jus Pour Widget (#057)
    var pourBtn = $('pour-jus-btn');
    var pourFill = $('pour-progress-fill');
    var pourTxt = $('pour-meter-text');
    var pourMsg = $('pour-status-msg');
    var pouredMl = 0;
    if (pourBtn) {
      pourBtn.addEventListener('click', function () {
        pouredMl = (pouredMl + 15) > 60 ? 15 : (pouredMl + 15);
        ViralAudio.sizzle();
        if (pourFill) pourFill.style.width = Math.min(100, (pouredMl / 45) * 100) + '%';
        if (pourTxt) pourTxt.textContent = pouredMl + ' ml gegossen';
        if (pourMsg) {
          if (pouredMl === 45) pourMsg.innerHTML = '🔥 <strong style="color:var(--c-gold);">PERFEKT (45 ml)!</strong> Die 36h Kalbs-Buchenrauch-Jus zischt in den Millefeuille-Turm!';
          else if (pouredMl > 45) pourMsg.innerHTML = '🌊 <strong>Uffbasse:</strong> Jetzt schwimmt der Teller wie bei Oma am Sonntag!';
          else pourMsg.innerHTML = '🫗 Noch e bissje! Bei 45 ml ist das Verhältnis aus Crunch und Soß ideal.';
        }
      });
    }

    // Stubbi Opener (#060)
    var stubbiBtn = $('stubbi-open-btn');
    if (stubbiBtn) {
      stubbiBtn.addEventListener('click', function (e) {
        ViralAudio.stubbi();
        stubbiBtn.textContent = '🍺 PLOPP & ZISCH! (4,0 °C — Wohlsein, ne!)';
        spawnSparks(e.clientX || 300, e.clientY || 300, 12);
      });
    }

    // Maggi Promille & Saar-Dust Recipe (#012, #069)
    var maggiBottle = $('maggi-bottle');
    var promilleEl = $('maggi-promille-val');
    var maggiWaBtn = $('maggi-wa-share-btn');
    var recipeBtn = $('saardust-recipe-btn');
    var recipeBox = $('saardust-recipe-box');
    var maggiClicks = 0;

    if (maggiBottle) {
      maggiBottle.addEventListener('click', function () {
        maggiClicks++;
        var prom = (0.8 + maggiClicks * 0.2).toFixed(1).replace('.', ',');
        if (promilleEl) promilleEl.textContent = prom + ' ‰ Mg+';
        unlockStamp('maggi');
      });
    }
    if (maggiWaBtn) {
      maggiWaBtn.addEventListener('click', function () {
        var p = promilleEl ? promilleEl.textContent : '1,8 ‰ Mg+';
        var txt = '💧 Mein offizieller Maggi-Blutwert an der SAARVICE-Tankstelle liegt heute bei ' + p + ' (Blutgruppe: Maggi Positiv)! Prüf deinen Pegel auf https://saarvice.de/#speisen';
        window.open('https://wa.me/?text=' + encodeURIComponent(txt), '_blank', 'noopener');
      });
    }
    if (recipeBtn && recipeBox) {
      recipeBtn.addEventListener('click', function () {
        recipeBox.hidden = !recipeBox.hidden;
        ViralAudio.maggi();
      });
    }
  }

  /* ------------------------------------------------------------------ *
   * 6. DAS SAARLAND-KULTUR-RECHNER-LABOR (TABS 1–4) (#004, #011, #013, #014, #044)
   * ------------------------------------------------------------------ */
  function initKulturLabor() {
    // Tabs
    var tabBtns = document.querySelectorAll('.viral-tab-btn[data-tab]');
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');
        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        document.querySelectorAll('.viral-tab-panel').forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        var panel = $(target);
        if (panel) panel.classList.add('active');
      });
    });

    // Tab 1: Saarland-Flächenmaß-Umrechner (#011)
    var unitIn = $('saar-unit-input');
    var unitSel = $('saar-unit-select');
    function calcSaarFlaeche() {
      if (!unitIn || !unitSel) return;
      var val = parseFloat(unitIn.value) || 1;
      var mode = unitSel.value;
      var factor = 1;
      if (mode === 'saarland') factor = val;
      else if (mode === 'fussball') factor = val * 0.00000278;
      else if (mode === 'hunger') factor = val * 0.00000001;
      else if (mode === 'schwenker') factor = val * 0.00000000011;

      var sandos = Math.max(1, Math.round(factor * 180964084507));
      var lyoner = Math.max(1, Math.round(factor * 101009824000));
      var stubbi = Math.max(1, Math.round(factor * 21414083333));
      var maggi = Math.max(1, Math.round(factor * 513938000));

      if ($('res-sandos')) $('res-sandos').textContent = sandos.toLocaleString('de-DE') + ' Stk.';
      if ($('res-lyoner')) $('res-lyoner').textContent = lyoner.toLocaleString('de-DE') + ' Ringe';
      if ($('res-stubbi')) $('res-stubbi').textContent = stubbi.toLocaleString('de-DE') + ' Kästen';
      if ($('res-maggi')) $('res-maggi').textContent = maggi.toLocaleString('de-DE') + ' Liter';
    }
    if (unitIn && unitSel) {
      unitIn.addEventListener('input', calcSaarFlaeche);
      unitSel.addEventListener('change', calcSaarFlaeche);
    }
    if ($('share-flaeche-btn')) {
      $('share-flaeche-btn').addEventListener('click', function () {
        var s = $('res-sandos') ? $('res-sandos').textContent : '180 Mrd. Stk.';
        var msg = '📐 Wusstest du schon? Im offiziellen SAARVICE Flächenmaß-Rechner entspricht das genau ' + s + ' Schwenker Katsu Sandos! 😂 Rechne selbst nach: https://saarvice.de/#kultur-labor';
        window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      });
    }

    // Tab 2: Jeder-kennt-Jeden Orakel (#013)
    var jkjBtn = $('jkj-calc-btn');
    var jkjOut = $('jkj-output');
    var jkjStories = [
      'Volltreffer über <strong>1,2 Ecken</strong>! Dein Couseng hat 2019 mit unserem Bäckermeister beim Dorfturnier am Bierstand geschwenkt. Du kriegst am Pass das Ehren-Nicken!',
      'Exakt <strong>1,0 Ecken</strong>! Deine Tante wohnt zwei Straßen weiter von unserer Oma Hilde und hat uns mal eine Schüssel Dibbelabbes geliehen.',
      'Saarland-Gesetz bestätigt (<strong>1,4 Ecken</strong>): Ein Arbeitskollege von deinem Schwager war mit unserem Schwenkmeister in derselben Berufsschulklasse in Saarbrücken!',
      'Unglaubliche <strong>0,8 Ecken</strong>: Wir standen letzten Sommer beim Vereinsfest schon direkt hintereinander am Getränkewagen, ne?'
    ];
    if (jkjBtn && jkjOut) {
      jkjBtn.addEventListener('click', function () {
        var name = ($('jkj-name') && $('jkj-name').value.trim()) || 'Stammtisch-Bruder';
        var town = ($('jkj-town') && $('jkj-town').value.trim()) || 'dem Saarland';
        var pick = jkjStories[(name.length + town.length) % jkjStories.length];
        ViralAudio.maggi();
        jkjOut.innerHTML = '🤝 <strong>Akte ' + name + ' aus ' + town + ':</strong> ' + pick;
      });
    }
    if ($('jkj-share-btn')) {
      $('jkj-share-btn').addEventListener('click', function () {
        var txt = jkjOut ? jkjOut.textContent : 'Im Saarland kennt jeder jeden über 1,4 Ecken!';
        window.open('https://wa.me/?text=' + encodeURIComponent(txt + ' — Test auf https://saarvice.de/#kultur-labor'), '_blank', 'noopener');
      });
    }

    // Tab 3: Gasgrill-Beichtstuhl (#014)
    var sinBtn = $('sin-confess-btn');
    var sinBox = $('sin-verdict-box');
    if (sinBtn && sinBox) {
      sinBtn.addEventListener('click', function () {
        var checked = document.querySelectorAll('.sin-check:checked');
        ViralAudio.stamp();
        if (!checked.length) {
          sinBox.innerHTML = '😇 <strong>Freispruch!</strong> Du hast eine reine Buchenholz-Weste. Oma Hilde ist stolz uff dich!';
          return;
        }
        var fines = [];
        checked.forEach(function (c) { fines.push(c.getAttribute('data-fine')); });
        sinBox.innerHTML = '⚖️ <strong>Schuldig in ' + checked.length + ' Anklagepunkten!</strong><br>' +
          'Deine Buße zur Wiedererlangung der saarländischen Ehre: <strong>' + fines.join(' + ') + '</strong> sowie 3 Vaterunser in Richtung Völklinger Hütte!';
      });
    }
    if ($('sin-share-btn')) {
      $('sin-share-btn').addEventListener('click', function () {
        var verdict = sinBox ? sinBox.textContent : 'Gasgrill-Bußgeldbescheid';
        window.open('https://wa.me/?text=' + encodeURIComponent('🔥 ' + verdict + ' -> Zum Gasgrill-Beichtstuhl: https://saarvice.de/#kultur-labor'), '_blank', 'noopener');
      });
    }

    // Tab 4: Kompliment-Orakel & Archetyp-Matcher (#004, #044)
    var compSel = $('compliment-select');
    var compOut = $('compliment-output');
    var compAnswers = [
      'Saarlänner sagt: „Jo. Kann ma net meckere. Geht gudd nei, ne?“',
      'Saarlänner sagt: „Do kannsche nix saan. Knuspert ganz ordentlich.“',
      'Saarlänner sagt: „Unn, wie? — Ei jo. Stehe halt e paar Leut do, gell?“',
      'Saarlänner sagt: „Für e Süßspeis gar net verkehrt. Mach ma noch e Portion.“'
    ];
    if (compSel && compOut) {
      compSel.addEventListener('change', function () {
        compOut.textContent = compAnswers[parseInt(compSel.value, 10) || 0];
        ViralAudio.maggi();
      });
    }

    document.querySelectorAll('.archetyp-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var t = btn.getAttribute('data-type');
        var out = $('archetyp-output');
        if (!out) return;
        ViralAudio.sizzle();
        var map = {
          sando: '🥩 <strong>Du bist: Das Schwenker Katsu Sando!</strong> Außen knallharte Panko-Disziplin, innen zarter Buchenrauch-Kern mit Maggi-Seele.',
          crunch: '🥔 <strong>Du bist: Der Dibbelabbes Crunch Stack!</strong> Bodenständig, 94 Dezibel knusprig und erst mit ordentlich dunkler Soß auf Betriebstemperatur.',
          doppelweck: '🌶️ <strong>Du bist: Der Merguez-Falafel Doppelweck!</strong> Feurig, weltoffen, teilt gerecht an der Mittelnaht und passt auf jede Baustelle.',
          gefillde: '👵 <strong>Du bist: Die Gefillde Bomb!</strong> Sonntags-Kind, von Oma verwöhnt, aber bereit für den wilden 175 °C Ausbruch!'
        };
        out.innerHTML = map[t] || map.sando;
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * 7. DER GROSSE SAARLAND-LANDKREIS-BATTLE (#031-#040)
   * ------------------------------------------------------------------ */
  function initLandkreisBattle() {
    var board = $('kreis-leaderboard');
    if (!board) return;

    var KREIS_KEY = 'saarvice_kreis_votes_v3';
    var defaultVotes = {
      SB: { name: 'Regionalverband Saarbrücken (SB / VK)', votes: 642 },
      SLS: { name: 'Landkreis Saarlouis (SLS)', votes: 628 },
      WND: { name: 'Landkreis St. Wendel (WND)', votes: 489 },
      NK: { name: 'Landkreis Neunkirchen (NK)', votes: 465 },
      HOM: { name: 'Saarpfalz-Kreis (HOM / IGB)', votes: 451 },
      MZG: { name: 'Landkreis Merzig-Wadern (MZG)', votes: 412 }
    };

    try {
      var saved = JSON.parse(localStorage.getItem(KREIS_KEY) || 'null');
      if (saved && saved.SB) defaultVotes = saved;
    } catch (e) {}

    var lastVotedKreis = 'SB';

    function renderBoard() {
      var keys = Object.keys(defaultVotes).sort(function (a, b) {
        return defaultVotes[b].votes - defaultVotes[a].votes;
      });
      var maxV = defaultVotes[keys[0]].votes || 1;
      var totalV = keys.reduce(function (acc, k) { return acc + defaultVotes[k].votes; }, 0);

      board.innerHTML = keys.map(function (k, idx) {
        var item = defaultVotes[k];
        var pct = Math.round((item.votes / maxV) * 100);
        var sharePct = ((item.votes / totalV) * 100).toFixed(1);
        var medal = idx === 0 ? '🥇 ' : (idx === 1 ? '🥈 ' : (idx === 2 ? '🥉 ' : ''));
        return '<div class="kreis-row">' +
          '<div class="kreis-row-top">' +
          '<strong>' + medal + item.name + '</strong>' +
          '<span style="color:var(--c-gold); font-weight:700;">' + item.votes.toLocaleString('de-DE') + ' Stimmen (' + sharePct + '%)</span>' +
          '</div>' +
          '<div class="kreis-bar-track"><div class="kreis-bar-fill" style="width:' + pct + '%"></div></div>' +
          '</div>';
      }).join('');

      var ticker = $('battle-rivalry-ticker');
      if (ticker && keys.length >= 2) {
        var diff = defaultVotes[keys[0]].votes - defaultVotes[keys[1]].votes;
        ticker.textContent = '⚡ LIVE-RENNEN: ' + keys[0] + ' führt nur noch mit ' + diff + ' Stimmen vor ' + keys[1] + ' — Hol deine Leute ran!';
      }
    }

    document.querySelectorAll('.kfz-plate-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var raw = btn.getAttribute('data-kreis');
        var mapped = (raw === 'VK') ? 'SB' : (raw === 'IGB' ? 'HOM' : raw);
        if (defaultVotes[mapped]) {
          defaultVotes[mapped].votes += 1;
          lastVotedKreis = raw;
          try { localStorage.setItem(KREIS_KEY, JSON.stringify(defaultVotes)); } catch (err) {}
          document.querySelectorAll('.kfz-plate-btn').forEach(function (b) { b.classList.remove('is-voted'); });
          btn.classList.add('is-voted');
          ViralAudio.stamp();
          unlockStamp('kreis');
          renderBoard();
          spawnSparks(e.clientX || 300, e.clientY || 300, 12);
        }
      });
    });

    if ($('kreis-wa-mobilize-btn')) {
      $('kreis-wa-mobilize-btn').addEventListener('click', function () {
        var msg = '🚨 Ei Leut, wir können doch net zulassen, dass die anneren unseren Landkreis beim SAARVICE Drop #001 schlagen! Stimmt jetzt mit 1 Klick für [' + lastVotedKreis + '] ab: https://saarvice.de/#landkreis-battle';
        window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      });
    }

    // Luftlinien-Distanz-Peiler (#037)
    var geoBtn = $('geo-distance-btn');
    var geoOut = $('geo-distance-output');
    if (geoBtn && geoOut) {
      geoBtn.addEventListener('click', function () {
        geoOut.hidden = false;
        ViralAudio.horn();
        geoOut.textContent = '📡 Peilung nach Saarbrücken (St. Johanner Markt • 49.234° N, 6.996° O): Der Rauch des Buchenfeuers ist in Windrichtung im gesamten Saarland riechbar (Riechweite: ~18.500 Schwenker-Längen)!';
      });
    }

    renderBoard();
  }

  /* ------------------------------------------------------------------ *
   * 8. CANVAS GENERATORS: SCHWENKER-FÜHRERSCHEIN & SAARVICE GAZETTE (#021-#023, #041-#043)
   * ------------------------------------------------------------------ */
  function initCanvasGenerators() {
    var certCanvas = $('cert-canvas');
    var gazCanvas = $('gazette-canvas');

    function drawCert() {
      if (!certCanvas) return;
      var ctx = certCanvas.getContext('2d');
      if (!ctx) return;

      var name = ($('cert-name-input') && $('cert-name-input').value.trim()) || 'Saarländer Ehrenmann';
      var town = ($('cert-town-input') && $('cert-town-input').value.trim()) || 'Saarbrigge';
      var q1 = $('quiz-q1') ? $('quiz-q1').value : 'buche';

      // Background
      ctx.fillStyle = '#12100d';
      ctx.fillRect(0, 0, 600, 380);

      // Double Brass Border
      ctx.strokeStyle = '#e3b23c';
      ctx.lineWidth = 4;
      ctx.strokeRect(14, 14, 572, 352);
      ctx.lineWidth = 1;
      ctx.strokeRect(22, 22, 556, 336);

      // Header
      ctx.fillStyle = '#e3b23c';
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('AMTLICHE PRÜFUNGSKOMMISSION • SAARVICE STAMMTISCH SAARBRÜCKEN', 300, 52);

      ctx.fillStyle = '#f2ead8';
      ctx.font = '900 28px "Archivo Black", sans-serif';
      ctx.fillText('SCHWENKER-FÜHRERSCHEIN', 300, 92);

      ctx.fillStyle = '#d94f3d';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('FAHRERLAUBNIS KLASSE S (DREIBEIN, KETTENWIRBEL & OFFENE BUCHENGLUT)', 300, 118);

      // Holder Details
      ctx.fillStyle = 'rgba(242,234,218,0.7)';
      ctx.font = '15px sans-serif';
      ctx.fillText('Hiermit wird feierlich beurkundet, dass', 300, 158);

      ctx.fillStyle = '#e3b23c';
      ctx.font = '900 26px "Archivo Black", sans-serif';
      ctx.fillText(name.toUpperCase() + ' (' + town.toUpperCase() + ')', 300, 195);

      var verdict = (q1 === 'buche')
        ? 'die Reifeprüfung am Buchenfeuer mit 100% Umami-Präzision bestanden hat.'
        : 'unter strenger Bewährung steht (Gasgrill-Verbot lebenslänglich!).';

      ctx.fillStyle = '#f2ead8';
      ctx.font = '15px sans-serif';
      ctx.fillText(verdict, 300, 230);
      ctx.fillText('Berechtigt zum Führen von Dreibein-Schwenkern & Bestellung am SAARVICE-Pass.', 300, 255);

      // Stamp Seal
      ctx.save();
      ctx.translate(490, 305);
      ctx.rotate(-0.2);
      ctx.strokeStyle = '#d94f3d';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 42, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#d94f3d';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('GEPRÜFT VON', 0, -10);
      ctx.fillText('OMA HILDE', 0, 4);
      ctx.fillText('★ GUDD GESS ★', 0, 18);
      ctx.restore();

      // Footer
      ctx.fillStyle = '#e3b23c';
      ctx.textAlign = 'left';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('LIZENZ-NR: #SV-0681-S', 40, 332);
      ctx.fillText('HAUPTSACH GUDD. AWWER ANNERSCH. • SAARVICE.DE', 40, 350);
    }

    function drawGazette() {
      if (!gazCanvas) return;
      var ctx = gazCanvas.getContext('2d');
      if (!ctx) return;

      var name = ($('gazette-name-input') && $('gazette-name-input').value.trim()) || 'Jean';
      var town = ($('gazette-town-input') && $('gazette-town-input').value.trim()) || 'Saarbrücken';
      var tplIdx = parseInt(($('gazette-tpl-select') && $('gazette-tpl-select').value) || '0', 10);

      var headlines = [
        ['SKANDAL IN ' + town.toUpperCase() + ':', name.toUpperCase() + ' ERKLÄRT GASGRILLS', 'OFFIZIELL FÜR ILLEGAL!'],
        ['WELTREKORD IN ' + town.toUpperCase() + ':', name.toUpperCase() + ' VERDRÜCKT 4', 'KATSU SANDOS IN 6 MINUTEN!'],
        ['AMTLICHES DEKRET:', name.toUpperCase() + ' ZUM OBER-SCHWENKER', 'VON ' + town.toUpperCase() + ' ERNANNT!'],
        ['ALARM IN ' + town.toUpperCase() + ':', name.toUpperCase() + ' ORTET GEHEIMEN', 'SAARVICE DROP-STANDORT!']
      ];
      var lines = headlines[tplIdx] || headlines[0];

      // Parchment Paper Background
      ctx.fillStyle = '#eadec4';
      ctx.fillRect(0, 0, 600, 380);

      // Ink Frame
      ctx.strokeStyle = '#181512';
      ctx.lineWidth = 3;
      ctx.strokeRect(14, 14, 572, 352);

      ctx.beginPath();
      ctx.moveTo(25, 78); ctx.lineTo(575, 78);
      ctx.moveTo(25, 102); ctx.lineTo(575, 102);
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Masthead
      ctx.fillStyle = '#181512';
      ctx.textAlign = 'center';
      ctx.font = '900 32px "Archivo Black", serif';
      ctx.fillText('DIE SAARVICE GAZETTE', 300, 62);

      ctx.font = 'bold 11px monospace';
      ctx.fillText('SONDERAUSGABE • FETTDICHTES EINWICKELBLATT • AUSGABE #001 • PREIS: 1 SPRITZER MAGGI', 300, 94);

      // Red Breaking Badge
      ctx.fillStyle = '#d94f3d';
      ctx.fillRect(210, 116, 180, 24);
      ctx.fillStyle = '#f2ead8';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('★ EILMELDUNG ★', 300, 132);

      // Big Headline
      ctx.fillStyle = '#181512';
      ctx.font = '900 25px "Archivo Black", sans-serif';
      ctx.fillText(lines[0], 300, 178);
      ctx.fillText(lines[1], 300, 212);
      ctx.fillStyle = '#b63524';
      ctx.fillText(lines[2], 300, 246);

      // Sub-article columns
      ctx.fillStyle = '#2b2620';
      ctx.font = '13px sans-serif';
      ctx.fillText('Wie Augenzeugen am St. Johanner Markt berichten, zog bereits um 11:45 Uhr', 300, 286);
      ctx.fillText('dichter Buchenrauch über ' + town + '. Die Gudd-Gess-Gemeinde steht bereit.', 300, 306);

      ctx.font = 'bold 12px monospace';
      ctx.fillStyle = '#181512';
      ctx.fillText('HAUPTSACH GUDD. AWWER ANNERSCH. — WWW.SAARVICE.DE', 300, 346);
    }

    drawCert();
    drawGazette();

    if ($('generate-cert-btn')) {
      $('generate-cert-btn').addEventListener('click', function () {
        drawCert();
        ViralAudio.stamp();
        unlockStamp('cert');
      });
    }
    if ($('download-cert-btn') && certCanvas) {
      $('download-cert-btn').addEventListener('click', function () {
        drawCert();
        var a = document.createElement('a');
        a.download = 'saarvice-schwenker-fuehrerschein.png';
        a.href = certCanvas.toDataURL('image/png');
        a.click();
      });
    }
    if ($('share-cert-wa-btn')) {
      $('share-cert-wa-btn').addEventListener('click', function () {
        var n = ($('cert-name-input') && $('cert-name-input').value.trim()) || 'Ich';
        var msg = '🪪 Amtlich bestätigt: ' + n + ' hat den offiziellen SAARVICE Schwenker-Führerschein (Klasse S: Dreibein & Buchenglut) bestanden! Mach jetzt deine Prüfung auf https://saarvice.de/#viral-arena';
        window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      });
    }

    if ($('generate-gazette-btn')) {
      $('generate-gazette-btn').addEventListener('click', function () {
        drawGazette();
        ViralAudio.stamp();
      });
    }
    if ($('download-gazette-btn') && gazCanvas) {
      $('download-gazette-btn').addEventListener('click', function () {
        drawGazette();
        var a = document.createElement('a');
        a.download = 'saarvice-gazette-schlagzeile.png';
        a.href = gazCanvas.toDataURL('image/png');
        a.click();
      });
    }
    if ($('share-gazette-wa-btn')) {
      $('share-gazette-wa-btn').addEventListener('click', function () {
        var n = ($('gazette-name-input') && $('gazette-name-input').value.trim()) || 'Jean';
        var t = ($('gazette-town-input') && $('gazette-town-input').value.trim()) || 'Saarbrücken';
        var msg = '📰 EXTRABLATT DER SAARVICE GAZETTE: ' + n + ' sorgt für kulinarischen Ausnahmezustand in ' + t + '! Druck deine eigene Schlagzeile: https://saarvice.de/#viral-arena';
        window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      });
    }

    if ($('unlock-all-stamps-btn')) {
      $('unlock-all-stamps-btn').addEventListener('click', function () {
        ['visit', 'schwenk', 'maggi', 'kreis', 'vault', 'cert', 'oma', 'platt'].forEach(unlockStamp);
        ViralAudio.horn();
      });
    }
  }

  /* ------------------------------------------------------------------ *
   * 9. WALLET PASS RANG-SIMULATOR, .ICS KALENDER, REFERRAL & LEXIKON (#002, #007, #010, #045, #049, #074, #077)
   * ------------------------------------------------------------------ */
  function initPassAndLexikonExtras() {
    // Pass Tier Preview Buttons (#077)
    document.querySelectorAll('.pass-tier-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.pass-tier-btn').forEach(function (b) { b.classList.remove('is-stamped'); });
        btn.classList.add('is-stamped');
        var lbl = btn.getAttribute('data-label');
        var wait = btn.getAttribute('data-wait');
        if ($('wallet-tier-chip')) $('wallet-tier-chip').textContent = lbl;
        if ($('wallet-fastlane-status')) $('wallet-fastlane-status').textContent = wait;
        ViralAudio.stamp();
      });
    });

    // Live Name Preview on 3D Pass (#048)
    var nameInput = $('member-custom-name');
    if (nameInput && $('wallet-member-holder')) {
      nameInput.addEventListener('input', function () {
        var v = nameInput.value.trim();
        $('wallet-member-holder').textContent = 'Inhaber: ' + (v || 'Ehrenmitglied der Gemeinde');
      });
    }

    // .ics Calendar Export (#074)
    var icsBtn = $('ics-download-btn');
    if (icsBtn) {
      icsBtn.addEventListener('click', function () {
        var ics = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'PRODID:-//SAARVICE//Drop #001//DE',
          'BEGIN:VEVENT',
          'SUMMARY:🔥 SAARVICE Drop #001 — GPS-Alarm & Schwenker Katsu Sando',
          'DESCRIPTION:Hauptsach gudd. Awwer annersch. Prüfe deinen Stammtisch-Pass auf https://saarvice.de für die exakten Koordinaten!',
          'LOCATION:Saarbrücken / Saarland (Geheimer Drop-Standort)',
          'DTSTART:20261114T100000Z',
          'DTEND:20261114T140000Z',
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\r\n');
        var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'saarvice-drop-001.ics';
        a.click();
      });
    }

    // Referral Copy & Native Share & WhatsApp Presets (#045, #046, #049)
    var copyRefBtn = $('copy-ref-link-btn');
    var refInput = $('referral-link-input');
    if (copyRefBtn && refInput) {
      copyRefBtn.addEventListener('click', function () {
        if (navigator.clipboard) navigator.clipboard.writeText(refInput.value).catch(function () {});
        copyRefBtn.textContent = '✅ Kopiert!';
        setTimeout(function () { copyRefBtn.textContent = '📋 Link kopiere'; }, 2000);
      });
    }
    var nativeShareBtn = $('native-share-btn');
    if (nativeShareBtn) {
      nativeShareBtn.addEventListener('click', function () {
        var url = refInput ? refInput.value : window.location.href;
        if (navigator.share) {
          navigator.share({
            title: 'SAARVICE — Hauptsach gudd. Awwer annersch.',
            text: 'Komm mit in die Gudd-Gess-Gemeinde für Drop #001 (Schwenker Katsu Sando & Dibbelabbes Crunch Stack)!',
            url: url
          }).catch(function () {});
        } else if (copyRefBtn) {
          copyRefBtn.click();
        }
      });
    }

    var presets = {
      family: '👨‍👩‍👧‍👦 Ei Gude! Guckt euch mal an, was die in Saarbrücken gebaut han: Schwenker Katsu Sando und frittierte Gefillde Bombs! Meldet euch an, dann gehn mir zusammen zum ersten Drop: ',
      verein: '🍺 Männer & Mädels vom Verein: Vergesst die normale Rostwurstbude — wir müssen geschlossen als 5er-Schicht zum SAARVICE Drop #001 (gibt Gratis Saar-Kimchi für die Gruppe!): ',
      date: '❤️ Vergiss schickes Candle-Light-Dinner: Gehn mir zusammen ein Schwenker Katsu Sando und Grumbeer-Churros mit Viez-Karamell beim SAARVICE Drop essen? ',
      boss: '💼 Idee fürs nächste Sommerfest / Teamevent: Statt lauwarmem Buffet kommt SAARVICE mit dem mobilen Schwenk-Cube vorbei! Hier ist die Seite: '
    };
    document.querySelectorAll('.wa-preset-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-preset');
        var url = refInput ? refInput.value : 'https://saarvice.de/';
        var text = (presets[key] || presets.family) + url;
        window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener');
      });
    });

    // Lexikon Audio, Quiz Mode & Share (#002, #007, #010)
    document.querySelectorAll('.speak-dialect-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var phrase = btn.getAttribute('data-speak') || 'Hauptsach gudd gess!';
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          var u = new SpeechSynthesisUtterance(phrase);
          u.lang = 'de-DE';
          u.rate = 0.92;
          u.pitch = 0.9;
          window.speechSynthesis.speak(u);
        } else {
          ViralAudio.maggi();
        }
      });
    });

    document.querySelectorAll('.share-dialect-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var term = btn.getAttribute('data-term') || 'Hauptsach gudd gess!';
        var card = btn.closest('.dialect-card');
        var desc = card && card.querySelector('.dialect-translation') ? card.querySelector('.dialect-translation').textContent : '';
        var msg = '🗣️ Saarländisches Grundgesetz — „' + term + '“: ' + desc + ' (Aus dem SAARVICE Lexikon: https://saarvice.de/#lexikon)';
        window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      });
    });

    var quizToggle = $('lexikon-quiz-toggle');
    var quizHidden = false;
    if (quizToggle) {
      quizToggle.addEventListener('click', function () {
        quizHidden = !quizHidden;
        document.querySelectorAll('.dialect-translation').forEach(function (el) {
          el.style.filter = quizHidden ? 'blur(6px)' : 'none';
          el.style.cursor = quizHidden ? 'pointer' : 'default';
          el.title = quizHidden ? 'Antippen zum Aufdecken!' : '';
          el.onclick = function () { el.style.filter = 'none'; };
        });
        quizToggle.textContent = quizHidden
          ? '👀 Alle Übersetzungen wieder aufdecken'
          : '🙈 „Verstehsche mich?“-Ratemodus aktivieren (Übersetzung verdecken)';
      });
    }
  }

  /* ------------------------------------------------------------------ *
   * 10. SUBPAGES: DROPS QUEUE, CATERING HOF-CHECK, PRESSE COPY (#015, #036, #083, #085, #087)
   * ------------------------------------------------------------------ */
  function initSubpageTools() {
    // Drops Queue Calculator (#015)
    var qSlider = $('queue-slider');
    var qVal = $('queue-people-val');
    var qOut = $('queue-calc-output');
    if (qSlider && qOut) {
      qSlider.addEventListener('input', function () {
        var p = parseInt(qSlider.value, 10) || 0;
        if (qVal) qVal.textContent = String(p);
        var mins = Math.max(1, Math.round(p * 0.42));
        var stubbis = Math.max(1, Math.ceil(mins / 9));
        var chance = Math.min(99.9, (65 + p * 0.34)).toFixed(1).replace('.', ',');
        qOut.innerHTML = '⏱️ <strong>Wartezeit am Pass:</strong> ca. ' + mins + ' Minuten (mit Fast-Lane-Pass: <strong>0 Min.</strong>) • ' +
          '🍺 <strong>Empfohlene Warte-Ration:</strong> ' + stubbis + '× Saar-Apfel-Shandy oder Hopfen-Fizz • ' +
          '🤝 <strong>Chance, dass du jemanden aus deinem Verein triffst:</strong> ' + chance + '%';
      });
    }

    // Drops Spot Nomination (#036)
    var nomBtn = $('nominate-spot-btn');
    var nomIn = $('nominate-spot-input');
    var nomMsg = $('nominate-spot-msg');
    if (nomBtn && nomIn && nomMsg) {
      nomBtn.addEventListener('click', function () {
        var spot = nomIn.value.trim() || 'Deiner Wunsch-Location';
        ViralAudio.horn();
        nomMsg.hidden = false;
        nomMsg.textContent = '✅ "' + spot + '" wurde mit Priorität in die Koordinaten-Liste für die nächsten Drops aufgenommen!';
      });
    }

    // Catering Calculator WhatsApp & Copy (#083)
    if ($('calc-wa-share-btn')) {
      $('calc-wa-share-btn').addEventListener('click', function () {
        var s = window.__saarviceCateringSummary || 'SAARVICE Event-Catering Kalkulation: https://saarvice.de/catering.html';
        window.open('https://wa.me/?text=' + encodeURIComponent(s + '\n👉 Live-Kalkulator: https://saarvice.de/catering.html#kalkulator'), '_blank', 'noopener');
      });
    }
    if ($('calc-copy-btn')) {
      $('calc-copy-btn').addEventListener('click', function () {
        var s = window.__saarviceCateringSummary || 'SAARVICE Event-Catering';
        if (navigator.clipboard) navigator.clipboard.writeText(s).catch(function () {});
        $('calc-copy-btn').textContent = '✅ In Zwischenablage kopiert!';
        setTimeout(function () { $('calc-copy-btn').textContent = '📋 Kalkulation für Chef / Vorstand kopieren'; }, 2000);
      });
    }

    // Catering Hof-Check (#085)
    var hofChecks = document.querySelectorAll('.hof-check');
    var hofRes = $('hof-check-result');
    if (hofChecks.length && hofRes) {
      hofChecks.forEach(function (chk) {
        chk.addEventListener('change', function () {
          var allOk = Array.prototype.every.call(hofChecks, function (c) { return c.checked; });
          if (allOk) {
            hofRes.style.color = '#4ade80';
            hofRes.textContent = '✅ 100% SCHWENK-CUBE-TAUGLICH! Euer Gelände ist bereit für echtes Buchenfeuer.';
          } else {
            hofRes.style.color = '#e3b23c';
            hofRes.textContent = '⚡ KEIN PROBLEM: Auch bei engen Höfen oder ohne Starkstrom bauen wir mit unserem autarken 20 kVA Flüster-Setup & Pavillon-Pass auf!';
          }
        });
      });
    }

    // Presse Boilerplate Copy (#087)
    var pressCopyBtn = $('copy-press-text-btn');
    var pressText = $('press-boilerplate-text');
    if (pressCopyBtn && pressText) {
      pressCopyBtn.addEventListener('click', function () {
        if (navigator.clipboard) navigator.clipboard.writeText(pressText.textContent.trim()).catch(function () {});
        pressCopyBtn.textContent = '✅ Pressetext kopiert!';
        setTimeout(function () { pressCopyBtn.textContent = '📋 Offiziellen Pressetext in die Zwischenablage kopieren'; }, 2000);
      });
    }
  }

  /* ------------------------------------------------------------------ *
   * 11. DAS 100-PUNKTE SAARLAND-VIRALITÄTS-COCKPIT (#098)
   * ------------------------------------------------------------------ */
  var VIRAL_100_ITEMS = [
    { id: 1, cat: 'Dialekt & Sprache', title: 'Globaler Hochdeutsch ↔ Saarlännisch Schalter', link: '#viral-top-strip' },
    { id: 2, cat: 'Dialekt & Sprache', title: 'Web-Speech Audio-Aussprache im Lexikon', link: '#lexikon' },
    { id: 3, cat: 'Dialekt & Sprache', title: '„Unn, wie? — Ei jo.“ 4-Silben-Dialog-Kult', link: '#lexikon' },
    { id: 4, cat: 'Dialekt & Sprache', title: 'Stoizismus-Kompliment-Orakel („Kann ma net meckere“)', link: '#kultur-labor' },
    { id: 5, cat: 'Dialekt & Sprache', title: 'Dynamische Tageszeit-Begrüßung uff Platt', link: '#viral-top-strip' },
    { id: 6, cat: 'Dialekt & Sprache', title: 'Erweiterung auf 12 Kult-Begriffe (Viez, Stubbi, Ebbes)', link: '#lexikon' },
    { id: 7, cat: 'Dialekt & Sprache', title: '„Verstehsche mich?“-Ratemodus im Lexikon', link: '#lexikon' },
    { id: 8, cat: 'Dialekt & Sprache', title: 'Authentische saarländische Formular-Dialoge', link: '#gemeinde' },
    { id: 9, cat: 'Dialekt & Sprache', title: 'Live-Übersetzung aller Headlines & Navigation', link: '#hero' },
    { id: 10, cat: 'Dialekt & Sprache', title: '1-Klick WhatsApp-Spruchkarten im Lexikon', link: '#lexikon' },

    { id: 11, cat: 'Saarland-Rechner', title: 'Offizieller „Saarland als Flächenmaß“-Umrechner', link: '#kultur-labor' },
    { id: 12, cat: 'Saarland-Rechner', title: 'Maggi-Blutgruppen- & Promille-Rechner (Mg+)', link: '#maggi-bottle' },
    { id: 13, cat: 'Saarland-Rechner', title: '„Jeder-kennt-Jeden“-Orakel (1,4 Ecken Algorithmus)', link: '#kultur-labor' },
    { id: 14, cat: 'Saarland-Rechner', title: 'Der Saarländische Gasgrill-Beichtstuhl & Bußgelder', link: '#kultur-labor' },
    { id: 15, cat: 'Saarland-Rechner', title: 'Schlangen-Stubbi- & Bekannten-Treff-Kalkulator', link: 'drops.html' },
    { id: 16, cat: 'Saarland-Rechner', title: 'Grumbeer-Gramm-Äquivalenz bei Kartoffelgerichten', link: '#speisen' },
    { id: 17, cat: 'Saarland-Rechner', title: 'Saarbrücker Schwenk-Wetter-Index (Immer 100%)', link: '#viral-top-strip' },
    { id: 18, cat: 'Saarland-Rechner', title: 'Kalorien-in-Buchenholz-Hacken-Umrechner', link: '#speisen' },
    { id: 19, cat: 'Saarland-Rechner', title: 'Goldene Doppelweck-Mittelnaht-Bruch-Prüfung', link: 'menu/merguez-falafel-doppelweck.html' },
    { id: 20, cat: 'Saarland-Rechner', title: 'Savoir-Vivre Dual-Balken (Saarkohle vs. Bistro)', link: '#speisen' },

    { id: 21, cat: 'Gamification & Quiz', title: 'Amtlicher Schwenker-Führerschein (Prüfung Klasse S)', link: '#viral-arena' },
    { id: 22, cat: 'Gamification & Quiz', title: 'Live HTML5-Canvas Ehren-Urkunden-Druckerei', link: '#viral-arena' },
    { id: 23, cat: 'Gamification & Quiz', title: '1-Klick PNG-Download der Urkunde für Insta/WhatsApp', link: '#viral-arena' },
    { id: 24, cat: 'Gamification & Quiz', title: 'Pälzer-Zollkontrolle & Kulinarisches Tages-Visum', link: '#viral-top-strip' },
    { id: 25, cat: 'Gamification & Quiz', title: 'Röstaromen-Highscore im Schwenker-Cockpit', link: '#schwenker-cockpit' },
    { id: 26, cat: 'Gamification & Quiz', title: '„Mit Stubbi ablöschen“-Frevel-Alarm am Schwenker', link: '#schwenker-cockpit' },
    { id: 27, cat: 'Gamification & Quiz', title: 'Geheimer Tresor (Code 0681 / MAGGI) für Secret Drop', link: '#secret-special-card' },
    { id: 28, cat: 'Gamification & Quiz', title: 'Digitales Saarland-Stempelheft (8 Sammlerstempel)', link: '#stempel-heft' },
    { id: 29, cat: 'Gamification & Quiz', title: 'Automatischer Ehrengast-Pass-Unlock ab 5 Stempeln', link: '#stempel-heft' },
    { id: 30, cat: 'Gamification & Quiz', title: 'Grubengold-Konfetti-Regen (5x Logo / Tipp „0681“)', link: '#hero' },

    { id: 31, cat: 'Landkreis-Battle', title: 'Live-Abstimmung aller 6 saarländischen Landkreise', link: '#landkreis-battle' },
    { id: 32, cat: 'Landkreis-Battle', title: '8 Klickbare KFZ-Kennzeichen (SB, SLS, WND, NK, HOM, MZG, VK, IGB)', link: '#landkreis-battle' },
    { id: 33, cat: 'Landkreis-Battle', title: 'Echtzeit-Leaderboard mit Prozentbalken & Medaillen', link: '#landkreis-battle' },
    { id: 34, cat: 'Landkreis-Battle', title: 'WhatsApp-Mobilisierungs-Kampfansage pro Landkreis', link: '#landkreis-battle' },
    { id: 35, cat: 'Landkreis-Battle', title: '8-Stationen Grubenfunk-Radar inkl. HOM, MZG & LUX', link: 'drops.html#saarland-radar' },
    { id: 36, cat: 'Landkreis-Battle', title: 'Dorfplatz-, Brauereihof- & Hütten-Nominierungs-Box', link: 'drops.html' },
    { id: 37, cat: 'Landkreis-Battle', title: 'Luftlinien- & Schwenker-Längen-Peiler nach Saarbrücken', link: '#landkreis-battle' },
    { id: 38, cat: 'Landkreis-Battle', title: 'Regionale Herkunfts-Story (Saargau, Bliesgau, Merzig)', link: '#story' },
    { id: 39, cat: 'Landkreis-Battle', title: 'Saar-Lor-Lux Nachbarschafts-Brücke (Moselle & Lëtzebuerg)', link: '#landkreis-battle' },
    { id: 40, cat: 'Landkreis-Battle', title: 'Live-Rivalitäts-Ticker (SB vs. SLS Kopf-an-Kopf)', link: '#landkreis-battle' },

    { id: 41, cat: 'Meme & Share Fabrik', title: 'Interaktiver „Saarvice Gazette“ Zeitungs-Generator', link: '#viral-arena' },
    { id: 42, cat: 'Meme & Share Fabrik', title: '4 Virale Titelblatt-Motive mit eigenem Namen & Ort', link: '#viral-arena' },
    { id: 43, cat: 'Meme & Share Fabrik', title: 'PNG-Bildexport der eigenen Zeitung für WhatsApp-Status', link: '#viral-arena' },
    { id: 44, cat: 'Meme & Share Fabrik', title: '30-Sekunden Food-Archetyp-Matcher („Welches Gericht bist du?“)', link: '#kultur-labor' },
    { id: 45, cat: 'Meme & Share Fabrik', title: '4 Vorgefertigte WhatsApp-Einladungen (Familie, Verein, Date, Chef)', link: '#gemeinde' },
    { id: 46, cat: 'Meme & Share Fabrik', title: 'Nativer Mobile Web-Share-Trigger (navigator.share)', link: '#gemeinde' },
    { id: 47, cat: 'Meme & Share Fabrik', title: 'Interaktiver „Oma Hilde Genehmigt“-Messingstempel auf Karten', link: '#speisen' },
    { id: 48, cat: 'Meme & Share Fabrik', title: 'Live-Namensprägung auf dem 3D-Stammtisch-Pass', link: '#gemeinde' },
    { id: 49, cat: 'Meme & Share Fabrik', title: 'Persönlicher Referral-Link-Generator (?ref=SV-XXXX)', link: '#gemeinde' },
    { id: 50, cat: 'Meme & Share Fabrik', title: 'Dynamischer Ehren-Willkommensbanner für eingeladene Freunde', link: '#viral-top-strip' },

    { id: 51, cat: 'Sensorik & Kinetic', title: '6-Pad Web-Audio Stammtisch-Soundboard (Zero MP3)', link: '#schwenker-cockpit' },
    { id: 52, cat: 'Sensorik & Kinetic', title: 'Dielectric Buchenfunken-Partikel bei Klick-Events', link: '#schwenker-cockpit' },
    { id: 53, cat: 'Sensorik & Kinetic', title: 'Anisotroper Walzstahl-Glanz auf allen Karten', link: '#speisen' },
    { id: 54, cat: 'Sensorik & Kinetic', title: '4 Kult-Colorways (Saarkohle, Hochofen, Viez-Keller, Grubengold)', link: '#viral-top-strip' },
    { id: 55, cat: 'Sensorik & Kinetic', title: 'Buchenkohle-Hitze-Fortschrittsbalken beim Scrollen', link: '#hero' },
    { id: 56, cat: 'Sensorik & Kinetic', title: 'Interaktiver „Der Cut“ 45°-Klingen-Schieberegler', link: '#speisen' },
    { id: 57, cat: 'Sensorik & Kinetic', title: 'Interaktiver „Der Pour“ 36h-Buchenrauch-Jus-Gießer', link: '#speisen' },
    { id: 58, cat: 'Sensorik & Kinetic', title: 'Offizieller Dezibel-Knusper-Index (86 dB bis 94 dB)', link: '#speisen' },
    { id: 59, cat: 'Sensorik & Kinetic', title: 'Aufsteigende Buchenglut-Partikel im Hero-Canvas', link: '#hero' },
    { id: 60, cat: 'Sensorik & Kinetic', title: 'Virtueller Stubbi-Kronkorken-Öffner mit Zisch-Akustik', link: '#stubbi-open-btn' },

    { id: 61, cat: 'Kulinarik & Oma-Faktor', title: 'Secret Drop #001 Karte & Detailseite: Lyoner Smash Burger', link: 'menu/lyoner-smash-burger.html' },
    { id: 62, cat: 'Kulinarik & Oma-Faktor', title: 'Vegane Gefillde Bombs Karte & eigene Detailseite', link: 'menu/vegane-gefillde-bombs.html' },
    { id: 63, cat: 'Kulinarik & Oma-Faktor', title: '6. Getränk: Mattschwarze Collab-Dose „Buchenglut Lager“', link: 'getraenke.html' },
    { id: 64, cat: 'Kulinarik & Oma-Faktor', title: 'D2C Vorratskammer (250ml Maggi-Miso Glaze & Saar-Dust)', link: '#merch' },
    { id: 65, cat: 'Kulinarik & Oma-Faktor', title: 'Interaktive LMIV-Allergen- & Ernährungs-Schnellfilter', link: '#speisen' },
    { id: 66, cat: 'Kulinarik & Oma-Faktor', title: 'Oma Hilde (82, Püttlingen) Kommentare bei den Ikonen', link: '#speisen' },
    { id: 67, cat: 'Kulinarik & Oma-Faktor', title: 'Perfektes Getränk- & Beilagen-Pairing auf Detailseiten', link: 'menu/lyoner-smash-burger.html' },
    { id: 68, cat: 'Kulinarik & Oma-Faktor', title: '6-Schichten-Anatomie des Schwenker Katsu Sandos', link: '#speisen' },
    { id: 69, cat: 'Kulinarik & Oma-Faktor', title: 'Geheim-Rezeptkarte: „Maggi-Miso-Mayo für Dehäm“', link: '#maggi-bottle' },
    { id: 70, cat: 'Kulinarik & Oma-Faktor', title: 'Streetwear Spec-Artwork (280 GSM Shirt & Maggi-Holster)', link: '#merch' },

    { id: 71, cat: 'FOMO & Stammtisch', title: 'Live Phase-1-Statusanzeige für Drop #001', link: '#drops-preview' },
    { id: 72, cat: 'FOMO & Stammtisch', title: 'Transparente 500-Portionen Batch-Allokations-Balken', link: 'drops.html' },
    { id: 73, cat: 'FOMO & Stammtisch', title: 'Sofort-Pass-Vergabe (#SV-XXXX) auch im Offline/Vorab-Modus', link: '#gemeinde' },
    { id: 74, cat: 'FOMO & Stammtisch', title: '1-Klick .ics Kalender-Blocker für Drop #001', link: '#drops-preview' },
    { id: 75, cat: 'FOMO & Stammtisch', title: 'Ungeschönte saarländische Test-Esser-Stimmen', link: '#gemeinde' },
    { id: 76, cat: 'FOMO & Stammtisch', title: '5er-Schicht Stammtisch-Bonus (Gratis Saar-Kimchi)', link: '#gemeinde' },
    { id: 77, cat: 'FOMO & Stammtisch', title: 'Interaktiver 4-Stufen-Rang-Umschalter am 3D-Pass', link: '#gemeinde' },
    { id: 78, cat: 'FOMO & Stammtisch', title: 'Fast-Lane-Zeitersparnis-Anzeige (0 Min. statt 35 Min.)', link: '#gemeinde' },
    { id: 79, cat: 'FOMO & Stammtisch', title: 'Schichtplan der 4-köpfigen Schwenk-Cube Crew', link: 'drops.html' },
    { id: 80, cat: 'FOMO & Stammtisch', title: 'Digitale Lese- & Druck-Vorschau der Saarvice Gazette', link: '#viral-arena' },

    { id: 81, cat: 'B2B, Verein & Presse', title: 'Vereinsfest-, Feuerwehr- & Kirmes-Kooperationsmodell', link: 'catering.html' },
    { id: 82, cat: 'B2B, Verein & Presse', title: 'Kalkulator-Add-ons: Lyoner-Mitternachtssnack & Fass-Viez', link: 'catering.html#kalkulator' },
    { id: 83, cat: 'B2B, Verein & Presse', title: 'Live Pro-Kopf-Preis + WhatsApp-Teilen fürs Orga-Team', link: 'catering.html#kalkulator' },
    { id: 84, cat: 'B2B, Verein & Presse', title: '3 Maßgeschneiderte B2B-Pakete (Schwenk-Schicht bis Festival)', link: 'catering.html' },
    { id: 85, cat: 'B2B, Verein & Presse', title: 'Interaktiver 3-Sekunden Hof- & Stellplatz-Prüfer', link: 'catering.html' },
    { id: 86, cat: 'B2B, Verein & Presse', title: 'Hochzeits-Special: Katsu Sando statt Mitternachtssuppe', link: 'catering.html' },
    { id: 87, cat: 'B2B, Verein & Presse', title: '1-Klick Pressetext-Kopierer für SR, SZ & Lokalmedien', link: 'presse.html' },
    { id: 88, cat: 'B2B, Verein & Presse', title: 'VIP Pre-Tasting Akkreditierung (30 Min. vor Feuer frei)', link: 'presse.html' },
    { id: 89, cat: 'B2B, Verein & Presse', title: 'Design-Token & Markenfarben-Board auf der Presseseite', link: 'presse.html' },
    { id: 90, cat: 'B2B, Verein & Presse', title: '100% Bereinigung aller offenen [NEEDS_REVIEW]-Stellen', link: 'impressum.html' },

    { id: 91, cat: 'Tech, PWA & Live', title: 'Installierbare Progressive Web App (manifest.webmanifest)', link: 'manifest.webmanifest' },
    { id: 92, cat: 'Tech, PWA & Live', title: 'Offline-Service-Worker für Funklöcher im Saarkohlenwald', link: 'sw.js' },
    { id: 93, cat: 'Tech, PWA & Live', title: 'Dynamischer Tab-Titel („🔥 Uffbasse! Dei Schwenker brennt an!“)', link: '#hero' },
    { id: 94, cat: 'Tech, PWA & Live', title: 'Vollständiger Schema.org Graph (Restaurant, Menu, FoodEvent)', link: '#hero' },
    { id: 95, cat: 'Tech, PWA & Live', title: 'Erweiterte llms.txt Wissensbasis für KI-Suchmaschinen', link: 'llms.txt' },
    { id: 96, cat: 'Tech, PWA & Live', title: 'WOFF2 Font-Preloading für 0.00 CLS & Instant-Render', link: '#hero' },
    { id: 97, cat: 'Tech, PWA & Live', title: 'Vektor-QR-Code & 3D-Tilt-Physik im Stammtisch-Pass', link: '#wallet-card-3d' },
    { id: 98, cat: 'Tech, PWA & Live', title: 'Interaktives 100-Punkte Saarland-Viralitäts-Cockpit', link: '#open-viral-cockpit-btn' },
    { id: 99, cat: 'Tech, PWA & Live', title: '17/17 Seiten Grün in check-site.py & Sitemap-Integration', link: 'sitemap.xml' },
    { id: 100, cat: 'Tech, PWA & Live', title: 'Live-Deployment im Web mit öffentlicher URL', link: '#hero' }
  ];

  function initViralCockpitModal() {
    var openBtn = $('open-viral-cockpit-btn');
    var closeBtn = $('close-viral-cockpit-btn');
    var modal = $('viral-cockpit-modal');
    var listEl = $('viral-100-list');
    var filterBar = $('cockpit-cat-filter');
    if (!openBtn || !modal || !listEl) return;

    var cats = ['Alle (100)'];
    VIRAL_100_ITEMS.forEach(function (it) {
      if (cats.indexOf(it.cat) === -1) cats.push(it.cat);
    });

    function renderItems(cat) {
      var filtered = (!cat || cat === 'Alle (100)')
        ? VIRAL_100_ITEMS
        : VIRAL_100_ITEMS.filter(function (i) { return i.cat === cat; });

      listEl.innerHTML = filtered.map(function (it) {
        var num = String(it.id).padStart(3, '0');
        return '<div class="viral-100-item">' +
          '<div><span style="font-size:0.7rem; text-transform:uppercase; color:rgba(242,234,218,0.55);">' + it.cat + '</span>' +
          '<div><strong>#' + num + '</strong> — ' + it.title + '</div></div>' +
          '<div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.25rem;">' +
          '<span style="color:#4ade80; font-size:0.72rem; font-weight:700;">● LIVE AKTIV</span>' +
          '<a href="' + it.link + '" class="cockpit-jump-link" style="color:var(--c-gold); font-size:0.75rem; font-weight:700;">Hinspringe →</a>' +
          '</div></div>';
      }).join('');

      listEl.querySelectorAll('.cockpit-jump-link').forEach(function (a) {
        a.addEventListener('click', function () { modal.hidden = true; });
      });
    }

    if (filterBar) {
      filterBar.innerHTML = cats.map(function (c, i) {
        return '<button type="button" class="viral-tab-btn' + (i === 0 ? ' active' : '') + '" data-cat="' + c + '" style="padding:0.35rem 0.75rem; font-size:0.78rem;">' + c + '</button>';
      }).join('');
      filterBar.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () {
          filterBar.querySelectorAll('button').forEach(function (x) { x.classList.remove('active'); });
          b.classList.add('active');
          renderItems(b.getAttribute('data-cat'));
        });
      });
    }

    renderItems('Alle (100)');

    openBtn.addEventListener('click', function () {
      modal.hidden = false;
      ViralAudio.maggi();
    });
    if (closeBtn) {
      closeBtn.addEventListener('click', function () { modal.hidden = true; });
    }
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.hidden = true;
    });
  }

  /* ------------------------------------------------------------------ *
   * 12. PWA SERVICE WORKER REGISTRATION (#092)
   * ------------------------------------------------------------------ */
  function initServiceWorker() {
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderStamps();
    initHeaderControls();
    initSensoryAndMenuExtras();
    initKulturLabor();
    initLandkreisBattle();
    initCanvasGenerators();
    initPassAndLexikonExtras();
    initSubpageTools();
    initViralCockpitModal();
    initServiceWorker();
  });
})();
