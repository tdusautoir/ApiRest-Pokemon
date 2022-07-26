const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          let message = "L'utilisateur demandé n'existe pas.";
          return res.status(404).json({ message });
        }

        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              let message = "Le mot de passe est incorrect.";
              return res.status(401).json({ message });
            }
            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user });
          });
      })
      .catch((err) => {
        let message = "La connexion a échoué. Veuillez reessayer plus tard.";
        return res.json({ message, data: err });
      });
  });
};
