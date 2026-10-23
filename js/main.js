/**
 * SAARVICE — Frontend-Logik.
 *
 * Grundhaltung: Ohne JavaScript bleibt die Seite lesbar. Was hier passiert, ist
 * Zugabe, nicht Voraussetzung. Nichts wird vorgetäuscht, was es nicht gibt.
 */
(function () {
  'use strict';

  var CFG = window.SAARVICE_CONFIG || {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(id) { return document.getElementById(id); }
  function show(el) { if (el) el.hidden = false; }
  function hide(el) { if (el) el.hidden = true; }

  /* ------------------------------------------------------------------ *
   * Mobile-Navigation
   * ------------------------------------------------------------------ */
  function initNav() {
    var toggle = $('nav-toggle');
    var nav = $('primary-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Nach der Auswahl schließen — sonst verdeckt das Menü das Sprungziel.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------ *
   * FAQ-Akkordeon
   * ------------------------------------------------------------------ */
  function initFaq() {
    var items = document.querySelectorAll('.faq-item');

    items.forEach(function (item) {
      var button = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');
      if (!button || !answer) return;

      button.addEventListener('click', function () {
        var willOpen = !item.classList.contains('active');

        items.forEach(function (other) {
          other.classList.remove('active');
          var a = other.querySelector('.faq-answer');
          var b = other.querySelector('.faq-question');
          if (a) a.style.maxHeight = null;
          if (b) b.setAttribute('aria-expanded', 'false');
        });

        if (willOpen) {
          item.classList.add('active');
          button.setAttribute('aria-expanded', 'true');
          var inner = answer.querySelector('.faq-answer-inner');
          answer.style.maxHeight = (inner ? inner.scrollHeight : 600) + 'px';
        }
      });
    });

    // Beim Umbrechen stimmt die gemerkte Höhe nicht mehr.
    var t;
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        var open = document.querySelector('.faq-item.active .faq-answer');
        if (open) {
          var inner = open.querySelector('.faq-answer-inner');
          open.style.maxHeight = (inner ? inner.scrollHeight : 600) + 'px';
        }
      }, 150);
    });
  }

  /* ------------------------------------------------------------------ *
   * Videos
   *
   * Der alte Code beobachtete video[autoplay] — die Momente-Videos hatten das
   * Attribut nie, also liefen sie nie. Jetzt hängt alles an data-src: die Datei
   * wird erst geladen, wenn die Karte in den Viewport kommt. Fehlt sie auf dem
   * Server, bleibt still das Poster stehen.
   * ------------------------------------------------------------------ */
  function initVideos() {
    if (reduceMotion) return;               // Wunsch des Nutzers schlägt Deko.
    if (!('IntersectionObserver' in window)) return;

    var conn = navigator.connection;
    if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) return;

    var videos = document.querySelectorAll('video[data-src]');
    if (!videos.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;

        if (!entry.isIntersecting) {
          if (!video.paused) video.pause();
          return;
        }

        if (!video.dataset.loaded) {
          video.dataset.loaded = '1';
          var source = document.createElement('source');
          source.src = video.dataset.src;
          source.type = 'video/mp4';
          video.appendChild(source);
          // Datei fehlt oder ist kaputt: Poster behalten, nichts weiter tun.
          video.addEventListener('error', function () {
            video.remove();
          }, { once: true });
          video.addEventListener('loadeddata', function () {
            video.classList.add('is-ready');
          }, { once: true });
          video.load();
        }

        var p = video.play();
        if (p && p.catch) p.catch(function () { /* Autoplay blockiert — Poster bleibt. */ });
      });
    }, { threshold: 0.2 });

    videos.forEach(function (v) { observer.observe(v); });
  }

  /* ------------------------------------------------------------------ *
   * Mitgliederzähler — nur mit echter Zahl
   * ------------------------------------------------------------------ */
  function initCounter() {
    var box = $('counter-box');
    var number = $('counter-number');
    if (!box || !number || !CFG.counterEndpoint) return;

    fetch(CFG.counterEndpoint, { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (data) {
        var count = Number(data && data.count);
        if (!isFinite(count) || count < 0) return;
        number.textContent = count.toLocaleString('de-DE');
        show(box);
      })
      .catch(function () { /* Keine Zahl, kein Zähler. */ });
  }

  /* ------------------------------------------------------------------ *
   * Anmeldeformular
   * ------------------------------------------------------------------ */
  function initForm() {
    var form = $('waitlist-form');
    if (!form) return;

    var successBox = $('waitlist-success');
    var numberBadge = $('success-number-badge');
    var numberText = $('member-number-text');
    var formError = $('form-error');
    var submitBtn = $('submit-waitlist-btn');
    var whatsapp = $('whatsapp-optin');
    var phoneGroup = $('phone-group');
    var phone = $('phone');

    if (whatsapp && phoneGroup && phone) {
      whatsapp.addEventListener('change', function () {
        phoneGroup.hidden = !whatsapp.checked;
        phone.required = whatsapp.checked;
        if (!whatsapp.checked) setFieldError('phone', null);
      });
    }

    function setFieldError(field, message) {
      var input = $(field);
      var box = $(field + '-error');
      if (!box) return;
      if (message) {
        box.textContent = message;
        box.hidden = false;
        if (input) input.setAttribute('aria-invalid', 'true');
      } else {
        box.hidden = true;
        if (input) input.removeAttribute('aria-invalid');
      }
    }

    function validate() {
      var ok = true;
      var email = $('email');
      var privacy = $('privacy-optin');

      // Bewusst nachsichtig: strenge E-Mail-Regexe sperren mehr gültige
      // Adressen aus, als sie ungültige fangen. Der Bestätigungslink klärt den Rest.
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        setFieldError('email', 'Da fehlt noch eine gültige Adresse, ne?');
        ok = false;
      } else {
        setFieldError('email', null);
      }

      if (privacy && !privacy.checked) {
        setFieldError('privacy', 'Ohne das Häkchen dürfen wir dir nichts schicken.');
        ok = false;
      } else {
        setFieldError('privacy', null);
      }

      if (whatsapp && whatsapp.checked && phone && phone.value.trim().length < 6) {
        setFieldError('phone', 'Für WhatsApp brauchen wir die Nummer.');
        ok = false;
      } else {
        setFieldError('phone', null);
      }

      return ok;
    }

    function fail(message) {
      if (!formError) return;
      formError.textContent = message;
      formError.hidden = false;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hide(formError);

      // Honeypot gefüllt = Bot. Erfolg vortäuschen, nichts senden.
      if ($('website') && $('website').value) {
        form.hidden = true;
        show(successBox);
        return;
      }

      if (!validate()) {
        var firstError = form.querySelector('[aria-invalid="true"]');
        if (firstError) firstError.focus();
        return;
      }

      if (!CFG.signupEndpoint) {
        // Lokaler Vorab-/Demo-Pass-Modus (#073): Vergibt sofort deinen personalisierten
        // Stammtisch-Pass (#SV-2026-XXXX) im Browser und schaltet den 3D-Pass frei!
        var customNameEl = $('member-custom-name');
        var customName = (customNameEl && customNameEl.value.trim()) ? customNameEl.value.trim() : 'Ehren-Saarlänner';
        var demoCode = 'SV-' + (1000 + Math.floor(Math.random() * 8999));
        try {
          localStorage.setItem('saarvice_member_code', demoCode);
          localStorage.setItem('saarvice_member_name', customName);
        } catch (err) {}

        form.hidden = true;
        show(successBox);
        if (numberBadge && numberText) {
          numberBadge.textContent = '#' + demoCode;
          show(numberBadge);
          show(numberText);
        }
        var walletNum = $('wallet-member-num');
        var walletHolder = $('wallet-member-holder');
        var refInput = $('referral-link-input');
        if (walletNum) walletNum.textContent = '#' + demoCode;
        if (walletHolder) walletHolder.textContent = 'Inhaber: ' + customName;
        if (refInput) refInput.value = 'https://saarvice.de/?ref=' + demoCode;
        SoundEngine.playGrubenHorn();
        if (successBox && !reduceMotion) {
          successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      var payload = {
        email: $('email').value.trim(),
        whatsapp_optin: whatsapp ? whatsapp.checked : false,
        phone: whatsapp && whatsapp.checked && phone ? phone.value.trim() : '',
        privacy_optin: true,
        submitted_at: new Date().toISOString()
      };

      submitBtn.disabled = true;
      submitBtn.textContent = 'Moment…';

      fetch(CFG.signupEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (r) {
          if (!r.ok) return Promise.reject(new Error('HTTP ' + r.status));
          return r.json().catch(function () { return {}; });
        })
        .then(function (data) {
          form.hidden = true;
          show(successBox);

          var num = Number(data && data.memberNumber);
          if (isFinite(num) && num > 0 && numberBadge && numberText) {
            numberBadge.textContent = '#' + num;
            show(numberBadge);
            show(numberText);
          }
          if (successBox && !reduceMotion) {
            successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        })
        .catch(function (err) {
          fail('Das hat grad nicht geklappt. Probier es nochmal, ne?');
          console.error('SAARVICE: Anmeldung fehlgeschlagen', err);
        })
        .then(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'In die Gemeinde eintreten';
        });
    });
  }

  /* ------------------------------------------------------------------ *
   * Consent + Analytics
   *
   * Analytics wird erst nach Zustimmung geladen. Ohne Zustimmung passiert
   * nichts — kein Skript, kein Cookie, kein Request.
   * ------------------------------------------------------------------ */
  var CONSENT_KEY = 'saarvice_consent';

  function loadAnalytics() {
    var a = CFG.analytics || {};
    if (!a.provider) return;
    var o = a.options || {};
    var s = document.createElement('script');

    if (a.provider === 'plausible') {
      if (!o.src || !o.domain) return;
      s.defer = true;
      s.setAttribute('data-domain', o.domain);
      s.src = o.src;
    } else if (a.provider === 'matomo') {
      if (!o.url || !o.siteId) return;
      window._paq = window._paq || [];
      window._paq.push(['trackPageView'], ['enableLinkTracking'],
        ['setTrackerUrl', o.url + 'matomo.php'], ['setSiteId', o.siteId]);
      s.async = true;
      s.src = o.url + 'matomo.js';
    } else {
      return;
    }
    document.head.appendChild(s);
  }

  function initConsent() {
    var banner = $('consent-banner');
    var stored = null;
    try { stored = localStorage.getItem(CONSENT_KEY); } catch (e) { /* Privatmodus */ }

    if (stored === 'granted') { loadAnalytics(); return; }
    if (stored === 'denied') return;

    // Kein Analytics konfiguriert = nichts einzuwilligen = kein Banner.
    if (!banner || !(CFG.analytics && CFG.analytics.provider)) return;

    show(banner);

    function decide(value) {
      try { localStorage.setItem(CONSENT_KEY, value); } catch (e) { /* egal */ }
      hide(banner);
      if (value === 'granted') loadAnalytics();
    }

    $('consent-accept').addEventListener('click', function () { decide('granted'); });
    $('consent-decline').addEventListener('click', function () { decide('denied'); });
  }

  /* ------------------------------------------------------------------ *
   * V2: Werkstatt Catering-Kalkulator
   * ------------------------------------------------------------------ */
  function initCateringCalc() {
    var guestsInput = $('calc-guests');
    var guestsVal = $('calc-guests-val');
    var priceDisplay = $('calc-total-price');
    var durationDisplay = $('calc-duration');
    var crewDisplay = $('calc-crew');
    var inquiryBtn = $('calc-inquiry-btn');
    if (!guestsInput || !priceDisplay) return;

    var packages = {
      schwenk: { name: 'Schwenk-Schicht', ppp: 28, min: 2450, crew: '3 Personen', hours: '2,5 Std.' },
      deluxe: { name: 'Kohlengrube Deluxe', ppp: 48, min: 4800, crew: '4 Personen', hours: '3,5 Std.' },
      festival: { name: 'Hütten-Festival', ppp: 65, min: 7500, crew: '6 Personen', hours: '5 Std.' }
    };

    function recalculate() {
      var guests = parseInt(guestsInput.value, 10) || 80;
      if (guestsVal) guestsVal.textContent = String(guests);

      var pkgRadio = document.querySelector('input[name="calc-package"]:checked');
      var pkgKey = pkgRadio ? pkgRadio.value : 'schwenk';
      var pkg = packages[pkgKey] || packages.schwenk;

      var drinksAddon = $('calc-drinks') && $('calc-drinks').checked;
      var merchAddon = $('calc-merch') && $('calc-merch').checked;
      var lyonerAddon = $('calc-lyoner') && $('calc-lyoner').checked;
      var viezAddon = $('calc-viezfass') && $('calc-viezfass').checked;

      var ppp = pkg.ppp;
      if (drinksAddon) ppp += 12;
      if (merchAddon) ppp += 4;
      if (lyonerAddon) ppp += 6;
      if (viezAddon) ppp += 3;

      var calculatedTotal = guests * ppp;
      var finalTotal = Math.max(pkg.min, calculatedTotal);
      var perPerson = (finalTotal / guests).toFixed(2).replace('.', ',');

      priceDisplay.textContent = finalTotal.toLocaleString('de-DE') + ' €';
      if ($('calc-per-person-price')) $('calc-per-person-price').textContent = perPerson + ' € pro Kopf';
      if (durationDisplay) durationDisplay.textContent = 'ca. ' + pkg.hours;
      if (crewDisplay) crewDisplay.textContent = pkg.crew;

      var summaryText =
        'Gude!\n\n' +
        'Wir planen ein Event und haben folgende Konfiguration über den SAARVICE Werkstatt-Kalkulator ermittelt:\n' +
        '• Gästeanzahl: ' + guests + ' Personen\n' +
        '• Gewähltes Paket: ' + pkg.name + '\n' +
        '• Getränke-Flat: ' + (drinksAddon ? 'Ja (+12 €/P.)' : 'Nein') + '\n' +
        '• Saar-Dust Give-aways: ' + (merchAddon ? 'Ja (+4 €/P.)' : 'Nein') + '\n' +
        '• Mitternachts-Special Lyoner Smash: ' + (lyonerAddon ? 'Ja (+6 €/P.)' : 'Nein') + '\n' +
        '• Holzfass-Viez-Anstich: ' + (viezAddon ? 'Ja (+3 €/P.)' : 'Nein') + '\n' +
        '• Geschätztes Investitionsvolumen: ca. ' + finalTotal.toLocaleString('de-DE') + ' € netto (' + perPerson + ' € / Kopf)\n';

      window.__saarviceCateringSummary = summaryText;

      if (inquiryBtn) {
        var subject = encodeURIComponent('Saarvice Werkstatt Catering-Anfrage (' + guests + ' Gäste)');
        var body = encodeURIComponent(
          summaryText + '\n' +
          'Geplantes Datum: \n' +
          'Veranstaltungsort / PLZ: \n' +
          'Ansprechpartner & Telefon: \n\n' +
          'Bitte meldet euch bei uns für die Abstimmung!'
        );
        inquiryBtn.href = 'mailto:booking@saarvice.de?subject=' + subject + '&body=' + body;
      }
    }

    guestsInput.addEventListener('input', recalculate);
    document.querySelectorAll('input[name="calc-package"]').forEach(function (r) {
      r.addEventListener('change', recalculate);
    });
    if ($('calc-drinks')) $('calc-drinks').addEventListener('change', recalculate);
    if ($('calc-merch')) $('calc-merch').addEventListener('change', recalculate);
    if ($('calc-lyoner')) $('calc-lyoner').addEventListener('change', recalculate);
    if ($('calc-viezfass')) $('calc-viezfass').addEventListener('change', recalculate);

    recalculate();
  }

  /* ------------------------------------------------------------------ *
   * V2: Interaktiver Menü-Filter
   * ------------------------------------------------------------------ */
  function initMenuFilter() {
    var filterBtns = document.querySelectorAll('.menu-filter-btn');
    if (!filterBtns.length) return;

    var dishCards = document.querySelectorAll('.dish-card');
    var sideCards = document.querySelectorAll('.side-card');
    var secretCard = $('secret-special-card');

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetCategory = btn.getAttribute('data-filter');

        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        if (secretCard) {
          secretCard.style.display = (targetCategory === 'all' || targetCategory === 'secret') ? '' : 'none';
        }

        // Filter Dish Cards
        dishCards.forEach(function (card) {
          if (targetCategory === 'all' || targetCategory === 'ikonen') {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });

        // Filter Side Cards
        sideCards.forEach(function (card) {
          var isVegan = card.querySelector('.badge-plantbased');
          var isDessert = card.textContent.indexOf('Churros') !== -1;

          if (targetCategory === 'all') {
            card.style.display = '';
          } else if (targetCategory === 'sides' && !isDessert && !isVegan) {
            card.style.display = '';
          } else if (targetCategory === 'dessert' && isDessert) {
            card.style.display = '';
          } else if (targetCategory === 'vegan' && isVegan) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * V2: Web Audio Sound Engine (Zero external dependencies)
   * ------------------------------------------------------------------ */
  var SoundEngine = (function () {
    var ctx = null;
    var ambientNode = null;

    function getContext() {
      if (!ctx && (window.AudioContext || window.webkitAudioContext)) {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
      return ctx;
    }

    function playSizzle() {
      var c = getContext();
      if (!c) return;
      var bufferSize = c.sampleRate * 0.45;
      var buffer = c.createBuffer(1, bufferSize, c.sampleRate);
      var data = buffer.getChannelData(0);
      for (var i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * 0.18));
      }
      var noise = c.createBufferSource();
      noise.buffer = buffer;
      var filter = c.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 3400;
      filter.Q.value = 1.4;
      var gain = c.createGain();
      gain.gain.setValueAtTime(0.4, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.42);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(c.destination);
      noise.start();
    }

    function playMaggiPlop() {
      var c = getContext();
      if (!c) return;
      var osc = c.createOscillator();
      var gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, c.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, c.currentTime + 0.14);
      gain.gain.setValueAtTime(0.35, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start();
      osc.stop(c.currentTime + 0.15);
    }

    function playGrubenHorn() {
      var c = getContext();
      if (!c) return;
      var osc1 = c.createOscillator();
      var osc2 = c.createOscillator();
      var gain = c.createGain();
      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(110, c.currentTime);
      osc2.frequency.setValueAtTime(165, c.currentTime);
      var filter = c.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(550, c.currentTime);
      filter.frequency.linearRampToValueAtTime(320, c.currentTime + 0.9);
      gain.gain.setValueAtTime(0.28, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.9);
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(c.destination);
      osc1.start();
      osc2.start();
      osc1.stop(c.currentTime + 0.9);
      osc2.stop(c.currentTime + 0.9);
    }

    function toggleAmbience(btn) {
      var c = getContext();
      if (!c) return;
      if (ambientNode) {
        try { ambientNode.stop(); } catch (e) {}
        ambientNode.disconnect();
        ambientNode = null;
        if (btn) {
          btn.classList.remove('is-active');
          var lbl = btn.querySelector('.sound-label');
          if (lbl) lbl.textContent = 'Buchenfeuer: AUS';
        }
      } else {
        var bufferSize = c.sampleRate * 2;
        var buffer = c.createBuffer(1, bufferSize, c.sampleRate);
        var data = buffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.05;
        }
        ambientNode = c.createBufferSource();
        ambientNode.buffer = buffer;
        ambientNode.loop = true;
        var filter = c.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1400;
        var gain = c.createGain();
        gain.gain.value = 0.12;
        ambientNode.connect(filter);
        filter.connect(gain);
        gain.connect(c.destination);
        ambientNode.start();
        if (btn) {
          btn.classList.add('is-active');
          var lblActive = btn.querySelector('.sound-label');
          if (lblActive) lblActive.textContent = 'Buchenfeuer: AN (Knistern)';
        }
      }
    }

    return {
      playSizzle: playSizzle,
      playMaggiPlop: playMaggiPlop,
      playGrubenHorn: playGrubenHorn,
      toggleAmbience: toggleAmbience
    };
  })();

  /* ------------------------------------------------------------------ *
   * V2: Ambient Ember Canvas Particles
   * ------------------------------------------------------------------ */
  function initEmberCanvas() {
    var canvas = $('ember-canvas');
    if (!canvas || reduceMotion) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var width, height;
    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    var particles = [];
    var count = 35;
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.2 + 0.8,
        vy: -(Math.random() * 0.9 + 0.3),
        vx: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        decay: Math.random() * 0.008 + 0.003,
        color: Math.random() > 0.4 ? '227, 178, 60' : '217, 79, 61'
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);
      for (var j = 0; j < particles.length; j++) {
        var p = particles[j];
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.y * 0.02) * 0.3;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y < -10) {
          p.x = Math.random() * width;
          p.y = height + 10;
          p.alpha = Math.random() * 0.8 + 0.3;
        }

        ctx.fillStyle = 'rgba(' + p.color + ',' + p.alpha + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(render);
    }
    render();
  }

  /* ------------------------------------------------------------------ *
   * V2: Schwenker Simulator
   * ------------------------------------------------------------------ */
  function initSchwenkerCockpit() {
    var grate = $('schwenker-grate');
    var chains = $('schwenker-chains');
    var meat = $('schwenk-meat');
    var swingBtn = $('cockpit-swing-btn');
    var flipBtn = $('cockpit-flip-btn');
    var hzVal = $('telemetry-hz');
    var tempVal = $('telemetry-temp');
    var umamiVal = $('telemetry-umami');
    if (!grate) return;

    var angle = 0;
    var velocity = 0;
    var isDragging = false;
    var startX = 0;
    var flipped = false;

    function animate() {
      if (!isDragging) {
        var spring = -0.04 * angle;
        var damping = 0.975;
        velocity += spring;
        velocity *= damping;
        angle += velocity;
      }

      var deg = angle * 22;
      chains.style.transform = 'rotate(' + deg + 'deg)';
      grate.style.transform = 'translateX(' + (angle * 60) + 'px) rotate(' + (deg * 0.5) + 'deg)';

      if (hzVal) {
        var freq = Math.abs(velocity * 12).toFixed(1);
        hzVal.textContent = freq + ' Hz';
      }

      requestAnimationFrame(animate);
    }
    animate();

    function givePush() {
      velocity = 0.35 * (Math.random() > 0.5 ? 1 : -1);
      SoundEngine.playSizzle();
      if (tempVal) {
        var t = 230 + Math.floor(Math.random() * 25);
        tempVal.textContent = t + ' °C';
      }
      if (umamiVal) {
        var u = (98.5 + Math.random() * 1.4).toFixed(1);
        umamiVal.textContent = u + '%';
      }
    }

    if (swingBtn) swingBtn.addEventListener('click', givePush);

    if (flipBtn && meat) {
      flipBtn.addEventListener('click', function () {
        flipped = !flipped;
        meat.classList.toggle('is-flipped', flipped);
        SoundEngine.playSizzle();
      });
    }

    grate.addEventListener('mousedown', function (e) {
      isDragging = true;
      startX = e.clientX;
    });
    window.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      var dx = (e.clientX - startX) / 80;
      angle = Math.max(-1.5, Math.min(1.5, dx));
    });
    window.addEventListener('mouseup', function () {
      if (isDragging) {
        isDragging = false;
        velocity = (Math.random() - 0.5) * 0.2;
        SoundEngine.playSizzle();
      }
    });
  }

  /* ------------------------------------------------------------------ *
   * V2: Maggi-Dosierer Widget
   * ------------------------------------------------------------------ */
  function initMaggiDropper() {
    var bottle = $('maggi-bottle');
    var quoteEl = $('maggi-quote');
    var countEl = $('maggi-drop-count');
    var trackFill = $('maggi-progress-fill');
    var levelBadge = $('maggi-level-badge');
    if (!bottle) return;

    var quotes = [
      '„Gell, schmeckt direkt bessa?“',
      '„Ei jo, ohne Maggi wär das Saarland ja gar net denkbar!“',
      '„Von daher: Immer e Spritzer mehr!“',
      '„Hauptsach gudd. Awwer mit Würze, ne?“',
      '„Unn, wie? Ei gudd!“',
      '„Das ist kein Gewürz, das ist flüssige Heimat.“',
      '„Geh fott! Das zieht dir die Falten aus dem Hemd!“'
    ];

    var drops = 3420;
    var userDrops = 0;

    bottle.addEventListener('click', function () {
      drops++;
      userDrops++;
      SoundEngine.playMaggiPlop();

      if (countEl) countEl.textContent = drops.toLocaleString('de-DE');

      if (quoteEl) {
        var q = quotes[Math.floor(Math.random() * quotes.length)];
        quoteEl.textContent = q;
      }

      if (trackFill) {
        var pct = Math.min(100, 20 + userDrops * 8);
        trackFill.style.width = pct + '%';
      }

      if (levelBadge) {
        if (userDrops < 3) levelBadge.textContent = 'Stufe 1: Saarländer Lehrling';
        else if (userDrops < 7) levelBadge.textContent = 'Stufe 2: Stammtischbruder';
        else if (userDrops < 12) levelBadge.textContent = 'Stufe 3: Schwenkmeister';
        else levelBadge.textContent = 'Stufe 4: Ehrenbürger mit Maggi im Blut!';
      }
    });
  }

  /* ------------------------------------------------------------------ *
   * V2: 3D Stammtisch-Pass
   * ------------------------------------------------------------------ */
  function initWalletPass() {
    var card = $('wallet-card-3d');
    var flipBtn = $('wallet-flip-btn');
    if (!card) return;

    function toggleFlip() {
      card.classList.toggle('is-flipped');
    }

    card.addEventListener('click', toggleFlip);
    if (flipBtn) flipBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleFlip();
    });

    // 3D Parallax Tilt on mousemove
    if (!reduceMotion) {
      card.addEventListener('mousemove', function (e) {
        if (card.classList.contains('is-flipped')) return;
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        var rx = -(y / rect.height) * 16;
        var ry = (x / rect.width) * 16;
        card.style.transform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
      });

      card.addEventListener('mouseleave', function () {
        if (!card.classList.contains('is-flipped')) {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
      });
    }
  }

  /* ------------------------------------------------------------------ *
   * V2: Saarland Drop-Radar Peiler
   * ------------------------------------------------------------------ */
  function initRadarPeiler() {
    var stationItems = document.querySelectorAll('.radar-station-item');
    var blips = document.querySelectorAll('.radar-blip');
    var stationName = $('radar-active-name');
    var stationDist = $('radar-active-dist');
    var stationCoord = $('radar-active-coord');
    var sonarBtn = $('radar-sonar-btn');
    if (!stationItems.length) return;

    function selectStation(el) {
      var name = el.getAttribute('data-name');
      var dist = el.getAttribute('data-dist');
      var coord = el.getAttribute('data-coord');

      stationItems.forEach(function (s) { s.classList.remove('active'); });
      el.classList.add('active');

      if (stationName) stationName.textContent = name;
      if (stationDist) stationDist.textContent = dist;
      if (stationCoord) stationCoord.textContent = coord;

      SoundEngine.playGrubenHorn();
    }

    stationItems.forEach(function (item) {
      item.addEventListener('click', function () { selectStation(item); });
    });

    blips.forEach(function (blip) {
      blip.addEventListener('click', function () {
        var id = blip.getAttribute('data-station');
        var match = document.querySelector('.radar-station-item[data-id="' + id + '"]');
        if (match) selectStation(match);
      });
    });

    if (sonarBtn) {
      sonarBtn.addEventListener('click', function () {
        SoundEngine.playGrubenHorn();
      });
    }
  }

  /* ------------------------------------------------------------------ *
   * V2: Ambient Sound Button
   * ------------------------------------------------------------------ */
  function initSoundToggle() {
    var btn = $('ambient-sound-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      SoundEngine.toggleAmbience(btn);
    });
  }

  /* ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initFaq();
    initVideos();
    initCounter();
    initForm();
    initConsent();
    initCateringCalc();
    initMenuFilter();
    initEmberCanvas();
    initSchwenkerCockpit();
    initMaggiDropper();
    initWalletPass();
    initRadarPeiler();
    initSoundToggle();
  });
})();


