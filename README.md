# Good Reads

En enkel boklista byggd med **HTML, CSS och JavaScript**. Böckerna sparas i **Firebase Realtime Database**.

## Funktioner

Användaren kan:

- Se alla böcker
- Lägga till en ny bok
- Markera böcker som lästa/olästa
- Sätta betyg 1–5 på lästa böcker
- Ta bort böcker

## Projektstruktur

```text
src/
├── main.js
├── style.css
└── modules/
    ├── APIrequests.js
    ├── Book.js
    ├── bookForm.js
    └── render.js
```

- **`main.js`** – startar applikationen och hanterar huvudknappen.
- **`render.js`** – hämtar och visar böckerna på sidan.
- **`bookForm.js`** – skapar formuläret för att lägga till böcker.
- **`Book.js`** – innehåller `Book`-klassen och funktioner för en enskild bok såsom uppdatera eller ta bort specifik bok
- **`APIrequests.js`** – hanterar kommunikation med Firebase.

## Teknik

- JavaScript ES Modules
- Async/Await
- Fetch API
- Firebase Realtime Database
- DOM-manipulation
- JavaScript Classes

## Databas

En **kopia av databasen är sparad lokalt i projektet som backup**, för att säkerställa att datan kan återskapas vid behov.

## Deployment

Projektet är deployat med **Netlify**.

Live: https://be26-js2-goodreads-diana-paragina.netlify.app/ 
