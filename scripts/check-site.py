#!/usr/bin/env python3
"""
SAARVICE — Selbsttest.

Prüft, ob die Seite hält, was das HTML behauptet:
  1. Jede referenzierte Datei (img/src, video, css, js, favicon) existiert.
  2. Jeder interne Link zeigt auf eine existierende Datei.
  3. Jedes Sprungziel (#anker) existiert auf der Zielseite.
  4. Jedes <img> hat ein alt-Attribut.
  5. Offene [NEEDS_REVIEW]-Stellen werden aufgelistet.

Aufruf:  python3 scripts/check-site.py
Rückgabe: 0 = sauber, 1 = Fehler gefunden.
"""

import os
import re
import sys
from collections import defaultdict
from html.parser import HTMLParser
from urllib.parse import unquote, urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

errors = []
warnings = []


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []          # (attr, wert)
        self.ids = set()
        self.imgs_without_alt = 0
        self.imgs = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            self.ids.add(a['id'])
        if a.get('name'):
            self.ids.add(a['name'])

        if tag == 'img':
            self.imgs += 1
            if a.get('alt') is None:
                self.imgs_without_alt += 1
            if a.get('src'):
                self.refs.append(('src', a['src']))
        elif tag in ('script', 'source', 'video', 'audio') and a.get('src'):
            self.refs.append(('src', a['src']))
        elif tag == 'video' and a.get('poster'):
            self.refs.append(('poster', a['poster']))
        elif tag == 'link' and a.get('href'):
            self.refs.append(('href', a['href']))
        elif tag == 'a' and a.get('href'):
            self.refs.append(('href', a['href']))

        if tag == 'video':
            if a.get('poster'):
                self.refs.append(('poster', a['poster']))
            if a.get('data-src'):
                self.refs.append(('data-src', a['data-src']))


def html_files():
    out = []
    for base, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in ('.git', 'node_modules', '.probe', '_source')]
        for f in files:
            if f.endswith('.html'):
                out.append(os.path.join(base, f))
    return sorted(out)


def anchors_of(path, cache={}):
    if path not in cache:
        try:
            with open(path, encoding='utf-8') as fh:
                p = Page()
                p.feed(fh.read())
            cache[path] = p.ids
        except OSError:
            cache[path] = set()
    return cache[path]


def main():
    files = html_files()
    if not files:
        sys.exit('Keine HTML-Dateien gefunden.')

    review = defaultdict(list)

    for path in files:
        rel = os.path.relpath(path, ROOT)
        with open(path, encoding='utf-8') as fh:
            raw = fh.read()

        page = Page()
        page.feed(raw)

        if page.imgs_without_alt:
            errors.append(f'{rel}: {page.imgs_without_alt} <img> ohne alt-Attribut')

        for line_no, line in enumerate(raw.splitlines(), 1):
            for m in re.finditer(r'\[NEEDS_REVIEW[^\]]*\]', line):
                review[rel].append((line_no, m.group(0)))

        for attr, value in page.refs:
            if not value or value.startswith(('#', 'mailto:', 'tel:', 'data:', 'javascript:')):
                if value.startswith('#') and len(value) > 1:
                    if value[1:] not in page.ids:
                        errors.append(f'{rel}: Sprungziel {value} existiert nicht')
                continue

            parsed = urlparse(value)
            if parsed.scheme in ('http', 'https'):
                continue

            target = unquote(parsed.path)
            if not target:
                continue

            abs_target = os.path.normpath(os.path.join(os.path.dirname(path), target))

            if not os.path.exists(abs_target):
                # data-src ist bewusst optional: fehlt das Video, bleibt das
                # Poster stehen. Das ist kein Fehler, soll aber sichtbar sein.
                if attr == 'data-src':
                    warnings.append(
                        f'{rel}: Video "{value}" fehlt — Poster bleibt stehen (so gewollt)')
                else:
                    errors.append(f'{rel}: {attr}="{value}" -> Datei fehlt')
                continue

            if parsed.fragment and abs_target.endswith('.html'):
                if parsed.fragment not in anchors_of(abs_target):
                    errors.append(
                        f'{rel}: {value} -> Anker #{parsed.fragment} fehlt in '
                        f'{os.path.relpath(abs_target, ROOT)}')

    print(f'Geprüft: {len(files)} HTML-Dateien\n')

    if errors:
        print(f'FEHLER ({len(errors)}):')
        for e in errors:
            print(f'  x {e}')
    else:
        print('Alle Datei-Referenzen, Links und Anker lösen auf. Alle Bilder haben alt-Text.')

    if warnings:
        print(f'\nHINWEISE ({len(warnings)}):')
        for w in warnings:
            print(f'  ! {w}')

    total = sum(len(v) for v in review.values())
    if total:
        print(f'\nOFFENE [NEEDS_REVIEW]-Stellen ({total}):')
        for rel in sorted(review):
            print(f'  {rel}')
            for line_no, text in review[rel]:
                print(f'      Zeile {line_no}: {text}')

    return 1 if errors else 0


if __name__ == '__main__':
    sys.exit(main())
