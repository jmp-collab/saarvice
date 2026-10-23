# SAARVICE Website — Stand und offene Punkte

Kurzfassung für Jean. Was gebaut wurde, was noch fehlt, und was vor dem Livegang
zwingend passieren muss.

---

## Zuerst: zwei Warnungen

**1. Nichts ist versioniert.** Die `.gitignore` in diesem Worktree lautet:

```
*
!.gitignore
```

Damit ist außer der `.gitignore` keine einzige Datei unter Versionskontrolle —
`git status` meldet „working tree clean", obwohl die ganze Website hier liegt.
Es gibt also **kein Zurück** über Git. Empfehlung: `.gitignore` durch etwas
Sinnvolles ersetzen (`node_modules/`, `.probe/`, `*.bak`) und einmal committen,
bevor weitergearbeitet wird.

**2. Das Bildmaterial ist der Flaschenhals.** Siehe unten.

---

## Was gemacht wurde

### Bilder waren komplett kaputt
Das HTML verwies auf `.webp`-Dateien, die es nie gab. Real lagen `.jpg`-Dateien
mit anderen Namen da. Auf **jedem** Bild griff der `onerror`-Fallback — die Seite
zeigte durchgehend graue SVG-Platzhalter statt Essen.

Jetzt: Rohmaterial liegt in `assets/images/_source/` und wird von
`scripts/build-assets.py` in die vom HTML erwarteten Dateien übersetzt. Die
`onerror`-Krücken sind raus, dafür haben alle Bilder `width`/`height`
(kein Layout-Sprung), `loading="lazy"` und echten Alt-Text.

### Die „Moment"-Badges waren vertauscht
Das HTML wies dem Crunch Stack „Der Reveal" zu und den Gefillde Bombs „Der Pour".
Sowohl das Bildmaterial (die Poster tragen den Moment eingebrannt) als auch die
Brand-Guidelines sagen das Gegenteil: **Crunch Stack = Der Pour**, **Gefillde =
Der Reveal**. Korrigiert, auf Startseite und Detailseiten.

### Der Mitgliederzähler war erfunden
Er stand auf 547 und zählte im `localStorage` des Besuchers hoch. Jede Person sah
also eine andere „Mitgliederzahl", und keine davon war echt. Das verstößt gegen
die eigene Guardrail *„Nichts erfinden, was als Fakt lesbar ist."*

Jetzt: Der Zähler bleibt **versteckt**, bis `SAARVICE_CONFIG.counterEndpoint`
eine echte Zahl liefert.

### Das Formular täuschte Erfolg vor
Es zeigte „Gude! Das hat geklappt" und vergab eine Mitgliedsnummer — ohne dass
jemals etwas gesendet wurde. Leute hätten geglaubt, sie seien angemeldet.

Jetzt: Ohne konfiguriertes Backend sagt das Formular ehrlich, dass es noch nicht
scharf ist. Dazu: Pflicht-Einwilligung (nicht vorausgewählt), Honeypot gegen
Bots, Feldvalidierung mit `aria-invalid`, echter Fehlerpfad.

### Mobile Navigation gab es nicht
Das CSS hatte `nav { display: none }` ab 600 px mit dem Kommentar „can implement
mobile toggle later". Auf dem Telefon war die Seite also unnavigierbar — bei
einem Street-Food-Publikum die Mehrheit der Besucher. Jetzt: Burger-Menü mit
`aria-expanded`, Escape-Taste, Schließen nach Linkklick.

### Horizontaler Überlauf auf dem Telefon
`.drinks-grid` blieb zweispaltig, und `1fr` bedeutet `minmax(auto, 1fr)` — die
Spalte konnte nicht unter ihre min-content-Breite schrumpfen. Ergebnis: 492 px
Inhalt auf 400 px Bildschirm. Dazu sprengten unbrechbare URLs die Rechtsseiten
auf 950 px. Beides gefixt, mit `minmax(0, 1fr)` und `overflow-wrap`.

### Der Video-Beobachter lief ins Leere
`js/main.js` beobachtete `video[autoplay]`. Die Momente-Videos hatten dieses
Attribut nie — sie wären also **nie** gestartet, auch mit vorhandenen Dateien.
Jetzt hängt alles an `data-src`, mit `IntersectionObserver`, Respekt vor
`prefers-reduced-motion` und Datensparmodus.

### § 5 TMG war veraltet
Das Telemediengesetz wurde im Mai 2024 vom Digitale-Dienste-Gesetz abgelöst; die
Impressumspflicht steht seither in **§ 5 DDG**. Inhaltlich ändert sich nichts,
aber ein stehengebliebenes „§ 5 TMG" ist schlicht falsch. Korrigiert.

Der Datenschutz hat außerdem die fehlenden Pflichtabschnitte bekommen: Hosting
und Server-Logfiles, Speicherung im Browser, Reichweitenmessung, Speicherdauer,
Verschlüsselung, Beschwerderecht bei der Aufsichtsbehörde.

### Neu gebaut (V1 Baseline)
- `drops.html` — wie das Drop-Format funktioniert
- `getraenke.html` — die vier Getränke mit Details
- `catering.html` — Buchungsanfragen
- `presse.html` — Kurzprofil und Pressekontakt
- `js/config.js` — alle externen Abhängigkeiten an einer Stelle
- Consent-Banner (erscheint nur, wenn auch Analytics konfiguriert ist)
- Skip-Links, sichtbarer Tastaturfokus, ARIA am FAQ-Akkordeon
- Favicon, Apple-Touch-Icon (existierten beide nicht)

### V2 Website-Entwicklung (Aktueller Stand)
- **Gesamtkonzept Master-Dokument:** `SAARVICE_V2_KONZEPT.md` (Brand Book, kulinarische Architektur, 5-Phasen-Drop-Engine, Stammtisch-Pass, Unit Economics & Roadmap).
- **Vier neue Menü-Detailseiten:**
  - `menu/gequellte-crinkle-fries.html` (Dreifach gegart, Saar-Dust, Maggi-Miso Mayo)
  - `menu/saar-kimchi.html` (14 Tage lacto-fermentierter Spitzkohl mit Viez)
  - `menu/grumbeer-churros.html` (Kartoffel-Brandteig, warmes Viez-Karamell, Bourbon-Schmand)
  - `menu/kraeuterseitling-katsu-sando.html` (100% Vegan, Buchenrauch, vegane Liebstöckel-Creme)
- **Interaktiver Menü-Filter auf der Startseite:** Live-Filterung nach *Alle*, *Die 4 Ikonen*, *Ebbes debei (Sides)*, *Süßes (Dessert)* und *100% Plant-Based*.
- **Interaktiver Werkstatt-Catering-Kalkulator (`catering.html`):** Live-Berechnung von Personenzahl (50–400), Paketwahl (Schwenk-Schicht, Kohlengrube Deluxe, Hütten-Festival), Add-ons (Drinks-Flat, Saar-Dust Gastgeschenke) und automatische Generierung von formatierten E-Mail-Angeboten.
- **Digitaler Stammtisch-Pass Showcase:** Präsentation des Apple & Google Wallet Passes mit 4 Member-Rängen (*Stift*, *Schwenker*, *Schwenkmeister*, *Ehrengast*) in `index.html` und `drops.html`.
- **5-Phasen-Drop-Protokoll (`drops.html`):** Detaillierter Ablauf (Teaser -> GPS-Alarm 48h -> VIP Access -> Feuer frei -> Sold Out) inkl. digitaler Zahlungsmethoden.
- **LMIV-Pflichtangaben & Viez-Tonic 0.0% (`getraenke.html`):** Genaue Vol.-%, Füllmengen, Allergene und Endpreise eingearbeitet.
- **AEO, SEO & LLM-Infrastruktur:**
  - `robots.txt` mit gezielter Freigabe für GPTBot, ClaudeBot, PerplexityBot, Google-Extended
  - `sitemap.xml` mit allen 15 HTML-URLs
  - `llms.txt` für KI-Agenten und strukturierte Modellabfragen
  - Schema.org JSON-LD (`FastFoodRestaurant`, `FAQPage`) direkt im Head von `index.html`

### Werkzeuge
- `scripts/build-assets.py` — baut alle Bilder aus dem Rohmaterial neu
- `scripts/check-site.py` — prüft jede Datei-Referenz, jeden internen Link, jeden
  Anker und jedes `alt`-Attribut. Listet offene `[NEEDS_REVIEW]`-Stellen auf.
  Rückgabe 1 bei Fehlern, taugt also für einen Pre-Commit-Hook. (Aktuell: 15/15 Seiten grün, Exit 0).

---

## Der Flaschenhals: Fotos

Das ist der wichtigste Punkt im Dokument.

Das gesamte Rohmaterial ist **niedrig aufgelöst**:

| Datei | Größe | Taugt für |
|---|---|---|
| `panel_*.jpg` | 512 × 341 | Kartenbilder, gerade so |
| `*_dish.jpg` | 396 × 558 | Social-Poster |
| `media__*.jpg` | 1024 × 682 | Rezeptposter |

Daraus folgt:

**Die Momente-Reels wurden bewusst nicht gebaut.** Für ein 9:16-Portrait gibt das
Material nur 133 × 235 px echte Fläche her. Hochskaliert wäre das Matsch. Ein
Ken-Burns-Schwenk aus einem Standbild ersetzt „Der Cut" oder „Der Pour" auch
nicht — genau die Bewegung ist ja der Punkt. Stattdessen: Die Sektion zeigt
Poster und lädt automatisch echte Videos nach, sobald diese Dateien existieren:

```
assets/videos/moment_sando_15s.mp4
assets/videos/moment_doppelweck_15s.mp4
assets/videos/moment_crunch_15s.mp4
assets/videos/moment_gefillde_15s.mp4
```

Reinlegen genügt, kein Code nötig.

**Das Hero-Video ist echt, aber ein Behelf.** Es ist ein langsamer Zoom auf den
Sando, aus dem besten vorhandenen Ausschnitt hochgerechnet. Bei 45 Sekunden und
leichter Weichzeichnung trägt das — es ist aber kein gedrehtes Material.

**Die Kartenbilder zeigen die Rezeptposter.** Die wiederholen den Gerichtenamen,
der direkt darunter nochmal steht. Etwas doppelt gemoppelt. Die Alternative wäre,
die Foto-Zone freizustellen — dann bleiben 370 px Breite, und das sieht schlechter
aus als die Redundanz.

**Was hilft:** Ein halber Tag mit einem Fotografen und den vier Gerichten. Vier
Querformate für die Karten, vier Hochformate für die Detailseiten, vier
15-Sekunden-Reels für die Momente, ein Hero-Clip. Danach `build-assets.py` neu
laufen lassen und die Video-Dateien ablegen — der Rest ist verdrahtet.

---

## Vor dem Livegang zwingend

### 1. `js/config.js` ausfüllen
```js
signupEndpoint:  null   // ← ohne das nimmt das Formular nichts an
counterEndpoint: null   // ← ohne das bleibt der Zähler versteckt
analytics:       null   // ← ohne das kein Banner, keine Messung
```

Zum Newsletter: Ein reiner Formular-Dienst reicht **nicht**. Für Werbemails an
deutsche Empfänger braucht es Double-Opt-In (§ 7 UWG) — der Bestätigungslink ist
Pflicht. Brevo oder Mailchimp haben das eingebaut.

Zu Analytics: Plausible oder selbst gehostetes Matomo können cookiefrei laufen.
Dann brauchst du das Consent-Banner gar nicht — schneller und rechtlich
einfacher. Das Banner erscheint automatisch nicht, wenn `analytics.provider`
auf `null` steht.

### 2. Die 30 `[NEEDS_REVIEW]`-Stellen abarbeiten
`python3 scripts/check-site.py` listet sie mit Datei und Zeilennummer auf.
Schwerpunkte: Impressum (Anschrift, Vertretung, Register, USt-ID), Datenschutz
(Hoster, Provider, Fristen), Kontaktadressen.

### 3. Lebensmittelrecht
Auf `getraenke.html` fehlen Preise, Füllmengen und die Allergen- bzw.
Zusatzstoff-Kennzeichnung. Bei alkoholhaltigen Getränken ist der Alkoholgehalt
in Volumenprozent verpflichtend (EU 1169/2011). Für den Betrieb selbst:
Gewerbeanmeldung, Gestattung je Veranstaltungsort, § 43 IfSG, HACCP,
Betriebshaftpflicht.

Das ist keine Rechtsberatung — ich bin kein Anwalt und das hier ersetzt keinen.
Lass es jemanden prüfen, der es ist.

### 4. Merch-Bild
`assets/images/merch_shirt.svg` ist eine gezeichnete Platzhaltergrafik, kein
Produktfoto. Sie sagt das auch selbst, unten im Bild.

---

## Was ich bewusst nicht gemacht habe

- **Kein Drop-Archiv mit vergangenen Drops.** Drop #001 hat nicht stattgefunden.
  Erfundene Historie hätte auf einer Seite gestanden, deren Glaubwürdigkeit an
  genau dieser Ehrlichkeit hängt.
- **Keine Ken-Burns-Fake-Reels.** Siehe oben.
- **Kein SEO-Ausbau.** Hattest du nicht ausgewählt. Was fehlt und sich lohnen
  würde: JSON-LD (`Restaurant`, `Menu`, `FAQPage`, `Event` für die Drops),
  `sitemap.xml`, `robots.txt`. Sag Bescheid, das ist überschaubar.
- **Die Startseite lädt keine Schriften vor.** Die WOFF2-Dateien liegen lokal,
  das ist schon der halbe Gewinn. Ein `<link rel="preload">` für die zwei
  wirklich genutzten Schnitte würde noch etwas bringen.

---

## Prüfstand

```bash
python3 scripts/check-site.py      # Links, Bilder, Anker, Alt-Texte, NEEDS_REVIEW
python3 scripts/build-assets.py    # Bilder aus _source/ neu bauen
```

Geprüft wurde im echten Browser bei 400 px und 1280 px über alle 11 Seiten:
kein horizontaler Überlauf, keine kaputten Bilder, genau eine `h1` pro Seite,
Mobile-Nav öffnet, Formularvalidierung greift, Honeypot greift, keine
Konsolenfehler.
