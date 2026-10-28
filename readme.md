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
    settings-storage.js
    ui.js
    session.js
    timer.js
    wake-lock.js
    feedback.js
    version.js

    training-storage.js
    history-storage.js

    data/
        exercises.js
        workouts.js
        training-plan.js
        warmup.js
        stretching.js
        plans.js

        arm-focus-exercises.js
        arm-focus-workouts.js
        arm-focus-training-plan.js
        arm-focus-warmup.js
        arm-focus-stretching.js

    views/
        dashboard.js
        training.js
        training-plans.js
        training-session.js
        training-finished.js
        plan-selection.js
        statistics.js
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

Aufwärmen

↓

Workout

↓

Satz abschließen

↓

Pause

↓

Nächster Satz

↓

Nächste Übung

↓

Dehnen

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

Nach dem letzten Satz einer Übung läuft – sofern eine weitere Übung folgt –
die Pausenzeit der abgeschlossenen Übung. Während dieser Pause wird die
nächste Übung angezeigt.

Aufwärmen und Dehnen gehören zur Trainingseinheit, zählen jedoch nicht zum
Workout-Fortschritt und erzeugen keine zusätzlichen Historieneinträge.

---

# Trainingspläne

Die App verwaltet mehrere Trainingspläne. Der aktive Plan wird lokal
gespeichert und im Tab **Trainingsplan** angezeigt.

Aktuell verfügbare Pläne:

- 4-Wochen-Ganzkörperplan
- 4-Wochen-Armfokus mit Matte und zwei Kurzhanteln à 2,5 kg

Jeder Plan besitzt eigene Workout-, Übungs-, Aufwärm- und Dehndaten. Nach dem
vollständigen Abschluss eines Plans erscheint eine Auswahl für den nächsten
Durchlauf. Bereits vorhandene Pläne bleiben auswählbar; ihr Fortschritt wird
pro Plan getrennt gespeichert.

Während einer laufenden Trainingseinheit kann der aktive Plan nicht geändert
werden.

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

- ausgewählten Trainingsplan
- Trainingsfortschritt je Trainingsplan
- Trainingshistorie
- laufende Session
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
- Mehrere Trainingspläne mit separatem Fortschritt
- Plan-Auswahl nach vollständigem Planabschluss
- Tab für aktuellen Trainingsplan und Planwechsel
- Dashboard
- Satzverwaltung
- Zeitübungen
- Rest Timer
- Pause zwischen Übungen mit Vorschau der nächsten Übung
- Aufwärmen und Dehnen als Trainingsphasen
- Weiter trainieren
- Trainingsabbruch
- Trainingsabschluss
- Wake Lock
- Audio- und Vibrationsfeedback
- einstellbare Signalton-Lautstärke mit Vorschau

## Geplant

- Erweiterte Statistiken
- Import / Export
- Offline-Optimierungen
