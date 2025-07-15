# money-maker

Eine App zur Finanzübersicht. Sie hat die folgenden Features:

- Übersichtliche Darstellung Statistiken der monatlichen Ausgaben nach Kategorien
- Regelmäßige Ausgaben und Einnahmen können monatlich automatisch eingetragen werden


## run it locally

Hier ist eine Anleitung, mit der du die App lokal laufen lassen kannst:

1. Clone das git repository
2. Wechsle in der Unterordner "backend-money-maker"
3. Benutze eine IDE deiner Wahl mit Maven support um das Projekt zu kompilieren, oder führe "mvn package" aus
4. Starte das Backend mit "java -jar target/backend-money-maker-0.0.1.jar"
5. wechsel in den frontend-money-maker Unterordner
6. Führe die Befehle "npm install", "npm run build" und "npm run start" aus
7. Schaue dir das Ergebnis an

Die App kommt mit Beispieldaten. Wenn du die App auf einem richtigen Server laufen lassen willst, musst du ein paar Sachen selber konfigurieren. Hier
ist eine grobe Anleitung:

- Benutze einen richtigen Webserver mit Rate-Limiting und Https-Support als reverse Proxy. Auf Linux bietet sich nginx an.
- Konfiguriere nginx, so dass es Anfragen an das Backend an die Spring Boot Application weiterzuleiten. Diese kannst du auf irgendeinem lokalen Port laufen lassen.
- Für das Frontend, lass dir von Angular die JS-Files bündeln und kopiere sie in irgendeinen Unterordner auf deinem Server.
- Konfiguriere nginx (oder was auch immer du benutzt), so dass es bei Anfragen an das Frontend mit statischen Files aus diesem Ordner zu antworten.
- Du solltest die In-Memory-Entwicklungsdatenbank H2 durch eine richtige Datenbank ersetzen (z.B. MySQL). Das Projekt enthät Schemata dafür.

Viel Spaß!

## about

Das hier ist das Abschlussprojekt des YouGrow-Academy Web-Development Bootcamps. Geschrieben habe ich den Code zusammen mit Ronja Pieroth und Corinna Bödigheimer. 
