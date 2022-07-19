const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          let message =
            "Le pokemon demandé n'existe pas. Réessayer avec un autre identifant";
          return res.status(400).json({ message });
        }
        const pokemonDeleted = pokemon;
        return Pokemon.destroy({
          where: { id: pokemon.id },
        }).then(() => {
          let message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`;
          res.json({ message, data: pokemonDeleted });
        });
      })
      .catch((err) => {
        let message =
          "Le pokemon n'a pas pu être supprimé, veuillez réessayer plus tard.";
        res.status(500).json({ message, data: err });
      });
  });
};
