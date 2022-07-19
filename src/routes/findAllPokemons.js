const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    Pokemon.findAll()
      .then((pokemons) => {
        let message = "La liste des pokémons a bien été récupérée.";
        res.json({ message, data: pokemons });
      })
      .catch((err) => {
        let message =
          "La liste des pokémons n'a pas pu être récupérée. Veuillez réessayer.";
        res.status(500).json({ message, data: err });
      });
  });
};
