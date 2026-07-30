# Architecture

Dieses Dokument beschreibt die Architekturentscheidungen der TrainingsApp.

Es ergänzt die README und richtet sich primär an Entwickler und KI-Assistenten.

---

# Philosophie

Die App verfolgt bewusst eine einfache Architektur.

Grundprinzipien:

- Keep it simple.
- Keine unnötigen Abstraktionen.
- Lesbarer Code ist wichtiger als cleverer Code.
- Kleine Module statt komplexer Frameworks.
- Jede Datei besitzt genau eine Verantwortung.

Die Anwendung soll auch in einigen Jahren noch leicht verständlich sein.

---

# Technologiestack

- HTML
- CSS
- Vanilla JavaScript
- ES Modules
- LocalStorage
- Progressive Web App (PWA)

Es werden bewusst keine Frameworks verwendet.

---

# Architekturübersicht

```
                 app.js
                    │
        ┌───────────┴───────────┐
        │                       │
 navigation.js             router.js
        │                       │
        └───────────┬───────────┘
                    │
                 Views
                    │
      ┌─────────────┼─────────────┐
      │             │             │
 dashboard     training     statistics
      │
training-session
      │
      ├──────── session.js
      ├──────── timer.js
      ├──────── wake-lock.js
      ├──────── training-storage.js
      └──────── history-storage.js
```

---

# Verantwortlichkeiten

## session.js

Verwaltet ausschließlich den aktuellen Trainingszustand.

Beispiele:

- aktuelle Übung
- Satz
- Woche
- Training aktiv

Keine UI.

Keine Timer.

Keine Speicherung.

---

## timer.js

Verantwortlich für Countdown-Timer.

Aufgaben:

- Timer starten
- Timer stoppen
- verbleibende Zeit
- Callback bei Ablauf

Keine Trainingslogik.

---

## wake-lock.js

Kapselt sämtliche Wake-Lock-Funktionalität.

Aufgaben:

- Wake Lock anfordern
- Wake Lock freigeben

Keine Trainingslogik.

---

## training-storage.js

Speichert Trainingspläne.

Keine Historie.

---

## history-storage.js

Speichert abgeschlossene Trainings.

Keine aktive Session.

---

## training-session.js

Enthält den kompletten Trainingsablauf.

Hier befindet sich die eigentliche Business-Logik.

Beispiele:

- Satz abschließen
- Pause starten
- Pause beenden
- nächste Übung
- Training abschließen

---

# Statusmodell

Der Trainingsablauf basiert auf einem einfachen Zustandsmodell.

```
EXERCISE

↓

TIMER

↓

FINISHED

↓

REST

↓

EXERCISE
```

Verwendete Status:

```
EXERCISE
TIMER
REST
FINISHED
```

Neue Status sollten nur eingeführt werden, wenn sie den Ablauf tatsächlich vereinfachen.

---

# Trainingsablauf

Kraftübung

```
Training starten

↓

Satz

↓

Pause

↓

nächster Satz

↓

nächste Übung
```

Zeitübung

```
Training starten

↓

Timer starten

↓

Countdown

↓

Satz abgeschlossen

↓

Pause

↓

nächster Satz
```

Die Trainingslogik befindet sich vollständig in
`training-session.js`.

---

# Datenfluss

```
Workout

↓

Session

↓

Training

↓

Historie
```

Es gibt nur eine aktive Session.

Nach Trainingsende wird sie in die Historie übernommen.

---

# UI

Die Views enthalten ausschließlich:

- Rendering
- Event Handler
- Darstellung

Komplexe Geschäftslogik gehört nicht in die UI.

---

# Designentscheidungen

## Keine Controller

Es existiert bewusst keine Controller-Schicht.

Der Trainingsablauf ist überschaubar und wird direkt in
`training-session.js`
implementiert.

Dadurch bleibt die Anwendung einfacher.

---

## Keine Klassen

Die App verwendet ausschließlich Funktionen und Module.

Klassen würden derzeit keinen Mehrwert bringen.

---

## Keine Frameworks

Es werden keine Frameworks eingesetzt.

Gründe:

- geringere Komplexität
- schnellere Ladezeit
- vollständige Kontrolle
- einfaches Debugging

---

## LocalStorage

Alle Daten werden lokal gespeichert.

Es existiert keine Serverkommunikation.

---

## Wake Lock

Während eines Trainings wird versucht, einen Screen Wake Lock zu aktivieren.

Aktueller Stand:

- funktioniert zuverlässig als installierte PWA auf iOS
- Safari verhält sich unterschiedlich und sollte nicht als Referenz dienen

---

# Erweiterungsregeln

Neue Features sollen möglichst bestehende Module erweitern.

Bevor neue Dateien angelegt werden, prüfen:

- Kann bestehender Code erweitert werden?
- Bleibt die Verantwortlichkeit klar?
- Entsteht doppelte Logik?

---

# Was vermieden werden soll

Nicht einführen:

- MVC
- MVVM
- Controller
- Service Layer
- Dependency Injection
- globale Zustände außerhalb von session.js
- unnötige Utility-Dateien
- Helper-Sammlungen ohne klare Verantwortung

---

# Ziel

Die Architektur soll dauerhaft:

- verständlich
- klein
- wartbar
- performant

bleiben.

Ein neuer Entwickler oder KI-Assistent sollte die gesamte Architektur innerhalb weniger Minuten verstehen können.

---

# Architekturentscheidungen

## 2026-07-30 – Trainingslogik

Die komplette Trainingslogik befindet sich in
`training-session.js`.

Es wird bewusst keine zusätzliche Controller-Schicht eingeführt.

Begründung:

- geringere Komplexität
- einfacher Debugging
- kurze Wege
- ausreichend für die Projektgröße

---

## 2026-07-30 – Statusmodell

Die Trainingssteuerung erfolgt über einen expliziten Status.

Verwendete Status:

- EXERCISE
- TIMER
- REST
- FINISHED

REST wurde bewusst als eigener Zustand eingeführt, damit Kraft- und Zeitübungen dieselbe Logik verwenden.

---

## 2026-07-30 – Wake Lock

Wake Lock wird ausschließlich über
`wake-lock.js`
gekapselt.

Ergebnis der Tests:

- Desktop: funktioniert
- iPhone Safari: nicht zuverlässig
- installierte PWA: funktioniert

Deshalb wird Wake Lock weiterhin verwendet und als PWA-Feature betrachtet.

---

## Zukünftige Entscheidungen

Neue Architekturentscheidungen werden in diesem Abschnitt dokumentiert.

Jede Entscheidung sollte enthalten:

- Datum
- Entscheidung
- Begründung
- Auswirkungen