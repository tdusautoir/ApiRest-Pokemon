const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    if (req.query.name) {
      let req_name = req.query.name;
      let req_limit = parseInt(req.query.limit) || 5;

      if (req_name.length < 2) {
        let message = "Votre recherche doit au moins contenir 2 caractères";
        return res.status(400).json({ message });
      }

      return Pokemon.findAndCountAll({
        //get the total number and the actual result
        where: {
          name: { [Op.like]: `%${req_name}%` },
        },
        order: ["name"],
        limit: req_limit,
      }).then(({ count, rows }) => {
        let message = `Il y a ${count} pokemons qui correspondent à votre recherche : ${req_name}`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({ order: ["name"] })
        .then((pokemons) => {
          let message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons });
        })
        .catch((err) => {
          let message =
            "La liste des pokémons n'a pas pu être récupérée. Veuillez réessayer.";
          res.status(500).json({ message, data: err });
        });
    }
  });
};
