# Contributing

Dieses Dokument beschreibt die Entwicklungsregeln für dieses Projekt.

Diese Regeln gelten sowohl für Menschen als auch für KI-Assistenten (z. B. Codex).

---

# Grundprinzipien

- Keep it simple.
- Lesbarkeit vor Cleverness.
- Kleine Änderungen statt großer Refactorings.
- Bestehende Architektur respektieren.
- Nur notwendige Dateien ändern.

---

# Architektur

Nicht einführen:

- Controller-Schicht
- Service-Layer
- Dependency Injection
- MVC
- zusätzliche Frameworks

Bevorzugt werden kleine Module mit klarer Verantwortung.

---

# Verantwortlichkeiten

session.js

- aktueller Trainingsstatus

timer.js

- Countdown
- Timersteuerung

training-storage.js

- Trainingsplan speichern

history-storage.js

- Trainingshistorie

training-session.js

- Trainingsablauf

wake-lock.js

- Bildschirm aktiv halten

---

# Coding Style

- ES Modules verwenden
- const vor let
- camelCase
- Semikolons verwenden
- Early Return bevorzugen
- Keine tiefen Verschachtelungen
- Kleine Funktionen bevorzugen
- Verständliche Funktionsnamen

---

# Änderungen

Neue Features sollen:

- möglichst wenig Dateien ändern
- bestehende Logik wiederverwenden
- keine Duplikate erzeugen
- keine ungenutzten Funktionen hinterlassen

---

# Tests

Nach jeder abgeschlossenen Änderung:

1. Browser testen
2. Safari testen
3. iPhone PWA testen
    - Wake Lock
    - Audio
    - PWA-Installation
    - Hintergrundverhalten
    - Timer
4. Erst danach Commit

---

# Commits

Commits sollen logisch zusammenhängende Änderungen enthalten.

Beispiele:

```
feat(training): add wake lock support
```

```
fix(timer): correct rest timer transition
```

```
refactor(training): simplify session handling
```

---

# Ziel

Die App soll dauerhaft:

- einfach verständlich
- leicht wartbar
- performant
- iPhone-optimiert

bleiben.