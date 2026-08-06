# Website der Gemeinde Seddiner See

Offizielle Website der Gemeinde Seddiner See. Gebaut mit [Astro](https://astro.build) und [Tailwind CSS](https://tailwindcss.com), Inhalte werden über [Decap CMS](https://decapcms.org) gepflegt und automatisch auf [GitHub Pages](https://pages.github.com) veröffentlicht.

## Inhalte über die CMS-Oberfläche bearbeiten

Für die tägliche Pflege der Inhalte ist **kein Programmieren nötig**.

1. Im Browser `https://<domain>/admin/` öffnen (z. B. `https://katarinagruener.github.io/admin/`).
2. Mit dem GitHub-Konto anmelden, das Zugriff auf das Repository hat.
3. Links erscheint eine Liste aller Bereiche, rechts die Einträge zum Bearbeiten.

Jede Änderung wird als eigener Änderungsvorschlag gespeichert (redaktioneller Workflow: Entwurf → zur Prüfung → veröffentlicht) und muss im CMS auf **"Veröffentlichen"** gestellt werden, damit sie live geht. Nach dem Veröffentlichen dauert es üblicherweise 1–3 Minuten, bis die Seite aktualisiert ist (siehe [Deployment](#deployment)).

### Verfügbare Bereiche

| Bereich im CMS | Inhalt |
| :-- | :-- |
| Seiten-Header (Hero) | Titelbilder/Überschriften einzelner Seiten |
| Meldungen | Aktuelle Kurzmeldungen auf der Startseite |
| Dokumentenportal | Satzungen, Bekanntmachungen, Formulare, Ausschreibungen usw. (PDFs) |
| See-Kurier | Ausgaben der Gemeindezeitung |
| Veranstaltungen | Terminkalender |
| Verwaltung – Mitarbeitende | Mitarbeiterverzeichnis der Verwaltung |
| Bürgerservice | Alphabetisches Zuständigkeitsverzeichnis |
| Gesundheit, Einkaufen & Tanken, Gastronomie, Übernachten, Dienstleistungen, Freiwillige Feuerwehr, Vereine & Sport, Unternehmen, Sehenswürdigkeiten & Freizeitorte | Branchen-/Vereinsverzeichnisse in "Leben & Freizeit" |
| Schulen, Kitas & Horte, Seniorentreffs | Einrichtungen in "Bildung & Soziales" |
| Personen | Alle im CMS referenzierten Personen (Name, Rolle, Kontakt, Foto) |
| Ortsbeiräte | Mitglieder der Ortsbeiräte (verweisen auf "Personen") |
| Gemeindevertretung – Fraktionen / Ausschüsse | Zusammensetzung der Fraktionen und Ausschüsse (verweisen auf "Personen") |

**Hinweis zu Personen:** Name, Foto, Telefon, E-Mail usw. einer Person werden ausschließlich unter **Personen** gepflegt. In den Bereichen Ortsbeiräte, Fraktionen und Ausschüsse wird die Person nur aus einer Liste ausgewählt (Suche nach Namen) — dort keine Kontaktdaten eintragen, sondern zuerst die Person unter "Personen" anlegen/bearbeiten.

## Lokale Entwicklung

Voraussetzung: [Node.js](https://nodejs.org) ≥ 22.

```sh
npm install       # Abhängigkeiten installieren
npm run dev       # Dev-Server unter http://localhost:4321
npm run build     # Produktions-Build nach ./dist/ (inkl. Suchindex)
npm run preview   # Produktions-Build lokal ansehen
npm run covers    # Titelbilder der See-Kurier-PDFs neu erzeugen
```

### Projektstruktur

```
public/admin/config.yml   Konfiguration der CMS-Oberfläche (Felder, Bereiche)
src/content.config.ts     Schema aller Inhaltstypen (Astro Content Collections)
src/content/              Die eigentlichen Inhalte als JSON-Dateien (von der CMS gepflegt)
src/pages/                Seiten/Routen der Website
src/components/           Wiederverwendbare Bausteine (Karten, Navigation, UI …)
src/data/                 Feste Konfigurationsdaten der Seite (Navigation, Kontaktangaben etc.)
```

Neue Inhaltstypen werden zuerst als Schema in `src/content.config.ts` definiert und danach als eigener Bereich in `public/admin/config.yml` für die CMS-Oberfläche freigeschaltet.

## Deployment

Das Deployment läuft vollautomatisch über GitHub Actions (`.github/workflows/deploy.yml`):

1. Jede Veröffentlichung im CMS bzw. jeder manuelle `git push` auf den Branch `main` löst den Workflow aus.
2. Die Website wird gebaut (`npm run build`, inkl. Suchindex über [Pagefind](https://pagefind.app)) und automatisch nach GitHub Pages veröffentlicht.
3. Ein manueller Deploy-Schritt ist nicht nötig — es genügt, im CMS auf "Veröffentlichen" zu klicken.

Der Fortschritt eines Deployments lässt sich im GitHub-Repository unter dem Reiter **Actions** verfolgen.
