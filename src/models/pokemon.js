const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom est déjà pris.",
        },
        validate: {
          notEmpty: {
            msg: "Le nom de votre pokemon ne doit pas être vide.",
          },
          notNull: { msg: "Le nom est requis." },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de vies",
          },
          notNull: { msg: "Les points de vies sont requis." },
        },
        min: {
          args: [0],
          msg: "Les points de vies doivent être supérieurs ou égales à zero.",
        },
        max: {
          args: [999],
          msg: "Les points de vies doivent être inférieurs ou égales à 999.",
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de dégats",
          },
          notNull: { msg: "Les points de dégats sont requis." },
          min: {
            args: [0],
            msg: "Les points de dégats doivent être supérieurs ou égales à zero.",
          },
          max: {
            args: [99],
            msg: "Les points de dégats doivent être inférieurs ou égales à 99.",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "Utilisez une url valide pour l'image.",
          },
          notNull: { msg: "L'image est requise." },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error("Un pokemon doit au moins avoir un type.");
            }
            if (value.split(",").length > 3) {
              throw new Error("Un pokemon ne peut pas avoir plus de 3 types.");
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type du pokemon doit appartenir à la liste suivante : ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
