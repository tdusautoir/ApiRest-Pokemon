const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/pokemons/:id", auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          let message =
            "Le pokemon demandé n'existe pas. Réessayer avec un autre identifant";
          return res.status(400).json({ message });
        }
        let message = "Un pokémon a bien été trouvé.";
        res.json({ message, data: pokemon });
      })
      .catch((err) => {
        let message =
          "Le pokemon n'a pas pu être récupéré, veuillez réessayer plus tard.";
        res.status(500).json({ message, data: err });
      });
  });
};
