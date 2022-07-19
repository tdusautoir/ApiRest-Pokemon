let express = require("express");
let favicon = require("serve-favicon");
let morgan = require("morgan");
let bodyParser = require("body-parser");
let sequelize = require("./src/db/sequelize");

let app = express();
const port = 8080;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

sequelize.initDb();

// Routes
require("./src/routes/findAllPokemons")(app);

app.listen(port, () => {
  console.log(`Appli démarrée sur localhost:${port}`);
});
