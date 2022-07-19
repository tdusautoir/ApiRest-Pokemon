const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/pokemons", (req, res) => {
    Pokemon.create(req.body)
      .then((pokemon) => {
        let message = `Le pokémon ${req.body.name} a bien été crée.`;
        res.json({ message, data: pokemon });
      })
      .catch((err) => {
        let message =
          "Le pokemon n'a pas pu être ajouté, veuillez réessayer plus tard.";
        res.status(500).json({ message, data: err });
      });
  });
};
