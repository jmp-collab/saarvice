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
    { id: 98, cat: 'Tech, PWA & Live', title: 'Interaktives 200-Punkte Viralitäts- & KI-Mastermind-Cockpit', link: '#open-viral-cockpit-btn' },
    { id: 99, cat: 'Tech, PWA & Live', title: '18/18 Seiten Grün in check-site.py & Sitemap-Integration', link: 'sitemap.xml' },
    { id: 100, cat: 'Tech, PWA & Live', title: 'Live-Deployment im Web mit öffentlicher URL', link: '#hero' },

    // XI. Typografie-Upgrade & Jean Maurice Port als Maskottchen & Mastermind (101–110)
    { id: 101, cat: 'Jean Mastermind & Font', title: 'High-Legibility Body-Font (Plus Jakarta Sans WOFF2)', link: 'jean.html' },
    { id: 102, cat: 'Jean Mastermind & Font', title: 'Optimierte Display-Typografie & entspannte Laufweite', link: 'jean.html' },
    { id: 103, cat: 'Jean Mastermind & Font', title: 'Interaktiver Aa Lesbarkeits- & Kontrast-Umschalter', link: '#readability-toggle-btn' },
    { id: 104, cat: 'Jean Mastermind & Font', title: 'Jean Maurice Port als offizielles SVG-Maskottchen', link: 'jean.html' },
    { id: 105, cat: 'Jean Mastermind & Font', title: 'Echte Jean-Porträts (jean.jpg & jean-cool.jpg) lokal & offline', link: 'jean.html' },
    { id: 106, cat: 'Jean Mastermind & Font', title: '„Jean sagt:“-Kommentar-Bubbles an allen Schlüsselstellen', link: '#manifest' },
    { id: 107, cat: 'Jean Mastermind & Font', title: 'Header-Mastermind-Pill („🧔 Jean & KI-Hub“)', link: 'jean.html' },
    { id: 108, cat: 'Jean Mastermind & Font', title: 'Schwebendes „Frag Jean 🧔“-Mastermind-Dock auf allen Seiten', link: 'jean.html' },
    { id: 109, cat: 'Jean Mastermind & Font', title: 'Echte Saarland- & KI-Karriere-Story (Uni des Saarlandes → Head of AI)', link: 'jean.html' },
    { id: 110, cat: 'Jean Mastermind & Font', title: 'Dedizierte Flaggschiff-Hub-Seite jean.html', link: 'jean.html' },

    // XII. Prompt Engineering & 1-Click Send to ChatGPT/Claude/Perplexity/Gemini (111–120)
    { id: 111, cat: 'Prompt-Tresor & LLMs', title: 'Universal 1-Click Prompt-Launcher (ChatGPT, Claude, Perplexity, Gemini)', link: 'jean.html#prompt-lab' },
    { id: 112, cat: 'Prompt-Tresor & LLMs', title: 'Live Variablen-Injektion (Branche, Region, KPI-Ziel)', link: 'jean.html#prompt-lab' },
    { id: 113, cat: 'Prompt-Tresor & LLMs', title: 'Master-Prompt #1: Der Virale Kult-Brand-Architekt', link: 'jean.html#prompt-lab' },
    { id: 114, cat: 'Prompt-Tresor & LLMs', title: 'Master-Prompt #2: Jeans SGE & AI-Overviews Citability-Booster', link: 'jean.html#prompt-lab' },
    { id: 115, cat: 'Prompt-Tresor & LLMs', title: 'Master-Prompt #3: High-SKU Programmatic SEO & Knowledge-Atomizer', link: 'jean.html#prompt-lab' },
    { id: 116, cat: 'Prompt-Tresor & LLMs', title: 'Master-Prompt #4: Editorial Food- & Produkt-Visuals (Midjourney/Flux)', link: 'jean.html#prompt-lab' },
    { id: 117, cat: 'Prompt-Tresor & LLMs', title: 'Master-Prompt #5: Das OIODO-Geschäftsmodell- & Growth-Audit', link: 'jean.html#prompt-lab' },
    { id: 118, cat: 'Prompt-Tresor & LLMs', title: 'Master-Prompt #6: Interaktiver Rechner- & Lead-Magnet-Baukasten', link: 'jean.html#prompt-lab' },
    { id: 119, cat: 'Prompt-Tresor & LLMs', title: 'Gericht-spezifische KI-Koch-Prompts auf allen 10 Menü-Seiten', link: 'menu/schwenker-katsu-sando.html' },
    { id: 120, cat: 'Prompt-Tresor & LLMs', title: 'Live Prompt-Roaster & CO-STAR System-Prompt-Upgrader', link: 'jean.html#prompt-lab' },

    // XIII. Interaktive KI-, SEO-, SGE- & Business-Rechner (121–130)
    { id: 121, cat: 'KI- & SEO-Rechner', title: 'Prompt-Engineering ROI- & Team-Zeitspar-Rechner', link: 'jean.html#ki-rechner' },
    { id: 122, cat: 'KI- & SEO-Rechner', title: 'Briot-Sando-Äquivalenz im ROI-Rechner', link: 'jean.html#ki-rechner' },
    { id: 123, cat: 'KI- & SEO-Rechner', title: 'SGE / AI-Overviews Citability & GEO-Score-Check (0–100)', link: 'jean.html#ki-rechner' },
    { id: 124, cat: 'KI- & SEO-Rechner', title: 'Programmatic SEO High-SKU E-Commerce Umsatz-Simulator', link: 'jean.html#ki-rechner' },
    { id: 125, cat: 'KI- & SEO-Rechner', title: 'KI-Verzeichnis Backlink- & DR-Boost-Rechner (256+ Directories)', link: 'jean.html#ki-rechner' },
    { id: 126, cat: 'KI- & SEO-Rechner', title: 'Dynamische Fix-Prompt-Generierung aus dem SGE-Score', link: 'jean.html#ki-rechner' },
    { id: 127, cat: 'KI- & SEO-Rechner', title: '1-Click „Rechner-Ergebnis an ChatGPT senden“-Brücke', link: 'jean.html#ki-rechner' },
    { id: 128, cat: 'KI- & SEO-Rechner', title: '1-Click „Rechner-Ergebnis an Claude senden“-Brücke', link: 'jean.html#ki-rechner' },
    { id: 129, cat: 'KI- & SEO-Rechner', title: 'Direktlink zu Gratis-Verzeichnissen aus dem DR-Rechner', link: 'jean.html#ki-rechner' },
    { id: 130, cat: 'KI- & SEO-Rechner', title: 'Aria-Live Echtzeit-Auswertung aller 4 Decision-Rechner', link: 'jean.html#ki-rechner' },

    // XIV. Interaktive Tutorials & Praxis-Blueprints (131–140)
    { id: 131, cat: 'Tutorials & Blueprints', title: 'Tutorial #1: Der 45-Minuten Kult-Brand-Sprint (SAARVICE-Methode)', link: 'jean.html#tutorials' },
    { id: 132, cat: 'Tutorials & Blueprints', title: 'Tutorial #2: AI Engine Optimization (llms.txt & GEO in 12 Min.)', link: 'jean.html#tutorials' },
    { id: 133, cat: 'Tutorials & Blueprints', title: 'Tutorial #3: Vom Hersteller-PDF zur zitierbaren Knowledge Engine', link: 'jean.html#tutorials' },
    { id: 134, cat: 'Tutorials & Blueprints', title: '1-Click „Tutorial als interaktiven Coach in ChatGPT starten“', link: 'jean.html#tutorials' },
    { id: 135, cat: 'Tutorials & Blueprints', title: '1-Click „Tutorial als interaktiven Coach in Claude starten“', link: 'jean.html#tutorials' },
    { id: 136, cat: 'Tutorials & Blueprints', title: '1-Click „Tutorial in Perplexity vertiefen“', link: 'jean.html#tutorials' },
    { id: 137, cat: 'Tutorials & Blueprints', title: 'Praxis-Schritte mit konkreten Deliverables statt Theorie', link: 'jean.html#tutorials' },
    { id: 138, cat: 'Tutorials & Blueprints', title: 'Kopierfertige Coach-Prompts unter jedem Tutorial', link: 'jean.html#tutorials' },
    { id: 139, cat: 'Tutorials & Blueprints', title: 'Zeit- & Skill-Tags auf allen Tutorial-Karten', link: 'jean.html#tutorials' },
    { id: 140, cat: 'Tutorials & Blueprints', title: 'Stempelheft-Belohnung beim Abfeuern eines Tutorial-Prompts', link: 'jean.html#tutorials' },

    // XV. AIGEDDON YouTube-Channel & Video Case Studies (141–150)
    { id: 141, cat: 'AIGeddon & Promptgott', title: 'AIGEDDON ☢️ YouTube-Channel Banner & Direkt-Abo-Trigger', link: 'jean.html#aigeddon' },
    { id: 142, cat: 'AIGeddon & Promptgott', title: 'Case Study #1: Das SAARVICE-Experiment (200 Features Live)', link: 'jean.html#aigeddon' },
    { id: 143, cat: 'AIGeddon & Promptgott', title: 'Case Study #2: 256+ KI-Verzeichnisse als organische SEO-Maschine', link: 'jean.html#aigeddon' },
    { id: 144, cat: 'AIGeddon & Promptgott', title: 'Case Study #3: Moto Knowledge Engine & Simson Schmitt SEO-Hub', link: 'jean.html#aigeddon' },
    { id: 145, cat: 'AIGeddon & Promptgott', title: '1-Click „Case Study in ChatGPT aufs eigene Business adaptieren“', link: 'jean.html#aigeddon' },
    { id: 146, cat: 'AIGeddon & Promptgott', title: 'Promptgott ⚡ Newsletter Vault mit Themen-Schwerpunkten', link: 'jean.html#promptgott' },
    { id: 147, cat: 'AIGeddon & Promptgott', title: 'Sofort-Freischaltung des Promptgott Starter-Decks im Browser', link: 'jean.html#promptgott' },
    { id: 148, cat: 'AIGeddon & Promptgott', title: '1-Click Download des Promptgott-Playbooks als Markdown-Datei (.md)', link: 'jean.html#promptgott' },
    { id: 149, cat: 'AIGeddon & Promptgott', title: 'Kein-Spam-Ehrenwort & Doppelweck-Abmelde-Garantie', link: 'jean.html#promptgott' },
    { id: 150, cat: 'AIGeddon & Promptgott', title: 'Homepage-Integration von Promptgott & AIGeddon (#jean-mastermind)', link: '#jean-mastermind' },

    // XVI–XX. Monetarisierung, Zentrales Ökosystem & Domain-Strategie (151–200)
    { id: 151, cat: 'Monetarisierung & Hub', title: 'Done-For-You KI-Verzeichnis Launch-Service Integration', link: 'jean.html#monetarisierung' },
    { id: 152, cat: 'Monetarisierung & Hub', title: '90-Minuten 1:1 KI-, SGE- & SEO-Sparring mit Jean (490 €)', link: 'jean.html#monetarisierung' },
    { id: 153, cat: 'Monetarisierung & Hub', title: 'Exklusiver 50% Aura++ Deal-Code (50AIDIRECTORIES) mit 1-Click-Copy', link: 'jean.html#monetarisierung' },
    { id: 154, cat: 'Monetarisierung & Hub', title: 'Direktbrücke zum kompletten Rabattcode-Tresor auf ai-directories', link: 'jean.html#monetarisierung' },
    { id: 155, cat: 'Monetarisierung & Hub', title: 'Newsletter- & YouTube-Sponsoring-Anfrage-Karte', link: 'jean.html#monetarisierung' },
    { id: 156, cat: 'Monetarisierung & Hub', title: 'Zentrales Ökosystem-Radar mit 8 Plattformen & Live-Filter', link: 'jean.html#ecosystem' },
    { id: 157, cat: 'Monetarisierung & Hub', title: 'Vernetztes JSON-LD Person-Schema (Jean Maurice Port + sameAs)', link: 'jean.html' },
    { id: 158, cat: 'Monetarisierung & Hub', title: 'Multi-Domain- vs. Subfolder-SEO-Architektur-Board', link: 'jean.html#domains' },
    { id: 159, cat: 'Monetarisierung & Hub', title: 'Kopierfertige GitHub-Pages DNS A-Records für Custom-Domains', link: 'jean.html#domains' },
    { id: 160, cat: 'Monetarisierung & Hub', title: 'Erweiterte llms.txt V4 mit komplettem Jean-Maurice-Port-Profil', link: 'llms.txt' },
    { id: 161, cat: 'Monetarisierung & Hub', title: 'AIGeddon KI-Verzeichnisse Knoten im zentralen Hub', link: 'jean.html#ecosystem' },
    { id: 162, cat: 'Monetarisierung & Hub', title: 'Moto Knowledge Engine (1.840 Wissens-Atome) Showcase', link: 'jean.html#ecosystem' },
    { id: 163, cat: 'Monetarisierung & Hub', title: 'Awesome Simson & TwoStroke GPL-Theme Showcase', link: 'jean.html#ecosystem' },
    { id: 164, cat: 'Monetarisierung & Hub', title: 'Hugging Face (@jmp1987) & GitHub (@jmp-collab) Direkt-Hub', link: 'jean.html#ecosystem' },
    { id: 165, cat: 'Monetarisierung & Hub', title: 'kannkind.ai B2B AI × SEO Systems Architektur-Link', link: 'jean.html#ecosystem' },
    { id: 166, cat: 'Monetarisierung & Hub', title: 'Automatische KI-Rezept-Prompts auf Schwenker Katsu Sando', link: 'menu/schwenker-katsu-sando.html' },
    { id: 167, cat: 'Monetarisierung & Hub', title: 'Automatische KI-Rezept-Prompts auf Gefillde Bombs', link: 'menu/gefillde-bombs.html' },
    { id: 168, cat: 'Monetarisierung & Hub', title: 'Automatische KI-Rezept-Prompts auf Dibbelabbes Crunch Stack', link: 'menu/dibbelabbes-crunch-stack.html' },
    { id: 169, cat: 'Monetarisierung & Hub', title: 'Automatische KI-Rezept-Prompts auf Merguez Falafel Doppelweck', link: 'menu/merguez-falafel-doppelweck.html' },
    { id: 170, cat: 'Monetarisierung & Hub', title: 'Automatische KI-Rezept-Prompts auf Lyoner Smash Burger', link: 'menu/lyoner-smash-burger.html' },
    { id: 171, cat: 'Monetarisierung & Hub', title: 'Automatische KI-Rezept-Prompts auf Vegane Gefillde Bombs', link: 'menu/vegane-gefillde-bombs.html' },
    { id: 172, cat: 'Monetarisierung & Hub', title: 'Automatische KI-Rezept-Prompts auf Kräuterseitling Katsu Sando', link: 'menu/kraeuterseitling-katsu-sando.html' },
    { id: 173, cat: 'Monetarisierung & Hub', title: 'Automatische KI-Rezept-Prompts auf Gequellte Crinkle Fries', link: 'menu/gequellte-crinkle-fries.html' },
    { id: 174, cat: 'Monetarisierung & Hub', title: 'Automatische KI-Rezept-Prompts auf Saar-Kimchi', link: 'menu/saar-kimchi.html' },
    { id: 175, cat: 'Monetarisierung & Hub', title: 'Automatische KI-Rezept-Prompts auf Grumbeer-Churros', link: 'menu/grumbeer-churros.html' },
    { id: 176, cat: 'Monetarisierung & Hub', title: 'Kontext-Callout von Jean auf der Drops-Seite', link: 'drops.html' },
    { id: 177, cat: 'Monetarisierung & Hub', title: 'Kontext-Callout von Jean auf der Getränke-Seite', link: 'getraenke.html' },
    { id: 178, cat: 'Monetarisierung & Hub', title: 'Kontext-Callout von Jean auf der Catering-Seite', link: 'catering.html' },
    { id: 179, cat: 'Monetarisierung & Hub', title: 'Kontext-Callout von Jean auf der Presse-Seite', link: 'presse.html' },
    { id: 180, cat: 'Monetarisierung & Hub', title: 'Kontext-Callout von Jean im Impressum', link: 'impressum.html' },
    { id: 181, cat: 'Monetarisierung & Hub', title: '1-Click ChatGPT Deep-Link Encoder (UTF-8 URL-Safe)', link: 'jean.html#prompt-lab' },
    { id: 182, cat: 'Monetarisierung & Hub', title: '1-Click Claude.ai Deep-Link Encoder (claude.ai/new?q=...)', link: 'jean.html#prompt-lab' },
    { id: 183, cat: 'Monetarisierung & Hub', title: '1-Click Perplexity Deep-Link Encoder (perplexity.ai/search?q=...)', link: 'jean.html#prompt-lab' },
    { id: 184, cat: 'Monetarisierung & Hub', title: '1-Click Gemini Clipboard-Bridge & Auto-Launch', link: 'jean.html#prompt-lab' },
    { id: 185, cat: 'Monetarisierung & Hub', title: 'Komfort-XL Lesemodus (19.5px Grundschrift & 1.75 Zeilenhöhe)', link: '#readability-toggle-btn' },
    { id: 186, cat: 'Monetarisierung & Hub', title: 'Max-Kontrast Lesemodus (Reines Weiß auf Tiefschwarz)', link: '#readability-toggle-btn' },
    { id: 187, cat: 'Monetarisierung & Hub', title: 'Persistente Speicherung des Lesemodus in localStorage', link: '#readability-toggle-btn' },
    { id: 188, cat: 'Monetarisierung & Hub', title: 'Saarländischer Dialekt-Support auf jean.html', link: 'jean.html' },
    { id: 189, cat: 'Monetarisierung & Hub', title: 'Karriere-Timeline & Credibility-Cards (MotoMobility, Greyheart, Saarland)', link: 'jean.html' },
    { id: 190, cat: 'Monetarisierung & Hub', title: 'Akademischer Nachweis (Uni des Saarlandes & Uni Trier M.A. 1,6)', link: 'jean.html' },
    { id: 191, cat: 'Monetarisierung & Hub', title: 'Zertifikats-Integration (Google Cloud GenAI, Google Ads, SOSTAC)', link: 'jean.html' },
    { id: 192, cat: 'Monetarisierung & Hub', title: 'Cross-Site Footer-Vernetzung zu AIGeddon & AI-Directories', link: '#jean-mastermind' },
    { id: 193, cat: 'Monetarisierung & Hub', title: 'Sitemap.xml V4 inkl. jean.html mit Priorität 0.95', link: 'sitemap.xml' },
    { id: 194, cat: 'Monetarisierung & Hub', title: 'Service-Worker V4 Caching für jean.html & Jean-Porträts', link: 'sw.js' },
    { id: 195, cat: 'Monetarisierung & Hub', title: '1-Click E-Mail-Briefing für 90-Minuten Sparring', link: 'jean.html#monetarisierung' },
    { id: 196, cat: 'Monetarisierung & Hub', title: 'Interaktive Prompt-Kopier-Bestätigung mit Funken-Physik', link: 'jean.html#prompt-lab' },
    { id: 197, cat: 'Monetarisierung & Hub', title: 'Automatische Pfad-Auflösung für Unterseiten im Jean-Dock', link: 'jean.html' },
    { id: 198, cat: 'Monetarisierung & Hub', title: 'Dokumentation SAARVICE_NEXT_100_MASTERMIND.md im Repository', link: 'SAARVICE_NEXT_100_MASTERMIND.md' },
    { id: 199, cat: 'Monetarisierung & Hub', title: 'Null-Fehler-Validierung über alle 18 HTML-Dateien', link: 'jean.html' },
    { id: 200, cat: 'Monetarisierung & Hub', title: 'Öffentliches Live-Deployment von SAARVICE V4 & jean.html', link: 'jean.html' }
  ];

  function initViralCockpitModal() {
    var openBtn = $('open-viral-cockpit-btn') || $('open-cockpit-btn');
    var closeBtn = $('close-viral-cockpit-btn');
    var modal = $('viral-cockpit-modal');
    var listEl = $('viral-100-list');
    var filterBar = $('cockpit-cat-filter');
    if (!openBtn || !modal || !listEl) return;

    var allLabel = 'Alle (' + VIRAL_100_ITEMS.length + ')';
    var cats = [allLabel];
    VIRAL_100_ITEMS.forEach(function (it) {
      if (cats.indexOf(it.cat) === -1) cats.push(it.cat);
    });

    function renderItems(cat) {
      var filtered = (!cat || cat === allLabel)
        ? VIRAL_100_ITEMS
        : VIRAL_100_ITEMS.filter(function (i) { return i.cat === cat; });

      listEl.innerHTML = filtered.map(function (it) {
        var num = String(it.id).padStart(3, '0');
        return '<div class="viral-100-item">' +
          '<div><span style="font-size:0.7rem; text-transform:uppercase; color:rgba(242,234,218,0.55);">' + it.cat + '</span>' +
          '<div><strong>#' + num + '</strong> — ' + it.title + '</div></div>' +
          '<div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.25rem;">' +
          '<span style="color:#4ade80; font-size:0.72rem; font-weight:700;">● LIVE AKTIV</span>' +
          '<a href="' + it.link + '" class="cockpit-jump-link" style="color:var(--c-gold); font-size:0.75rem; font-weight:700;">Öffnen →</a>' +
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

    renderItems(allLabel);

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
   * 12. JEAN MAURICE PORT MASTERMIND, READABILITY & PROMPT HUB (#101–#200)
   * ------------------------------------------------------------------ */
  function buildLlmActionButtonsHtml(promptText) {
    var encoded = encodeURIComponent(promptText.trim());
    return '' +
      '<a href="https://chatgpt.com/?q=' + encoded + '" target="_blank" rel="noopener noreferrer" class="llm-btn llm-btn--chatgpt" title="Diesen Prompt direkt an ChatGPT senden">🤖 An ChatGPT senden</a>' +
      '<a href="https://claude.ai/new?q=' + encoded + '" target="_blank" rel="noopener noreferrer" class="llm-btn llm-btn--claude" title="Diesen Prompt direkt an Claude senden">🧠 An Claude senden</a>' +
      '<a href="https://www.perplexity.ai/search?q=' + encoded + '" target="_blank" rel="noopener noreferrer" class="llm-btn llm-btn--perplexity" title="Diesen Prompt direkt an Perplexity senden">🔎 An Perplexity</a>' +
      '<button type="button" class="llm-btn llm-btn--gemini" data-gemini-prompt="' + encoded + '" title="Prompt kopieren &amp; Google Gemini öffnen">✨ Gemini öffnen</button>' +
      '<button type="button" class="llm-btn llm-btn--copy" data-raw-prompt="' + encoded + '" title="Prompt in die Zwischenablage kopieren">📋 Prompt kopieren</button>';
  }

  function wireLlmButtonEvents(rootEl) {
    var scope = rootEl || document;
    scope.querySelectorAll('[data-raw-prompt]').forEach(function (btn) {
      if (btn.dataset.wired) return;
      btn.dataset.wired = '1';
      btn.addEventListener('click', function () {
        var txt = decodeURIComponent(btn.getAttribute('data-raw-prompt') || '');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(txt).catch(function () {});
        }
        var orig = btn.innerHTML;
        btn.innerHTML = '✅ Kopiert!';
        unlockStamp('lexikon');
        setTimeout(function () { btn.innerHTML = orig; }, 1800);
      });
    });

    scope.querySelectorAll('[data-gemini-prompt]').forEach(function (btn) {
      if (btn.dataset.wired) return;
      btn.dataset.wired = '1';
      btn.addEventListener('click', function () {
        var txt = decodeURIComponent(btn.getAttribute('data-gemini-prompt') || '');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(txt).catch(function () {});
        }
        btn.innerHTML = '✅ Kopiert — Gemini öffnet…';
        window.open('https://gemini.google.com/app', '_blank', 'noopener');
        setTimeout(function () { btn.innerHTML = '✨ Gemini öffnen'; }, 2200);
      });
    });

    scope.querySelectorAll('[data-copy-text]').forEach(function (btn) {
      if (btn.dataset.wired) return;
      btn.dataset.wired = '1';
      btn.addEventListener('click', function () {
        var txt = btn.getAttribute('data-copy-text') || '';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(txt).catch(function () {});
        }
        var orig = btn.innerHTML;
        btn.innerHTML = '✅ In Zwischenablage kopiert!';
        setTimeout(function () { btn.innerHTML = orig; }, 1800);
      });
    });
  }

  function refreshAllPromptActionRows() {
    document.querySelectorAll('[data-prompt-actions]').forEach(function (row) {
      var card = row.closest('.prompt-card') || row.parentElement;
      if (!card) return;
      var pre = card.querySelector('.prompt-code-box');
      if (!pre) return;
      var text = pre.textContent || '';
      row.innerHTML = buildLlmActionButtonsHtml(text);
    });
    wireLlmButtonEvents(document);
  }

  function initReadabilitySwitcher() {
    var modes = [
      { id: 'standard', label: 'Lesemodus: Standard' },
      { id: 'xl', label: 'Lesemodus: Komfort XL' },
      { id: 'contrast', label: 'Lesemodus: Max-Kontrast' }
    ];
    var saved = storeGet('sv_readability_v4', 'standard');

    function applyReadability(modeId) {
      if (modeId === 'standard') {
        document.documentElement.removeAttribute('data-readability');
      } else {
        document.documentElement.setAttribute('data-readability', modeId);
      }
      var found = modes.find(function (m) { return m.id === modeId; }) || modes[0];
      var lbl = $('readability-label');
      if (lbl) lbl.textContent = found.label;
      storeSet('sv_readability_v4', found.id);
    }

    applyReadability(saved);

    var btn = $('readability-toggle-btn');
    if (btn) {
      btn.addEventListener('click', function () {
        var cur = storeGet('sv_readability_v4', 'standard');
        var idx = modes.findIndex(function (m) { return m.id === cur; });
        var next = modes[(idx + 1) % modes.length];
        applyReadability(next.id);
        ViralAudio.sizzle();
      });
    }
  }

  function initJeanMastermindLab() {
    refreshAllPromptActionRows();

    // 1. Live Variable Customizer on jean.html
    var applyBtn = $('p-var-apply');
    var nicheIn = $('p-var-niche');
    var regionIn = $('p-var-region');
    var goalIn = $('p-var-goal');

    function updateParameterizedPrompts() {
      if (!nicheIn || !regionIn || !goalIn) return;
      var niche = nicheIn.value.trim() || 'Saarland Streetfood';
      var region = regionIn.value.trim() || 'DACH';
      var goal = goalIn.value || 'Maximale Viralität';
      document.querySelectorAll('[data-prompt-template]').forEach(function (pre) {
        var tpl = pre.getAttribute('data-prompt-template') || '';
        pre.textContent = tpl
          .replace(/\{NICHE\}/g, niche)
          .replace(/\{REGION\}/g, region)
          .replace(/\{GOAL\}/g, goal);
      });
      refreshAllPromptActionRows();
    }

    if (applyBtn) {
      applyBtn.addEventListener('click', function () {
        updateParameterizedPrompts();
        ViralAudio.maggi();
      });
      [nicheIn, regionIn, goalIn].forEach(function (el) {
        if (el) el.addEventListener('input', updateParameterizedPrompts);
      });
    }

    // 2. Live Prompt-Roaster & CO-STAR Upgrader
    var roastIn = $('roast-raw-input');
    var roastBtn = $('roast-upgrade-btn');
    var roastOut = $('roast-upgraded-output');
    var roastActions = $('roast-upgraded-actions');

    function runPromptUpgrader() {
      if (!roastIn || !roastOut || !roastActions) return;
      var raw = roastIn.value.trim() || 'Optimiere meine Website für Google und KI-Suche';
      var upgraded = [
        '# SYSTEM-DIREKTIVE (CO-STAR × JEAN MAURICE PORT FRAMEWORK)',
        '## 1. ROLLE & EXPERTISE',
        'Du agierst als Senior SEO/SGE Architect, Generative AI Engineer und Conversion-Stratege mit 10+ Jahren Praxis in High-SKU E-Commerce und viralem Brand-Building.',
        '',
        '## 2. URSPRÜNGLICHE AUFGABE',
        '» ' + raw + ' «',
        '',
        '## 3. HARTE QUALITÄTS-CONSTRAINTS',
        '- Keine generischen KI-Floskeln („In der heutigen digitalen Welt…“ ist strikt verboten).',
        '- Liefere konkrete, messbare Beispiele, Zahlen und sofort kopierbare Vorlagen.',
        '- Berücksichtige sowohl menschliche Psychologie (Conversion) als auch LLM-Citability (Google AI Overviews / ChatGPT Search).',
        '',
        '## 4. GEFORDERTES OUTPUT-FORMAT',
        '1. Sofort umsetzbarer Master-Entwurf',
        '2. Semantische Entitäts- & Fakten-Checkliste (Tabellenform)',
        '3. Die 3 größten Hebel für die nächsten 48 Stunden.'
      ].join('\n');
      roastOut.textContent = upgraded;
      roastActions.innerHTML = buildLlmActionButtonsHtml(upgraded);
      wireLlmButtonEvents(roastActions);
    }

    if (roastBtn) {
      runPromptUpgrader();
      roastBtn.addEventListener('click', function () {
        runPromptUpgrader();
        ViralAudio.sizzle();
      });
      if (roastIn) roastIn.addEventListener('input', runPromptUpgrader);
    }

    // 3. KI- & SEO-Calculators on jean.html
    var roiTeam = $('calc-roi-team');
    var roiRate = $('calc-roi-rate');
    var roiTasks = $('calc-roi-tasks');
    var roiSaved = $('calc-roi-saved');
    var roiRes = $('calc-roi-result');
    var roiAct = $('calc-roi-actions');

    function updateRoiCalc() {
      if (!roiTeam || !roiRes) return;
      var team = Math.max(1, parseInt(roiTeam.value || '5', 10));
      var rate = Math.max(10, parseInt(roiRate.value || '65', 10));
      var tasks = Math.max(1, parseInt(roiTasks.value || '8', 10));
      var mins = Math.max(1, parseInt(roiSaved.value || '6', 10));
      var hoursMonth = Math.round((team * tasks * mins * 22) / 60);
      var eurMonth = hoursMonth * rate;
      var eurYear = eurMonth * 12;
      var sandos = Math.round(eurMonth / 9.5);
      roiRes.innerHTML = '<div class="ai-calc-result__big">' + eurMonth.toLocaleString('de-DE') + ' € / Monat Hebel</div>' +
        '<div style="font-size:0.84rem; margin-top:0.25rem;">' + hoursMonth + ' Stunden/Monat gespart (= ' + eurYear.toLocaleString('de-DE') + ' € Jahres-Hebel oder ~' + sandos.toLocaleString('de-DE') + ' Briot-Sandos 🥪)</div>';
      if (roiAct) {
        var prompt = 'Unser Team (' + team + ' Personen, Stundensatz ' + rate + ' €) führt täglich ca. ' + tasks + ' wiederkehrende Aufgaben durch. Entwirf mir als Jean Maurice Port (Ex-Head of AI) die 5 wichtigsten standardisierten System-Prompts und Automations-Workflows, um diese ' + hoursMonth + ' Stunden pro Monat (' + eurMonth + ' € Hebel) ab sofort einzusparen.';
        roiAct.innerHTML = buildLlmActionButtonsHtml(prompt);
        wireLlmButtonEvents(roiAct);
      }
    }
    if (roiTeam) {
      [roiTeam, roiRate, roiTasks, roiSaved].forEach(function (el) {
        if (el) el.addEventListener('input', updateRoiCalc);
      });
      updateRoiCalc();
    }

    // Calculator 2: SGE Citability
    var sgeList = $('sge-check-list');
    var sgeRes = $('calc-sge-result');
    var sgeAct = $('calc-sge-actions');
    function updateSgeCalc() {
      if (!sgeList || !sgeRes) return;
      var score = 0;
      var missing = [];
      sgeList.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
        var label = cb.parentElement ? cb.parentElement.textContent.trim() : '';
        if (cb.checked) {
          score += parseInt(cb.value || '15', 10);
        } else {
          missing.push(label);
        }
      });
      var verdict = score >= 85
        ? 'Exzellent! Deine Seite ist bereit für Platz-1-Zitate in ChatGPT, Perplexity & Google AI Overviews.'
        : (score >= 50
          ? 'Solides Fundament — schließe jetzt die offenen Punkte (' + (missing.join(', ') || 'Feinschliff') + ') für maximale Zitier-Wahrscheinlichkeit!'
          : 'Achtung: LLMs übersehen deine Seite aktuell noch. Starte sofort mit llms.txt & JSON-LD!');
      sgeRes.innerHTML = '<div class="ai-calc-result__big">' + score + ' / 100 GEO-Punkte</div>' +
        '<div style="font-size:0.84rem; margin-top:0.25rem;">' + verdict + '</div>';
      if (sgeAct) {
        var p = 'Mein aktueller SGE/GEO Citability-Score liegt bei ' + score + '/100 Punkten. Mir fehlen aktuell noch: ' + (missing.join(', ') || 'Fortgeschrittene Entity-Tabellen') + '. Erstelle mir als Senior SGE Manager (Jean Maurice Port Methode) den konkreten Umsetzungsplan inkl. Code-Snippets.';
        sgeAct.innerHTML = buildLlmActionButtonsHtml(p);
        wireLlmButtonEvents(sgeAct);
      }
    }
    if (sgeList) {
      sgeList.querySelectorAll('input').forEach(function (cb) {
        cb.addEventListener('change', updateSgeCalc);
      });
      updateSgeCalc();
    }

    // Calculator 3: Programmatic SEO
    var pseoPages = $('calc-pseo-pages');
    var pseoVisits = $('calc-pseo-visits');
    var pseoAov = $('calc-pseo-aov');
    var pseoRes = $('calc-pseo-result');
    var pseoAct = $('calc-pseo-actions');
    function updatePseoCalc() {
      if (!pseoPages || !pseoRes) return;
      var pages = Math.max(1, parseInt(pseoPages.value || '1500', 10));
      var visits = Math.max(1, parseInt(pseoVisits.value || '12', 10));
      var aov = Math.max(5, parseInt(pseoAov.value || '85', 10));
      var totalTraffic = pages * visits;
      var orders = Math.round(totalTraffic * 0.02);
      var rev = orders * aov;
      pseoRes.innerHTML = '<div class="ai-calc-result__big">+' + rev.toLocaleString('de-DE') + ' € / Monat Potenzial</div>' +
        '<div style="font-size:0.84rem; margin-top:0.25rem;">' + totalTraffic.toLocaleString('de-DE') + ' organische Long-Tail-Besucher/Monat (~' + orders.toLocaleString('de-DE') + ' Bestellungen bei 2,0 % CR).</div>';
      if (pseoAct) {
        var p = 'Ich plane ein Programmatic-SEO-System für ' + pages + ' Seiten (Warenkorbwert: ' + aov + ' €, Ziel-Traffic: ' + totalTraffic + ' Besucher/Monat). Entwirf mir nach der Moto-Knowledge-Engine-Architektur von Jean Maurice Port das Seiten-Template, die Daten-Attribute und die interne Verlinkungslogik.';
        pseoAct.innerHTML = buildLlmActionButtonsHtml(p);
        wireLlmButtonEvents(pseoAct);
      }
    }
    if (pseoPages) {
      [pseoPages, pseoVisits, pseoAov].forEach(function (el) {
        if (el) el.addEventListener('input', updatePseoCalc);
      });
      updatePseoCalc();
    }

    // Calculator 4: Directory DR Boost
    var dirCur = $('calc-dir-current');
    var dirCnt = $('calc-dir-count');
    var dirRes = $('calc-dir-result');
    function updateDirCalc() {
      if (!dirCur || !dirRes) return;
      var cur = Math.max(0, Math.min(90, parseInt(dirCur.value || '8', 10)));
      var cnt = Math.max(1, Math.min(256, parseInt(dirCnt.value || '35', 10)));
      var gain = Math.round(Math.sqrt(cnt) * 3.4);
      var targetLow = Math.min(88, cur + gain);
      var targetHigh = Math.min(92, targetLow + 5);
      var hours = (cnt * 0.32).toFixed(1).replace('.', ',');
      dirRes.innerHTML = '<div class="ai-calc-result__big">Ziel-DR: ~' + targetLow + '–' + targetHigh + ' (in 60 Tagen)</div>' +
        '<div style="font-size:0.84rem; margin-top:0.25rem;">Geschätzter manueller Zeitaufwand für ' + cnt + ' Verzeichnisse: ~' + hours + ' Std. — oder 0 Std. mit unserem <a href="https://jmp-collab.github.io/ai-directories/werben/" target="_blank" rel="noopener" style="color:#ffe14d; text-decoration:underline;">Launch-Service</a>.</div>';
    }
    if (dirCur) {
      [dirCur, dirCnt].forEach(function (el) {
        if (el) el.addEventListener('input', updateDirCalc);
      });
      updateDirCalc();
    }

    // Calculator 5: The Merchant Brain (merchants.json EPC & Smart-Routing)
    var mbCommA = $('calc-mb-comm-a');
    var mbCrA = $('calc-mb-cr-a');
    var mbCommB = $('calc-mb-comm-b');
    var mbCrB = $('calc-mb-cr-b');
    var mbRes = $('calc-mb-result');
    var mbAct = $('calc-mb-actions');
    function updateMbCalc() {
      if (!mbCommA || !mbRes) return;
      var cA = Math.max(1, parseFloat(mbCommA.value || '45'));
      var rA = Math.max(0.1, parseFloat(mbCrA.value || '1.6'));
      var cB = Math.max(1, parseFloat(mbCommB.value || '28'));
      var rB = Math.max(0.1, parseFloat(mbCrB.value || '4.8'));
      var epcA = (cA * (rA / 100));
      var epcB = (cB * (rB / 100));
      var winner = epcB >= epcA ? 'Merchant B' : 'Merchant A';
      var diff10k = Math.round(Math.abs(epcB - epcA) * 10000);
      mbRes.innerHTML = '<div class="ai-calc-result__big">' + winner + ' gewinnt (EPC ' + epcB.toFixed(2).replace('.', ',') + ' € vs. ' + epcA.toFixed(2).replace('.', ',') + ' €)</div>' +
        '<div style="font-size:0.84rem; margin-top:0.25rem;">Bei 10.000 Klicks liefert ' + winner + ' <strong>+' + diff10k.toLocaleString('de-DE') + ' € mehr Profit</strong> nach der <code>merchants.json</code> Expected-Value-Logik!</div>';
      if (mbAct) {
        var p = 'Baue mir nach Promptgott Substack Kap. 7 (The Merchant Brain von Jean Maurice Port) eine dynamische merchants.json + Smart-Routing-Engine: Merchant A hat ' + cA + ' € Payout bei ' + rA + '% CR (EPC ' + epcA.toFixed(2) + ' €), Merchant B hat ' + cB + ' € Payout bei ' + rB + '% CR (EPC ' + epcB.toFixed(2) + ' €). Zeige mir das JSON-Schema und die Routing-Logik nach User-Intent.';
        mbAct.innerHTML = buildLlmActionButtonsHtml(p);
        wireLlmButtonEvents(mbAct);
      }
    }
    if (mbCommA) {
      [mbCommA, mbCrA, mbCommB, mbCrB].forEach(function (el) {
        if (el) el.addEventListener('input', updateMbCalc);
      });
      updateMbCalc();
    }

    // Calculator 6: Die Lokalisierungs-Bombe (Geo-Matrix Multiplikator)
    var geoProd = $('calc-geo-prod');
    var geoCities = $('calc-geo-cities');
    var geoIntents = $('calc-geo-intents');
    var geoRes = $('calc-geo-result');
    var geoAct = $('calc-geo-actions');
    function updateGeoCalc() {
      if (!geoProd || !geoRes) return;
      var prod = Math.max(1, parseInt(geoProd.value || '6', 10));
      var cities = Math.max(1, parseInt(geoCities.value || '80', 10));
      var intents = Math.max(1, parseInt(geoIntents.value || '4', 10));
      var nodes = prod * cities * intents;
      var visits = nodes * 15;
      geoRes.innerHTML = '<div class="ai-calc-result__big">' + nodes.toLocaleString('de-DE') + ' lokale Revenue-Nodes</div>' +
        '<div style="font-size:0.84rem; margin-top:0.25rem;">Schon bei Ø 15 Besuchern/Node/Monat = <strong>' + visits.toLocaleString('de-DE') + ' hochkonvertierende Local-Intent-Besucher/Monat</strong>.</div>';
      if (geoAct) {
        var p = 'Entwirf mir nach Promptgott Substack Kap. 13 (Die Lokalisierungs-Bombe von Jean Maurice Port) eine geografisch fraktale pSEO-Matrix für ' + prod + ' Produkte/Services × ' + cities + ' Städte × ' + intents + ' Use-Cases (= ' + nodes + ' lokale Revenue-Nodes) inkl. Local-Data-Enrichment (Preise, Regeln, Bezirke, FAQs).';
        geoAct.innerHTML = buildLlmActionButtonsHtml(p);
        wireLlmButtonEvents(geoAct);
      }
    }
    if (geoProd) {
      [geoProd, geoCities, geoIntents].forEach(function (el) {
        if (el) el.addEventListener('input', updateGeoCalc);
      });
      updateGeoCalc();
    }

    // Calculator 7: Der FAQ-Reaktor & Question-Graph Generator
    var faqTopic = $('calc-faq-topic');
    var faqBtn = $('calc-faq-btn');
    var faqRes = $('calc-faq-result');
    var faqAct = $('calc-faq-actions');
    function updateFaqReactor() {
      if (!faqTopic || !faqRes) return;
      var t = faqTopic.value.trim() || 'E-Scooter Versicherung';
      var graphText = [
        '⚛️ QUESTION GRAPH FÜR: "' + t.toUpperCase() + '" (MACHINE NOTE #68–#73)',
        '├─ 1. KERNFRAGEN (Direct PAA): Was kostet ' + t + '? Wann ist ' + t + ' Pflicht? Welcher Anbieter ist Testsieger?',
        '├─ 2. SUBFRAGEN (Edge Intents): Welche Strafen/Risiken drohen ohne ' + t + '? Welche Ausnahmen gelten 2026?',
        '├─ 3. VERGLEICHS-INTENTS (A vs B): ' + t + ' Vergleich — Premium vs. Günstig / Anbieter A vs. Anbieter B',
        '├─ 4. LOKALE VARIANTEN (Geo-Nodes): ' + t + ' in Berlin, Hamburg, München, Saarbrücken (sofortige Verfügbarkeit)',
        '└─ 5. AI-OVERVIEW EXTRACTION: 45-Wort-Definition + strukturierte HTML-Kostentabelle + FAQPage JSON-LD.'
      ].join('\n');
      faqRes.textContent = graphText;
      if (faqAct) {
        var p = 'Starte den FAQ-Reaktor nach Promptgott Substack Kap. 14 (Jean Maurice Port) für das Thema "' + t + '": Extrahiere die 25 profitabelsten People-Also-Ask-Fragen, gruppiere sie in 5 semantische Intent-Cluster, schreibe AI-Overview-fähige 45-Wort-Antworten und generiere das passende FAQPage JSON-LD.';
        faqAct.innerHTML = buildLlmActionButtonsHtml(p);
        wireLlmButtonEvents(faqAct);
      }
    }
    if (faqTopic) {
      updateFaqReactor();
      if (faqBtn) faqBtn.addEventListener('click', function () { updateFaqReactor(); ViralAudio.sizzle(); });
      faqTopic.addEventListener('input', updateFaqReactor);
    }

    // Calculator 8: LLM Token & Content Factory Cost Calculator
    var tokPages = $('calc-token-pages');
    var tokWords = $('calc-token-words');
    var tokModel = $('calc-token-model');
    var tokRes = $('calc-token-result');
    var tokAct = $('calc-token-actions');
    function updateTokenCalc() {
      if (!tokPages || !tokRes) return;
      var pages = Math.max(10, parseInt(tokPages.value || '5000', 10));
      var words = Math.max(100, parseInt(tokWords.value || '1200', 10));
      var model = tokModel ? tokModel.value : 'gpt4o';
      var outTokens = pages * words * 1.35;
      var inTokens = pages * 900;
      var rateOut = model === 'flash' ? 0.5 : (model === 'hybrid' ? 3.2 : 12.0);
      var rateIn = model === 'flash' ? 0.15 : (model === 'hybrid' ? 0.8 : 3.0);
      var apiEur = Math.max(1, Math.round(((outTokens / 1000000) * rateOut + (inTokens / 1000000) * rateIn) * 0.92));
      var agencyEur = pages * 50;
      var perPageCents = ((apiEur / pages) * 100).toFixed(2).replace('.', ',');
      tokRes.innerHTML = '<div class="ai-calc-result__big">~' + apiEur.toLocaleString('de-DE') + ' € API-Gesamtkosten (statt ' + agencyEur.toLocaleString('de-DE') + ' € Agentur)</div>' +
        '<div style="font-size:0.84rem; margin-top:0.25rem;">Kosten pro fertiger Seite inkl. JSON-LD: <strong>' + perPageCents + ' Cent</strong> (~' + (outTokens / 1000000).toFixed(1).replace('.', ',') + ' Mio. Output-Tokens).</div>';
      if (tokAct) {
        var p = 'Entwirf mir nach Promptgott Substack Kap. 12 (Die Content Factory von Jean Maurice Port) eine Batch-API-Pipeline für ' + pages + ' Seiten à ' + words + ' Wörter (Gesamtbudget ~' + apiEur + ' €) inkl. Prompt-Caching, JSON-Schema-Validierung und Halluzinations-Bremse.';
        tokAct.innerHTML = buildLlmActionButtonsHtml(p);
        wireLlmButtonEvents(tokAct);
      }
    }
    if (tokPages) {
      [tokPages, tokWords, tokModel].forEach(function (el) {
        if (el) el.addEventListener('input', updateTokenCalc);
        if (el) el.addEventListener('change', updateTokenCalc);
      });
      updateTokenCalc();
    }

    // Calculator 9: Index Swarm & Crawl Velocity Simulator
    var idxUrls = $('calc-idx-urls');
    var idxDepth = $('calc-idx-depth');
    var idxShards = $('calc-idx-shards');
    var idxRes = $('calc-idx-result');
    var idxAct = $('calc-idx-actions');
    function updateIdxCalc() {
      if (!idxUrls || !idxRes) return;
      var urls = Math.max(50, parseInt(idxUrls.value || '10000', 10));
      var depth = Math.max(1, parseInt(idxDepth.value || '2', 10));
      var shards = Math.max(1, parseInt(idxShards.value || '10', 10));
      var depthPenalty = depth <= 2 ? 1 : (depth === 3 ? 1.5 : Math.pow(depth - 1, 1.8));
      var shardBoost = Math.min(2.5, 1 + Math.log10(shards) * 0.65);
      var days = Math.max(3, Math.round(((urls / 450) * depthPenalty) / shardBoost));
      var unindexedDays = Math.round(days * 4.8);
      idxRes.innerHTML = '<div class="ai-calc-result__big">~' + days + ' Tage bis 85 % Index-Abdeckung</div>' +
        '<div style="font-size:0.84rem; margin-top:0.25rem;">Klicktiefe ' + depth + ' &amp; ' + shards + ' Sitemap-Shards (ohne Hub-Sharding: ~' + unindexedDays + '+ Tage „Crawled – currently not indexed“).</div>';
      if (idxAct) {
        var p = 'Baue mir nach Promptgott Substack Kap. 10 (The Index Swarm von Jean Maurice Port) die Sitemap-Sharding- und HTML-Hub-Verlinkungsarchitektur für ' + urls + ' URLs bei maximaler Klicktiefe ' + depth + ', damit 85% der Seiten in unter ' + days + ' Tagen indexiert werden.';
        idxAct.innerHTML = buildLlmActionButtonsHtml(p);
        wireLlmButtonEvents(idxAct);
      }
    }
    if (idxUrls) {
      [idxUrls, idxDepth, idxShards].forEach(function (el) {
        if (el) el.addEventListener('input', updateIdxCalc);
      });
      updateIdxCalc();
    }

    // Calculator 10: Zero-Click & AI-Brand-Gravity Simulator
    var zcImpr = $('calc-zc-impr');
    var zcTables = $('calc-zc-tables');
    var zcRes = $('calc-zc-result');
    var zcAct = $('calc-zc-actions');
    function updateZcCalc() {
      if (!zcImpr || !zcRes) return;
      var impr = Math.max(500, parseInt(zcImpr.value || '120000', 10));
      var tables = Math.max(1, parseInt(zcTables.value || '25', 10));
      var sov = Math.min(68, Math.round(12 + Math.sqrt(tables) * 4.4));
      var brandClicks = Math.round(impr * (sov / 100) * 0.105);
      zcRes.innerHTML = '<div class="ai-calc-result__big">+' + brandClicks.toLocaleString('de-DE') + ' Brand- &amp; LLM-Klicks / Monat</div>' +
        '<div style="font-size:0.84rem; margin-top:0.25rem;">Geschätzter AI-Share-of-Voice durch ' + tables + ' Fakten-Tabellen: <strong>' + sov + ' %</strong> (3,2x höhere Kauf-Conversion als kalter Traffic).</div>';
      if (zcAct) {
        var p = 'Erstelle mir nach Promptgott Substack Kap. 3 & 9 (Daten-Extraktionsmaschine & Zero-Click Gravity von Jean Maurice Port) die Struktur für ' + tables + ' proprietäre HTML-Fakten-Tabellen und Benchmark-Matrizen, um bei ' + impr + ' monatlichen Impressionen ' + sov + '% AI-Share-of-Voice zu erreichen.';
        zcAct.innerHTML = buildLlmActionButtonsHtml(p);
        wireLlmButtonEvents(zcAct);
      }
    }
    if (zcImpr) {
      [zcImpr, zcTables].forEach(function (el) {
        if (el) el.addEventListener('input', updateZcCalc);
      });
      updateZcCalc();
    }

    // Calculator 11: 72h "Erster Euro" & Live SVG Dyno Curve
    var dynoNodes = $('calc-dyno-nodes');
    var dynoEpc = $('calc-dyno-epc');
    var dynoLine = $('calc-dyno-line');
    var dynoArea = $('calc-dyno-area');
    var dynoDot = $('calc-dyno-dot');
    var dynoRes = $('calc-dyno-result');
    var dynoAct = $('calc-dyno-actions');
    function updateDynoCalc() {
      if (!dynoNodes || !dynoRes) return;
      var nodes = Math.max(10, parseInt(dynoNodes.value || '400', 10));
      var epc = Math.max(0.1, parseFloat(dynoEpc.value || '1.45'));
      var day90Rev = Math.round(nodes * 14 * epc);
      var firstEuroDay = Math.max(3, Math.min(28, Math.round(18 - Math.log10(nodes) * 3.2)));
      var endY = Math.max(10, Math.min(68, Math.round(78 - Math.min(66, Math.log10(Math.max(100, day90Rev)) * 15))));
      var midY = Math.round((80 + endY) / 2 + 8);
      var dPath = 'M10,80 Q95,74 165,' + midY + ' T310,' + endY;
      if (dynoLine) dynoLine.setAttribute('d', dPath);
      if (dynoArea) dynoArea.setAttribute('d', dPath + ' L310,85 L10,85 Z');
      if (dynoDot) dynoDot.setAttribute('cy', String(endY));
      dynoRes.textContent = 'Tag-90 Run-Rate: ~' + day90Rev.toLocaleString('de-DE') + ' € / Monat (Erster Euro nach ~' + firstEuroDay + ' Tagen)';
      if (dynoAct) {
        var p = 'Erstelle mir nach dem Promptgott 72-Stunden-Blueprint von Jean Maurice Port den exakten Tag-1-bis-Tag-3-Umsetzungsplan für ' + nodes + ' Launch-Nodes (Ziel-EPC: ' + epc.toFixed(2) + ' €, Ziel-Run-Rate nach 90 Tagen: ' + day90Rev + ' €/Monat).';
        dynoAct.innerHTML = buildLlmActionButtonsHtml(p);
        wireLlmButtonEvents(dynoAct);
      }
    }
    if (dynoNodes) {
      [dynoNodes, dynoEpc].forEach(function (el) {
        if (el) el.addEventListener('input', updateDynoCalc);
      });
      updateDynoCalc();
    }

    // Calculator 12: B2B Consulting & Done-For-You ROI Calculator
    var b2bInv = $('calc-b2b-invest');
    var b2bRev = $('calc-b2b-rev');
    var b2bRes = $('calc-b2b-result');
    var b2bTransfer = $('calc-b2b-transfer-btn');
    function updateB2bCalc() {
      if (!b2bInv || !b2bRes) return;
      var inv = Math.max(100, parseInt(b2bInv.value || '2400', 10));
      var rev = Math.max(500, parseInt(b2bRev.value || '45000', 10));
      var upliftMonth = Math.round(rev * 0.16);
      var breakEvenDays = Math.max(2, Math.round((inv / Math.max(1, upliftMonth)) * 30));
      var roiYear = ((upliftMonth * 12) / inv).toFixed(1).replace('.', ',');
      b2bRes.innerHTML = '<div class="ai-calc-result__big">Break-Even in ~' + breakEvenDays + ' Tagen (ROI: ' + roiYear + 'x / Jahr)</div>' +
        '<div style="font-size:0.84rem; margin-top:0.25rem;">Schon bei konservativen +16 % SEO/AI-Uplift (+' + upliftMonth.toLocaleString('de-DE') + ' €/Monat) ist dein Investment von ' + inv.toLocaleString('de-DE') + ' € im 1. Monat mehrfach eingespielt.</div>';
    }
    if (b2bInv) {
      [b2bInv, b2bRev].forEach(function (el) {
        if (el) el.addEventListener('input', updateB2bCalc);
        if (el) el.addEventListener('change', updateB2bCalc);
      });
      updateB2bCalc();
      if (b2bTransfer) {
        b2bTransfer.addEventListener('click', function () {
          var budgetSel = $('lead-main-budget');
          if (budgetSel && b2bInv) {
            var v = b2bInv.value;
            budgetSel.selectedIndex = v === '490' ? 0 : (v === '2400' ? 1 : 2);
          }
        });
      }
    }

    // 3b. Interactive Lead-Gen & Project Configurator (#kontakt-leadgen) + Homepage Quick Calc
    var leadPills = document.querySelectorAll('#lead-cfg-pills .lead-intent-pill');
    var leadTraffic = $('lead-cfg-traffic');
    var leadAov = $('lead-cfg-aov');
    var leadTrafficVal = $('lead-cfg-traffic-val');
    var leadAovVal = $('lead-cfg-aov-val');
    var leadUplift = $('lead-cfg-uplift');
    var leadAmort = $('lead-cfg-amort');
    var leadSummary = $('lead-cfg-summary');
    var leadMeter = $('lead-cfg-meter');
    var selectedLeadTopic = 'Programmatic SEO & High-SKU Revenue Machine';
    var selectedLeadMult = 1.35;

    function updateLeadConfigurator() {
      if (!leadTraffic || !leadUplift) return;
      var tr = parseInt(leadTraffic.value || '25000', 10);
      var aov = parseInt(leadAov.value || '120', 10);
      if (leadTrafficVal) leadTrafficVal.textContent = tr.toLocaleString('de-DE');
      if (leadAovVal) leadAovVal.textContent = aov.toLocaleString('de-DE') + ' €';
      var monthlyPotential = Math.round(tr * 0.006 * aov * selectedLeadMult);
      leadUplift.textContent = '+' + monthlyPotential.toLocaleString('de-DE') + ' € / Monat';
      var weeks = monthlyPotential > 15000 ? '< 2 Wochen' : (monthlyPotential > 5000 ? '< 4 Wochen' : '~5 Wochen');
      if (leadAmort) leadAmort.textContent = 'Amortisation: ' + weeks;
      if (leadSummary) {
        leadSummary.innerHTML = 'Fokus: <strong>' + selectedLeadTopic + '</strong> — kalkuliert für ' + tr.toLocaleString('de-DE') + ' Besucher/Monat &amp; ' + aov + ' € Kundenwert.';
      }
      if (leadMeter) {
        var pct = Math.min(98, Math.max(25, Math.round(Math.log10(Math.max(100, monthlyPotential)) * 21)));
        leadMeter.style.width = pct + '%';
      }
    }

    leadPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        leadPills.forEach(function (x) { x.classList.remove('is-selected'); });
        pill.classList.add('is-selected');
        selectedLeadTopic = pill.getAttribute('data-lead-topic') || selectedLeadTopic;
        selectedLeadMult = parseFloat(pill.getAttribute('data-lead-mult') || '1.25');
        updateLeadConfigurator();
        ViralAudio.sizzle();
      });
    });

    if (leadTraffic && leadAov) {
      leadTraffic.addEventListener('input', updateLeadConfigurator);
      leadAov.addEventListener('input', updateLeadConfigurator);
      updateLeadConfigurator();
    }

    function downloadStrategyDossier(name, contact, url, topic, budget, notes, upliftText) {
      var dossier = [
        '# JEAN MAURICE PORT // PERSÖNLICHES AI × SEO STRATEGIE-DOSSIER',
        '- **Erstellt für:** ' + (name || 'Projekt-Partner'),
        '- **Kontakt:** ' + (contact || '-'),
        '- **Website / Projekt:** ' + (url || '-'),
        '- **Gewählter System-Schwerpunkt:** ' + topic,
        '- **Gewünschter Rahmen:** ' + (budget || 'Sprint / Sparring'),
        '- **Kalkuliertes Potenzial:** ' + (upliftText || '+15.000 €/Monat'),
        '- **Notiz / Engpass:** ' + (notes || 'Skalierung von organischem Traffic, SGE-Sichtbarkeit & Conversion'),
        '',
        '## EMPFOHLENE 30-60-90 TAGE OPERATOR-ROADMAP',
        '1. **Tage 1–14 (Data & Entity Foundation):** Aufbau von `/llms.txt`, vernetztem JSON-LD Schema und Extraktion der profitabelsten Such-Territorien & People-Also-Ask-Fragen.',
        '2. **Tage 15–45 (Content Factory & Programmatic Nodes):** Skalierung der Landingpage-Cluster mit strukturierten Fakten-Tabellen und internem Link-Graphen (max. Klicktiefe 2–3).',
        '3. **Tage 46–90 (Merchant Brain & Conversion Loop):** Dynamisches EPC-/Conversion-Routing, interaktive Lead-Rechner und Index-Swarm-Optimierung.',
        '',
        '## DIREKTKONTAKT ZU JEAN MAURICE PORT',
        '- **E-Mail:** hallo@saarvice.de',
        '- **Promptgott Substack:** https://promptgott.substack.com/',
        '- **KI-Verzeichnisse & Launch-Service:** https://jmp-collab.github.io/ai-directories/'
      ].join('\n');
      var blob = new Blob([dossier], { type: 'text/markdown;charset=utf-8' });
      var dlUrl = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = dlUrl;
      a.download = 'jean-maurice-port-strategie-dossier.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return dossier;
    }

    var mainLeadForm = $('main-leadgen-form');
    var mainLeadSuccess = $('main-leadgen-success');
    var mainLeadActions = $('main-leadgen-actions');
    if (mainLeadForm && mainLeadSuccess) {
      mainLeadForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = ($('lead-main-name') ? $('lead-main-name').value.trim() : '') || 'Interessent';
        var email = ($('lead-main-email') ? $('lead-main-email').value.trim() : '') || '';
        var url = ($('lead-main-url') ? $('lead-main-url').value.trim() : '') || '';
        var budget = ($('lead-main-budget') ? $('lead-main-budget').value : '') || '';
        var notes = ($('lead-main-notes') ? $('lead-main-notes').value.trim() : '') || '';
        var upliftTxt = leadUplift ? leadUplift.textContent : '+24.300 € / Monat';

        var dossierText = downloadStrategyDossier(name, email, url, selectedLeadTopic, budget, notes, upliftTxt);
        mainLeadSuccess.hidden = false;
        ViralAudio.maggi();
        showViralToast('🚀 Strategie-Dossier heruntergeladen & Anfrage bereit!');

        var mailSubj = encodeURIComponent('Projekt-Anfrage: ' + selectedLeadTopic + ' (' + name + ')');
        var mailBody = encodeURIComponent(dossierText);
        if (mainLeadActions) {
          var llmPrompt = 'Ich plane mit Jean Maurice Port folgendes Projekt: Schwerpunkt "' + selectedLeadTopic + '", Website "' + (url || 'unser Shop/SaaS') + '", Ziel-Potenzial ' + upliftTxt + '. Erstelle mir zur Vorbereitung auf unser Kickoff-Gespräch die 10 wichtigsten technischen Audit-Fragen und Quick-Wins.';
          mainLeadActions.innerHTML =
            '<a href="mailto:hallo@saarvice.de?subject=' + mailSubj + '&body=' + mailBody + '" class="llm-btn llm-btn--copy">📧 Jetzt als E-Mail an Jean absenden ↗</a>' +
            buildLlmActionButtonsHtml(llmPrompt);
          wireLlmButtonEvents(mainLeadActions);
        }
      });
    }

    // Homepage Quick Calculator (#home-quick-pages & #home-quick-aov)
    var hqPages = $('home-quick-pages');
    var hqAov = $('home-quick-aov');
    var hqRes = $('home-quick-result');
    function updateHomeQuickCalc() {
      if (!hqPages || !hqRes) return;
      var p = Math.max(10, parseInt(hqPages.value || '500', 10));
      var a = Math.max(10, parseInt(hqAov.value || '95', 10));
      var rev = Math.round(p * 12 * 0.02 * a);
      hqRes.textContent = 'Potenzial: +' + rev.toLocaleString('de-DE') + ' € / Monat zusätzlicher pSEO-Umsatz';
    }
    if (hqPages && hqAov) {
      hqPages.addEventListener('input', updateHomeQuickCalc);
      hqAov.addEventListener('input', updateHomeQuickCalc);
      updateHomeQuickCalc();
    }

    // 4. Machine Note Oracle (#01–#73 from promptgott.substack.com)
    var MACHINE_NOTES = [
      { num: '#01', ch: 'THE PROGRAMMATIC REVENUE MACHINE', q: 'Google bestraft keine Automation. Google bestraft schlechte Struktur und leeren Spam. 10 Seiten sind Arbeit — 100.000 Seiten sind Architektur.' },
      { num: '#05', ch: 'DER GREYHAT-EID', q: 'Die meisten SEO-Probleme sind Architekturprobleme. Keine Schreibprobleme. Eine Seite kann sterben — ein System verstärkt sich selbst.' },
      { num: '#08', ch: 'GOOGLE IST KEIN SUCHSYSTEM', q: 'Wer nur für Rankings optimiert, optimiert für die Vergangenheit. Die Zukunft gehört Seiten, die von Maschinen leicht verdaut und extrahiert werden können.' },
      { num: '#11', ch: 'DAS ENDE EINZELNER WEBSEITEN', q: 'Wer einzelne Keywords jagt, hat bereits verloren. Interne Links sind semantische Stromleitungen. Content ohne Netzwerk-Effekt ist digitales Wegwerfmaterial.' },
      { num: '#14', ch: 'DIE MACHINE', q: 'Wenn Wachstum stoppt, existiert kein System. Nur Arbeit. Der größte Hebel im Internet ist geschlossene Selbstverstärkung.' },
      { num: '#18', ch: 'DIE INFRASTRUKTUR', q: 'Schwache Websites optimieren Inhalte. Starke Systeme optimieren Infrastruktur. Die Website ist nur das UI der eigentlichen Maschine.' },
      { num: '#22', ch: 'THE MERCHANT BRAIN', q: 'Der beste Affiliate-Link ist nicht der mit der höchsten Provision, sondern der mit dem höchsten erwarteten Profit (EPC). Traffic ohne Monetization-Logik ist nur teure Aufmerksamkeit.' },
      { num: '#26', ch: 'PROGRAMMATIC SEO ARCHITECTURE', q: 'Templates sind komprimierte Skalierung. Daten erzeugen Skalierung — Semantik erzeugt Rankings. Das moderne Internet wird nicht geschrieben, es wird generiert.' },
      { num: '#31', ch: 'DATENSÄTZE SIND DIE NEUE WÄHRUNG', q: 'Wer die Daten kontrolliert, kontrolliert die Rankings. Entitäten sind SEO-Lego. Originaldaten sind die stärkste SEO-Waffe der Welt.' },
      { num: '#37', ch: 'THE INDEX SWARM', q: 'Indexierung ist kein Zufall, sie ist Architektur. Wenn Google etwas schwer erreicht (Klicktiefe 5+), behandelt das System es als unwichtig.' },
      { num: '#49', ch: 'DER AUTHORITY LAYER', q: 'Authority ist kein Gefühl. Authority ist ein Muster. Topical Authority ist semantische Vollständigkeit. Google vertraut Gewinnern mehr als Herausforderern.' },
      { num: '#57', ch: 'DIE CONTENT FACTORY', q: 'Content ist Rohmaterial — die eigentliche Macht liegt in der Fabrik. Vergleichsseiten (A vs B) monetarisieren komprimierte Entscheidungsmomente.' },
      { num: '#62', ch: 'DIE LOKALISIERUNGS-BOMBE', q: 'Jede Stadt ist ein eigener Markt. Lokale Suchanfragen sind fast immer Transaktionssignale. Lokale Relevanz entsteht durch echten Daten-Kontext, nicht durch Stadtnamen.' },
      { num: '#68', ch: 'DER FAQ-REAKTOR', q: 'People Also Ask ist Googles öffentliche Intent-Datenbank. AI-Overviews bevorzugen komprimierte Klarheit. Wer Fragen kontrolliert, kontrolliert Aufmerksamkeit.' }
    ];
    var mnIndex = 1;
    var mnNumEl = $('mn-number');
    var mnQuoteEl = $('mn-quote');
    var mnNextBtn = $('mn-next-btn');
    var mnActEl = $('mn-actions');
    function renderMachineNote(idx) {
      if (!mnNumEl || !mnQuoteEl) return;
      var item = MACHINE_NOTES[idx % MACHINE_NOTES.length];
      mnNumEl.textContent = '⚙️ MACHINE NOTE ' + item.num + ' // ' + item.ch;
      mnQuoteEl.textContent = '„' + item.q + '“';
      if (mnActEl) {
        var p = 'Übersetze Machine Note ' + item.num + ' aus dem Promptgott Substack von Jean Maurice Port ("' + item.q + '") in einen konkreten 5-Schritte-Umsetzungsplan für meine Website.';
        mnActEl.innerHTML = buildLlmActionButtonsHtml(p);
        wireLlmButtonEvents(mnActEl);
      }
    }
    if (mnNextBtn) {
      renderMachineNote(1);
      mnNextBtn.addEventListener('click', function () {
        mnIndex = (mnIndex + 1) % MACHINE_NOTES.length;
        renderMachineNote(mnIndex);
        ViralAudio.sizzle();
      });
    }

    // 5. Substack 14-Chapter Filter Tabs
    var pgCatBtns = document.querySelectorAll('.pg-cat-btn');
    var pgCards = document.querySelectorAll('#promptgott-chapters-grid [data-pg-chapter]');
    pgCatBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        pgCatBtns.forEach(function (x) { x.classList.remove('viral-pill-btn--gold'); });
        b.classList.add('viral-pill-btn--gold');
        var cat = b.getAttribute('data-pg-cat') || 'all';
        pgCards.forEach(function (c) {
          var cCat = c.getAttribute('data-pg-chapter') || '';
          c.style.display = (cat === 'all' || cCat.indexOf(cat) !== -1) ? '' : 'none';
        });
      });
    });

    // 6. Ecosystem Filter Tabs
    var ecoBtns = document.querySelectorAll('.eco-filter-btn');
    var ecoCards = document.querySelectorAll('#eco-hub-grid .eco-hub-card');
    ecoBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        ecoBtns.forEach(function (x) { x.classList.remove('viral-pill-btn--gold'); });
        b.classList.add('viral-pill-btn--gold');
        var f = b.getAttribute('data-eco-filter') || 'all';
        ecoCards.forEach(function (c) {
          var cats = c.getAttribute('data-eco-cat') || '';
          c.style.display = (f === 'all' || cats.indexOf(f) !== -1) ? '' : 'none';
        });
      });
    });

    // 7. Promptgott Substack Lead-Gen Form & 14-Chapter Operator Manual Download
    var pgForm = $('promptgott-form');
    var pgSuccess = $('promptgott-success');
    var pgDownload = $('pg-download-deck');
    if (pgForm && pgSuccess) {
      pgForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var emailEl = $('pg-email');
        var emailVal = emailEl ? emailEl.value.trim() : '';
        var subUrl = 'https://promptgott.substack.com/subscribe?utm_source=saarvice_jean_hub' + (emailVal ? '&email=' + encodeURIComponent(emailVal) : '');
        window.open(subUrl, '_blank', 'noopener');
        pgSuccess.hidden = false;
        unlockStamp('pass');
        ViralAudio.maggi();
      });
    }
    if (pgDownload) {
      pgDownload.addEventListener('click', function () {
        var md = [
          '# PROMPTGOTT // THE PROGRAMMATIC REVENUE MACHINE (14-KAPITEL OPERATOR MANUAL)',
          '> Offizieller Substack: https://promptgott.substack.com/ | Mastermind Hub: https://jmp-collab.github.io/saarvice/jean.html | Directories: https://jmp-collab.github.io/ai-directories/',
          '',
          '## DIE 14 ORIGINAL-KAPITEL & KERNFORMELN',
          '1. **The Programmatic Revenue Machine**: Traffic → Data → Templates → Programmatic Pages → SERP → Revenue → More Data (Self-Compounding Infrastructure).',
          '2. **Der Greyhat-Eid (Machine Note #05)**: Die meisten SEO-Probleme sind Architekturprobleme, keine Schreibprobleme. Der Operator baut Systeme statt einzelner Artikel.',
          '3. **Google ist kein Suchsystem (Machine Note #08)**: Es ist eine Daten-Extraktionsmaschine (crawl → parse → classify → compress → rank → extract).',
          '4. **Das Ende einzelner Webseiten (Machine Note #11)**: Eine einzelne Seite ist ein Asset. Ein Such-Territorium (Hub → Cluster → Vergleiche → Rechner → FAQs → Geo) ist eine Wirtschaft.',
          '5. **Die Machine (Machine Note #14)**: Wenn Wachstum stoppt, existiert kein System, sondern nur Handarbeit.',
          '6. **Die Infrastruktur (Machine Note #18–#20)**: Die Website ist nur das UI der eigentlichen Maschine (Next.js ISR, Supabase, Firecrawl, n8n, Claude Code, Antigravity).',
          '7. **The Merchant Brain (Machine Note #22)**: `merchants.json` steuert Monetarisierung dynamisch nach höchstem EPC (Expected Value = Revenue-Wahrsch. × CR × Intent) statt nach bloßer Provision %.',
          '8. **Programmatic SEO Architecture (Machine Note #26)**: Template + Datensatz + Entity Layer + Internal Links + Monetization = Revenue Infrastructure.',
          '9. **Datensätze sind die neue Währung (Machine Note #31)**: Wer die Daten kontrolliert, kontrolliert die Rankings. 1 Datensatz speist automatisch tausende Vergleichs-, Geo- und FAQ-Varianten.',
          '10. **The Index Swarm (Machine Note #36–#38)**: Maximale Query-Abdeckung bei minimaler Crawl-Reibung (Klicktiefe 1–2 = Priorität, 5+ = Gefahrzone).',
          '11. **Der Authority Layer (Machine Note #49–#56)**: Authority ist Mathematik aus Semantic, Structural, External und Behavioral Authority.',
          '12. **Die Content Factory (Machine Note #57–#61)**: Der 8-Agenten Content Swarm + hochkonvertierende A-vs-B Entscheidungs-Seiten.',
          '13. **Die Lokalisierungs-Bombe (Machine Note #62–#67)**: Geografisch fraktale Expansion (Produkt × Stadt × Use Case × Problem × Vergleich) mit echten lokalen Daten.',
          '14. **Der FAQ-Reaktor (Machine Note #68–#73)**: People Also Ask als öffentliche Intent-Datenbank und AI-Overview-Magnet.'
        ].join('\n');
        var blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'promptgott-programmatic-revenue-machine-playbook.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }
  }

  function injectJeanSubpageCalloutsAndFloatingDock() {
    var path = window.location.pathname || '';
    var isMenuSub = path.indexOf('/menu/') !== -1 || path.indexOf('\\menu\\') !== -1;
    var prefix = isMenuSub ? '../' : '';

    // 1. On all 10 menu/*.html pages: Inject Dish-Specific KI-Koch- & Food-Styling Prompt Box!
    if (isMenuSub && !document.getElementById('jean-dish-prompt-box')) {
      var h1 = document.querySelector('h1');
      var dishName = h1 ? h1.textContent.trim() : 'SAARVICE Signature Dish';
      var targetContainer = document.querySelector('.dish-detail-content') || document.querySelector('main') || document.body;
      var box = document.createElement('section');
      box.id = 'jean-dish-prompt-box';
      box.className = 'jean-callout';
      box.style.marginTop = '2.2rem';
      var dishPrompt = 'Du bist Jean Maurice Port (Mastermind hinter SAARVICE) und ein Spitzenkoch für saarländisch-französische Streetfood-Finesse. Gib mir für das Gericht "' + dishName + '" (1) das präzise Rezept zum Nachkochen für 4 Personen inkl. Buchenholz-/Röstaromen-Trick, (2) die ideale Getränke-Begleitung (Urpils, Viez oder Crémant) und (3) einen fotorealistischen Midjourney-Food-Prompt.';
      box.innerHTML = '' +
        '<div class="jean-callout__avatar-wrap">' +
        '  <img src="' + prefix + 'assets/images/jean_mascot.svg" alt="Jean Maurice Port Maskottchen" width="72" height="72">' +
        '</div>' +
        '<div>' +
        '  <span class="jean-callout__badge">🧔⚡ Jeans KI-Rezept &amp; Prompt-Labor zu diesem Gericht</span>' +
        '  <p class="jean-callout__text">' +
        '    <strong>Willst du „' + dishName + '“ zuhause nachbauen oder den Food-Prompt klauen?</strong> Klick auf deinen Lieblings-KI-Assistenten und hol dir das komplette Rezept + Midjourney-Setup:' +
        '  </p>' +
        '  <div class="llm-btn-row" style="margin-top:0.65rem;">' +
        buildLlmActionButtonsHtml(dishPrompt) +
        '    <a href="' + prefix + 'jean.html" class="llm-btn">🧔 Mehr KI-Tools von Jean →</a>' +
        '  </div>' +
        '</div>';
      targetContainer.appendChild(box);
      wireLlmButtonEvents(box);
    }

    // 1b. On root subpages (drops, getraenke, catering, presse, impressum): Inject contextual Jean Mastermind Callout
    if (!isMenuSub && path.indexOf('jean.html') === -1 && path.indexOf('index.html') === -1 && document.querySelector('main') && !document.getElementById('jean-subpage-callout')) {
      var pageTitle = document.title || 'SAARVICE';
      var subPrompt = 'Analysiere die Seite "' + pageTitle + '" nach der SAARVICE- & SGE-Methode von Jean Maurice Port und zeige mir 5 psychologische Conversion- und Viralitäts-Hebel für mein eigenes Business.';
      var subBox = document.createElement('section');
      subBox.id = 'jean-subpage-callout';
      subBox.className = 'jean-callout';
      subBox.style.maxWidth = '1140px';
      subBox.style.margin = '2.5rem auto';
      subBox.innerHTML = '' +
        '<div class="jean-callout__avatar-wrap">' +
        '  <img src="assets/images/jean_mascot.svg" alt="Jean Maurice Port Maskottchen" width="72" height="72">' +
        '</div>' +
        '<div>' +
        '  <span class="jean-callout__badge">🧔☢️ Jean Maurice Port // Mastermind-Notiz zu dieser Seite</span>' +
        '  <p class="jean-callout__text">' +
        '    <strong>„Jede Unterseite braucht einen eigenen viralen Hook &amp; klaren KI-Nutzen.“</strong> — Schicke das Konzept dieser Seite direkt an ChatGPT oder Claude, oder spring rüber in mein zentrales KI- &amp; Prompt-Hub:' +
        '  </p>' +
        '  <div class="llm-btn-row" style="margin-top:0.65rem;">' +
        buildLlmActionButtonsHtml(subPrompt) +
        '    <a href="jean.html" class="llm-btn">🧔 Zum kompletten Jean- &amp; KI-Hub →</a>' +
        '  </div>' +
        '</div>';
      var mainEl = document.querySelector('main');
      mainEl.appendChild(subBox);
      wireLlmButtonEvents(subBox);
    }

    // 2. Inject Floating "🧔 Frag Jean // KI-Hub" Companion Dock on every page
    if (!document.getElementById('jean-floating-dock')) {
      var dock = document.createElement('div');
      dock.id = 'jean-floating-dock';
      dock.className = 'jean-floating-dock';
      dock.innerHTML = '' +
        '<div id="jean-dock-panel" class="jean-dock-panel" hidden>' +
        '  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">' +
        '    <strong style="color:var(--c-gold); font-size:0.92rem;">🧔 Jean Maurice Port // Hub</strong>' +
        '    <button type="button" id="jean-dock-close" style="background:none; border:none; color:var(--c-text); cursor:pointer; font-size:1rem;">✕</button>' +
        '  </div>' +
        '  <p style="font-size:0.8rem; opacity:0.86; margin-bottom:0.75rem;">Senior SEO/SGE Manager, Ex-Head of AI &amp; Schöpfer von SAARVICE, AIGEDDON ☢️ &amp; Promptgott ⚡.</p>' +
        '  <div style="display:grid; gap:0.45rem;">' +
        '    <a href="' + prefix + 'jean.html#prompt-lab" class="llm-btn llm-btn--chatgpt" style="justify-content:flex-start;">⚡ Prompt-Tresor (ChatGPT &amp; Claude)</a>' +
        '    <a href="' + prefix + 'jean.html#ki-rechner" class="llm-btn llm-btn--claude" style="justify-content:flex-start;">🧮 7 Interaktive KI- &amp; SEO-Rechner</a>' +
        '    <a href="https://www.youtube.com/@AIGeddon?sub_confirmation=1" target="_blank" rel="noopener" class="llm-btn llm-btn--perplexity" style="justify-content:flex-start;">☢️ AIGeddon YouTube Case Studies ↗</a>' +
        '    <a href="https://jmp-collab.github.io/ai-directories/" target="_blank" rel="noopener" class="llm-btn llm-btn--copy" style="justify-content:flex-start;">🗂️ 256+ KI-Verzeichnisse &amp; Deals ↗</a>' +
        '    <a href="' + prefix + 'jean.html#promptgott" class="llm-btn llm-btn--gemini" style="justify-content:flex-start;">✉️ Promptgott Newsletter &amp; Playbook</a>' +
        '  </div>' +
        '</div>' +
        '<button type="button" id="jean-dock-trigger" class="jean-dock-trigger" aria-expanded="false" aria-controls="jean-dock-panel">' +
        '  <img src="' + prefix + 'assets/images/jean.jpg" alt="Jean Maurice Port" width="32" height="32">' +
        '  <span>🧔 Jeans KI- &amp; Prompt-Hub</span>' +
        '</button>';
      document.body.appendChild(dock);

      var trig = document.getElementById('jean-dock-trigger');
      var pan = document.getElementById('jean-dock-panel');
      var cls = document.getElementById('jean-dock-close');
      if (trig && pan) {
        trig.addEventListener('click', function () {
          var isHidden = pan.hidden;
          pan.hidden = !isHidden;
          trig.setAttribute('aria-expanded', String(isHidden));
        });
      }
      if (cls && pan && trig) {
        cls.addEventListener('click', function () {
          pan.hidden = true;
          trig.setAttribute('aria-expanded', 'false');
        });
      }
    }
  }

  function initStickySidebarsAndScrollSpy() {
    var path = window.location.pathname || '';
    var isMenuSub = path.indexOf('/menu/') !== -1 || path.indexOf('\\menu\\') !== -1;
    var prefix = isMenuSub ? '../' : '';

    // Inject Left & Right Sticky Sidebars on pages that don't have them hardcoded (e.g., index.html & subpages)
    if (!document.getElementById('sticky-sidebar-left')) {
      document.body.classList.add('has-dual-sidebars');
      var leftBtn = document.createElement('button');
      leftBtn.type = 'button';
      leftBtn.className = 'sticky-rail-toggle sticky-rail-toggle--left';
      leftBtn.id = 'toggle-left-rail-btn';
      leftBtn.setAttribute('aria-label', 'Linke Command-Sidebar ein-/ausblenden');
      leftBtn.textContent = '🧭 NAV & TELEMETRIE';

      var leftAside = document.createElement('aside');
      leftAside.className = 'sticky-sidebar-left';
      leftAside.id = 'sticky-sidebar-left';
      leftAside.setAttribute('aria-label', 'Schnellnavigation & Live-Telemetrie');
      leftAside.innerHTML = '' +
        '<div style="display:flex; justify-content:space-between; align-items:center; gap:0.4rem; margin-bottom:0.35rem;">' +
        '  <span style="font-family:var(--f-mono); font-size:0.7rem; font-weight:800; color:#38bdf8; letter-spacing:0.08em;">🧭 COMMAND RAIL</span>' +
        '  <span id="rail-scroll-pct" style="font-family:var(--f-mono); font-size:0.72rem; color:#ffe14d; font-weight:800;">0%</span>' +
        '</div>' +
        '<div class="rail-progress-wrap" aria-hidden="true"><div class="rail-progress-bar" id="rail-progress-bar"></div></div>' +
        '<ul class="rail-nav-list" id="rail-nav-list">' +
        '  <li><a href="' + prefix + 'index.html#menu" class="rail-nav-link">🥪 Die Speisen &amp; V2 Karte</a></li>' +
        '  <li><a href="' + prefix + 'index.html#kultur-labor" class="rail-nav-link">📐 Saarland-Flächenmaß-Labor</a></li>' +
        '  <li><a href="' + prefix + 'index.html#viral-arena" class="rail-nav-link">🪪 Schwenker-Führerschein</a></li>' +
        '  <li><a href="' + prefix + 'index.html#jean-mastermind" class="rail-nav-link"><span class="live-dot-green"></span> 🧔 Jean Mastermind &amp; Prompts</a></li>' +
        '  <li><a href="' + prefix + 'jean.html#kontakt-leadgen" class="rail-nav-link">🤝 Projekt- &amp; ROI-Konfigurator</a></li>' +
        '  <li><a href="' + prefix + 'jean.html#ki-rechner" class="rail-nav-link">🧮 Alle 12 KI- &amp; SEO-Rechner</a></li>' +
        '  <li><a href="' + prefix + 'jean.html#promptgott" class="rail-nav-link">📬 Promptgott Substack (14 Kap.)</a></li>' +
        '  <li><a href="' + prefix + 'catering.html" class="rail-nav-link">🔥 Event-Catering buchen</a></li>' +
        '</ul>' +
        '<div style="display:grid; grid-template-columns:1fr 1fr; gap:0.4rem; margin:0.65rem 0;">' +
        '  <div style="background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.35); border-radius:6px; padding:0.4rem; text-align:center;">' +
        '    <strong style="display:block; font-size:0.95rem; color:#7dd3fc;">12</strong><span style="font-size:0.65rem; opacity:0.8;">KI-Rechner</span>' +
        '  </div>' +
        '  <div style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.35); border-radius:6px; padding:0.4rem; text-align:center;">' +
        '    <strong style="display:block; font-size:0.95rem; color:#6ee7b7;">14</strong><span style="font-size:0.65rem; opacity:0.8;">Substack Kap.</span>' +
        '  </div>' +
        '</div>' +
        '<a href="' + prefix + 'jean.html#kontakt-leadgen" class="llm-btn llm-btn--copy" style="width:100%; font-size:0.73rem; padding:0.42rem;">⚡ 60-Sek. Potenzial-Check →</a>';
      document.body.appendChild(leftBtn);
      document.body.appendChild(leftAside);
    }

    if (!document.getElementById('sticky-sidebar-right')) {
      var rightBtn = document.createElement('button');
      rightBtn.type = 'button';
      rightBtn.className = 'sticky-rail-toggle sticky-rail-toggle--right';
      rightBtn.id = 'toggle-right-rail-btn';
      rightBtn.setAttribute('aria-label', 'Rechte Kontakt-Sidebar ein-/ausblenden');
      rightBtn.textContent = '📬 DIREKT-KONTAKT';

      var rightAside = document.createElement('aside');
      rightAside.className = 'sticky-sidebar-right';
      rightAside.id = 'sticky-sidebar-right';
      rightAside.setAttribute('aria-label', 'Direkt-Kontakt & Projekt-Anfrage an Jean Maurice Port');
      rightAside.innerHTML = '' +
        '<div style="display:flex; align-items:center; gap:0.55rem; margin-bottom:0.55rem;">' +
        '  <img src="' + prefix + 'assets/images/jean.jpg" alt="Jean Maurice Port" width="42" height="42" style="width:42px; height:42px; border-radius:50%; object-fit:cover; border:2px solid #10b981;">' +
        '  <div>' +
        '    <div style="display:flex; align-items:center; gap:0.35rem; font-size:0.68rem; font-weight:800; color:#6ee7b7; text-transform:uppercase;"><span class="live-dot-green"></span> 2 Slots frei</div>' +
        '    <strong style="font-size:0.84rem; color:#ffe14d; display:block;">Jean Maurice Port</strong>' +
        '    <span style="font-size:0.68rem; opacity:0.78;">AI × SEO &amp; SAARVICE</span>' +
        '  </div>' +
        '</div>' +
        '<form id="sticky-lead-form" novalidate style="border-top:1px solid rgba(255,255,255,0.12); padding-top:0.55rem;">' +
        '  <label for="sticky-lead-intent" style="display:block; font-size:0.68rem; font-weight:800; color:#ffe14d; text-transform:uppercase; margin-bottom:0.25rem;">Worum geht\'s?</label>' +
        '  <select id="sticky-lead-intent" class="rail-mini-input">' +
        '    <option value="pSEO &amp; Programmatic Revenue Machine">🚀 pSEO Revenue Machine</option>' +
        '    <option value="SGE / AI-Overviews &amp; GEO Audit">🔎 SGE / AI-Overviews Audit</option>' +
        '    <option value="Inhouse Prompt-Engineering &amp; AI-Agents">⚡ Team Prompt- &amp; Agent-Setup</option>' +
        '    <option value="90-Minuten 1:1 Strategie-Sparring">🧔 90-Min. 1:1 Sparring (490 €)</option>' +
        '    <option value="SAARVICE Event / Brand-Kooperation">🍖 SAARVICE Event / Catering</option>' +
        '  </select>' +
        '  <input type="text" id="sticky-lead-name" class="rail-mini-input" placeholder="Dein Name / Firma *" required>' +
        '  <input type="text" id="sticky-lead-contact" class="rail-mini-input" placeholder="E-Mail oder Telefon *" required>' +
        '  <input type="text" id="sticky-lead-url" class="rail-mini-input" placeholder="Website-URL / Kurz-Info">' +
        '  <button type="submit" class="btn btn-primary" style="width:100%; padding:0.55rem 0.7rem; font-size:0.78rem; margin-top:0.15rem;">⚡ Direkt an Jean senden + Dossier</button>' +
        '</form>' +
        '<div id="sticky-lead-feedback" hidden style="margin-top:0.45rem; padding:0.5rem; border-radius:6px; background:rgba(16,185,129,0.18); border:1px solid #10b981; font-size:0.72rem; color:#6ee7b7;">' +
        '  ✅ Briefing &amp; Dossier erstellt!' +
        '</div>' +
        '<div style="margin-top:0.55rem; padding-top:0.5rem; border-top:1px solid rgba(255,255,255,0.1); display:grid; grid-template-columns:1fr 1fr; gap:0.35rem;">' +
        '  <a href="https://promptgott.substack.com/" target="_blank" rel="noopener" class="llm-btn llm-btn--chatgpt" style="font-size:0.68rem; padding:0.35rem;">📬 Substack ↗</a>' +
        '  <a href="' + prefix + 'jean.html#ki-rechner" class="llm-btn llm-btn--copy" style="font-size:0.68rem; padding:0.35rem;">🧮 12 Rechner</a>' +
        '</div>';
      document.body.appendChild(rightBtn);
      document.body.appendChild(rightAside);
    }

    var leftRail = document.getElementById('sticky-sidebar-left');
    var rightRail = document.getElementById('sticky-sidebar-right');
    var toggleLeft = document.getElementById('toggle-left-rail-btn');
    var toggleRight = document.getElementById('toggle-right-rail-btn');

    // Auto-collapse on screens narrower than 1360px so content is never covered unless user clicks the rail tab
    if (window.innerWidth < 1360) {
      if (leftRail) leftRail.classList.add('is-collapsed');
      if (rightRail) rightRail.classList.add('is-collapsed');
    }

    if (toggleLeft && leftRail) {
      toggleLeft.addEventListener('click', function () {
        leftRail.classList.toggle('is-collapsed');
      });
    }
    if (toggleRight && rightRail) {
      toggleRight.addEventListener('click', function () {
        rightRail.classList.toggle('is-collapsed');
      });
    }

    // Wire random Machine Note button in left rail
    var railMnBtn = document.getElementById('rail-random-mn-btn');
    if (railMnBtn) {
      railMnBtn.addEventListener('click', function () {
        var mnBtn = document.getElementById('mn-next-btn');
        if (mnBtn) {
          mnBtn.click();
          var pgSec = document.getElementById('promptgott');
          if (pgSec) pgSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Wire Sticky Right Sidebar Lead Form (#sticky-lead-form)
    var stickyForm = document.getElementById('sticky-lead-form');
    var stickyFeedback = document.getElementById('sticky-lead-feedback');
    if (stickyForm) {
      stickyForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var intent = (document.getElementById('sticky-lead-intent') || {}).value || 'AI & SEO Projekt';
        var name = (document.getElementById('sticky-lead-name') || {}).value || 'Interessent';
        var contact = (document.getElementById('sticky-lead-contact') || {}).value || '';
        var url = (document.getElementById('sticky-lead-url') || {}).value || '';
        var bodyTxt = [
          'Hallo Jean,',
          '',
          'ich möchte ein Projekt / Sparring anfragen:',
          '- Thema: ' + intent,
          '- Name / Firma: ' + name,
          '- Kontakt: ' + contact,
          '- Website / Info: ' + url
        ].join('\n');
        if (stickyFeedback) stickyFeedback.hidden = false;
        ViralAudio.maggi();
        showViralToast('📬 Anfrage vorbereitet — E-Mail-Programm öffnet sich!');
        window.location.href = 'mailto:hallo@saarvice.de?subject=' + encodeURIComponent('Schnell-Anfrage: ' + intent + ' (' + name + ')') + '&body=' + encodeURIComponent(bodyTxt);
      });
    }

    // Live Scroll Progress & Section Spy in Left Sticky Sidebar
    var progBar = document.getElementById('rail-progress-bar');
    var progPct = document.getElementById('rail-scroll-pct');
    var navLinks = document.querySelectorAll('#rail-nav-list .rail-nav-link');
    function onScrollSpy() {
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docH > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY / docH) * 100))) : 0;
      if (progBar) progBar.style.width = pct + '%';
      if (progPct) progPct.textContent = pct + '%';

      var curId = '';
      document.querySelectorAll('main section[id]').forEach(function (sec) {
        var rect = sec.getBoundingClientRect();
        if (rect.top <= 240 && rect.bottom >= 160) {
          curId = sec.id;
        }
      });
      if (curId) {
        navLinks.forEach(function (lnk) {
          var href = lnk.getAttribute('href') || '';
          if (href.indexOf('#' + curId) !== -1) {
            lnk.classList.add('is-active');
          } else {
            lnk.classList.remove('is-active');
          }
        });
      }
    }
    window.addEventListener('scroll', onScrollSpy, { passive: true });
    onScrollSpy();
  }

  /* ------------------------------------------------------------------ *
   * 13. PWA SERVICE WORKER REGISTRATION (#092 / #194)
   * ------------------------------------------------------------------ */
  function initServiceWorker() {
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderStamps();
    initHeaderControls();
    initReadabilitySwitcher();
    initSensoryAndMenuExtras();
    initKulturLabor();
    initLandkreisBattle();
    initCanvasGenerators();
    initPassAndLexikonExtras();
    initSubpageTools();
    initJeanMastermindLab();
    injectJeanSubpageCalloutsAndFloatingDock();
    initStickySidebarsAndScrollSpy();
    initViralCockpitModal();
    initServiceWorker();
  });
})();
