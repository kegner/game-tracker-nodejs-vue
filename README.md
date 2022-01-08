# Game Tracker

Game Tracker is a fullstack Node JS/Vue/PostgreSQL webapp to keep a running list of video games to play or games you have played.


## Build Instructions

#### Setup the DB

* Install [PostgreSQL](https://www.postgresql.org/download/) on your system (or download [PgAdmin](https://www.postgresql.org/download/) for a database GUI tool).
* Create a new database.
* Run the SQL script `/scripts/create_schema.sql`

#### Setup the .env file

* Create a `.env` file from the `.env-template` file.
* Add values for `DB_NAME`, `DB_USER`, `DB_PASS` for your local Postgres instance.
* Add a session salt string for hashing passwords.
* If setting up the application as HTTPS, the `COOKIE_SECURE` variable should be changed to `true`.

#### Build the Node JS backend with the frontend

* `npm run build` will build the Vue app in the `/client/dist/` folder.
* `npm start` to run the app.

This will default to running the app on 5000. You may edit this port in the `.env` file.

#### Run the app for development.

Running the frontend separately while developing allows for faster iteration by utilizing Vue's hot reloading.

* Run the command `npm run dev`. This will use nodemon to start the Node JS app on `localhost:5000` and the vue app on `localhost:8080`.

Confirm the `/client/vue.config.js` file has the correct port for your the Node JS app.

```
"target": "http://localhost:5000",
```
