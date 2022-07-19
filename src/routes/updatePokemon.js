const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.put("/api/pokemons/:id", (req, res) => {
    const id = req.params.id;
    Pokemon.update(req.body, {
      where: { id: id },
    })
      .then(() => {
        return Pokemon.findByPk(id).then((pokemon) => {
          if (pokemon === null) {
            let message = "Le pokemon demandé n'existe pas";
            return res.status(404).json({ message });
          }
          let message = `Le pokémon ${pokemon.name} a bien été modifié.`;
          res.json({ message, data: pokemon });
        });
      })
      .catch((err) => {
        let message =
          "Le pokemon n'a pas pu être modifié, veuillez réessayer plus tard.";
        res.status(500).json({ message, data: err });
      });
  });
};
