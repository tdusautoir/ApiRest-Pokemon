const express = require("express");
const favicon = require("serve-favicon");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

let app = express();
const port = 8080;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

sequelize.initDb();

// Routes

// let findAllPokemons = require("./src/routes/findAllPokemons");
// findAllPokemons(app);
require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonsByPk")(app); //Pk -> primary key
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);

// error 404
app.use(({ res }) => {
  let message = "Impossible de trouver la ressource demandée !";
  res.status(404).json({ message });
});

app.listen(port, () => {
  console.log(`Appli démarrée sur localhost:${port}`);
});
