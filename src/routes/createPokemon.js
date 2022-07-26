const { ValidationError, UniqueConstraintError } = require("sequelize");
const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/pokemons", auth, (req, res) => {
    Pokemon.create(req.body)
      .then((pokemon) => {
        let message = `Le pokémon ${req.body.name} a bien été crée.`;
        res.json({ message, data: pokemon });
      })
      .catch((err) => {
        if (err instanceof ValidationError) {
          return res.status(400).json({ message: err.message, data: err });
        }
        if (err instanceof UniqueConstraintError) {
          return res.status(400).json({ message: err.message, data: err });
        }
        let message =
          "Le pokemon n'a pas pu être ajouté, veuillez réessayer plus tard.";
        res.status(500).json({ message, data: err });
      });
  });
};
