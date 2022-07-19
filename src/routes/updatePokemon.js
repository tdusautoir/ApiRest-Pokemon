const { Pokemon } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports = (app) => {
  app.put("/api/pokemons/:id", (req, res) => {
    const id = req.params.id;
    Pokemon.update(req.body, {
      where: { id: id },
    })
      .then(() => {
        Pokemon.findByPk(id)
          .then((pokemon) => {
            if (pokemon === null) {
              let message = "Le pokemon demandé n'existe pas";
              return res.status(404).json({ message });
            }
            let message = `Le pokémon ${pokemon.name} a bien été modifié.`;
            res.json({ message, data: pokemon });
          })
          .catch((err) => {
            let message =
              "Le pokemon n'a pas pu être modifié, veuillez réessayer plus tard.";
            res.status(500).json({ message, data: err });
          });
      })
      .catch((err) => {
        if (err instanceof ValidationError) {
          return res.status(400).json({ message: err.message, data: err });
        }
        if (err instanceof UniqueConstraintError) {
          return res.status(400).json({ message: err.message, data: err });
        }
        let message =
          "Le pokemon n'a pas pu être modifié, veuillez réessayer plus tard.";
        res.status(500).json({ message, data: err });
      });
  });
};
