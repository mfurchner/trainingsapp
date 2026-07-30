# TrainingsApp

Eine iPhone-optimierte Progressive Web App (PWA) für geführte Kraft- und Intervalltrainings.

## Ziele

- Einfache und intuitive Bedienung
- Optimiert für iPhone
- Offline nutzbar
- Hohe Performance
- Keine unnötigen Frameworks
- Vanilla HTML, CSS und JavaScript

---

# Technologien

- HTML5
- CSS3
- Vanilla JavaScript (ES Modules)
- LocalStorage
- Progressive Web App (PWA)

---

# Projektstruktur

```
css/
    app.css
    components.css
    layout.css
    theme.css

js/

    app.js
    config.js
    navigation.js
    router.js
    storage.js
    ui.js
    session.js
    timer.js
    wake-lock.js

    training-storage.js
    history-storage.js

    data/
        exercises.js
        workouts.js
        training-plan.js

    views/
        dashboard.js
        training.js
        training-session.js
        training-finished.js
        statistics.js
        timer.js
        settings.js
```

---

# Architektur

Die Anwendung folgt bewusst einer einfachen Architektur.

## Grundsätze

- Eine Datei besitzt genau eine Verantwortung.
- Keine Controller-Schicht.
- Keine Frameworks.
- Keine unnötigen Klassen.
- Möglichst wenig Abstraktion.
- Funktionen bleiben klein und gut lesbar.

---

# Trainingsablauf

```
Training starten

↓

Übung

↓

Satz abschließen

↓

Pause

↓

Nächster Satz

↓

Nächste Übung

↓

Training beendet
```

Für Zeitübungen:

```
Training starten

↓

Timer starten

↓

Countdown

↓

Satz abschließen

↓

Pause

↓

Nächster Satz
```

---

# Trainingsstatus

Die Trainingsansicht verwendet folgende Zustände:

- EXERCISE
- TIMER
- REST
- FINISHED

Diese Zustände steuern die gesamte Trainingslogik.

---

# Datenspeicherung

Die App speichert lokal:

- Trainingsplan
- Trainingshistorie
- Einstellungen

Es werden keine Cloud-Dienste verwendet.

---

# Wake Lock

Während eines laufenden Trainings wird ein Screen Wake Lock angefordert.

Aktueller Stand:

- ✅ funktioniert als installierte PWA auf iOS
- ⚠ Safari unterstützt das Verhalten derzeit nicht zuverlässig

---

# Teststrategie

Nach jedem Sprint:

- Browser testen
- Safari testen
- iPhone (PWA) testen
- Git Commit erstellen

---

# Roadmap

## Fertig

- Trainingsplan
- Dashboard
- Satzverwaltung
- Zeitübungen
- Rest Timer
- Weiter trainieren
- Trainingsabschluss
- Wake Lock

## Geplant

- Audio-Feedback
- Vibration
- Trainingsabbruch
- Erweiterte Statistiken
- Einstellungen
- Import / Export
- Offline-Optimierungen