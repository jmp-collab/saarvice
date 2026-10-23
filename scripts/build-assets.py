#!/usr/bin/env python3
"""
SAARVICE — Asset-Build.

Baut aus dem vorhandenen Rohmaterial (assets/images/_source) die vom HTML
referenzierten Bilder. Idempotent: mehrfach ausfuehrbar.

Quelle -> Ziel
  panel_sando.jpg              -> schwenker_katsu_sando.webp     (Karte, 16:10)
  panel_doppelweck.jpg         -> merguez_falafel_doppelweck.webp
  panel_crunch.jpg             -> dibbelabbes_crunch_stack.webp
  panel_gefillde.jpg           -> gefillde_bombs.webp
  media__...557 (Mittelpanel)  -> moment_sando_poster.webp       (Momente, Portrait)
  media__...568 (Mittelpanel)  -> moment_crunch_poster.webp
  media__...537 (Mittelpanel)  -> moment_gefillde_poster.webp
  doppelweck_dish.jpg          -> moment_doppelweck_poster.webp
  media__...804 (2x2 Raster)   -> rezept_poster.webp
  media__...804 (abgedunkelt)  -> hero_poster.webp               (Hero, 16:9)

WARNUNG: Das Rohmaterial ist niedrig aufgeloest (max. 512 px Kantenlaenge bei den
Panels, 1024 px beim Raster). Es wird bewusst NICHT hochskaliert. Sobald echte
Fotos vorliegen: in assets/images/_source ablegen, Namen beibehalten, Skript neu
laufen lassen.
"""

import os
import sys

from PIL import Image, ImageEnhance

HERE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(HERE, "..", "assets", "images")
SRC = os.path.join(IMG, "_source")

# Mittelpanel-Koordinaten der 1024x558-Composites (links/rechts liegt Fliesstext)
CENTER_PANEL = (313, 0, 711, 558)


def _open(name):
    path = os.path.join(SRC, name)
    if not os.path.exists(path):
        print(f"  ! fehlt: {name} — uebersprungen")
        return None
    return Image.open(path).convert("RGB")


def save_webp(im, name, quality=86):
    out = os.path.join(IMG, name)
    im.save(out, "WEBP", quality=quality, method=6)
    kb = os.path.getsize(out) / 1024
    print(f"  + {name:38s} {im.size[0]}x{im.size[1]:<5d} {kb:6.1f} KB")


def cover(im, ratio):
    """Mittiger Crop auf ein Seitenverhaeltnis, ohne hochzuskalieren."""
    w, h = im.size
    target_h = w / ratio
    if target_h <= h:
        top = (h - target_h) / 2
        return im.crop((0, int(top), w, int(top + target_h)))
    target_w = h * ratio
    left = (w - target_w) / 2
    return im.crop((int(left), 0, int(left + target_w), h))


def main():
    if not os.path.isdir(SRC):
        sys.exit(f"Quellordner fehlt: {SRC}")
    os.makedirs(IMG, exist_ok=True)

    print("Karten (16:10):")
    for src, dst in [
        ("panel_sando.jpg", "schwenker_katsu_sando.webp"),
        ("panel_doppelweck.jpg", "merguez_falafel_doppelweck.webp"),
        ("panel_crunch.jpg", "dibbelabbes_crunch_stack.webp"),
        ("panel_gefillde.jpg", "gefillde_bombs.webp"),
    ]:
        im = _open(src)
        if im:
            save_webp(cover(im, 16 / 10), dst)

    # Die Composites tragen oben ("DER SCHWENKER KATSU SANDO") und unten
    # ("Social Moment: Der Cut", @saarvice) eingebrannte Typo. Die Momente-Karte
    # legt ihr eigenes Label darüber — beides zusammen ist doppelt und unruhig.
    # Deshalb nur die Foto-Zone dazwischen.
    print("Momente (Foto-Zone, Typo abgeschnitten):")
    FOOD_ZONE = (313, 175, 711, 455)          # im 1024x558-Composite
    for src, dst, box in [
        ("media__1784218622557.jpg", "moment_sando_poster.webp", FOOD_ZONE),
        ("media__1784218622568.jpg", "moment_crunch_poster.webp", FOOD_ZONE),
        ("media__1784218622537.jpg", "moment_gefillde_poster.webp", (313, 190, 711, 470)),
        # Für den Doppelweck gibt es kein Composite — die Foto-Zone stammt aus
        # dem Rezeptposter-Raster (oben rechts).
        ("media__1784218622804.jpg", "moment_doppelweck_poster.webp", (525, 130, 795, 341)),
    ]:
        im = _open(src)
        if not im:
            continue
        save_webp(cover(im.crop(box), 4 / 5), dst)

    print("Rezeptposter:")
    grid = _open("media__1784218622804.jpg")
    if grid:
        save_webp(grid, "rezept_poster.webp", quality=88)

    print("""
Fertig. Rohmaterial bleibt unangetastet in assets/images/_source.

Hinweis zum Hero:
  assets/images/hero_poster.webp wird NICHT hier gebaut, sondern ist der erste
  Frame von assets/videos/hero_45s_reel.mp4 — sonst springt das Bild, sobald das
  Video einsetzt. Neu erzeugen mit:

    ffmpeg -y -i assets/videos/hero_45s_reel.mp4 -frames:v 1 /tmp/f0.png
    python3 -c "from PIL import Image; \\
      Image.open('/tmp/f0.png').convert('RGB').save(\\
      'assets/images/hero_poster.webp','WEBP',quality=82,method=6)"
""")


if __name__ == "__main__":
    main()
