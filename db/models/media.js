"use strict";
module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define(
    "Media",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(150),
      },
      key: {
        allowNull: false,
        type: DataTypes.STRING(150),
      },
      siteId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Sites" },
      },
      typeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Types" },
      },
      movieId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Movies" },
      },
    },
    {}
  );
  Media.associate = function (models) {
    // associations can be defined here
    Media.belongsTo(models.Movie, { foreignKey: "movieId" });
    Media.belongsTo(models.Site, { foreignKey: "siteId" });
    Media.belongsTo(models.Type, { foreignKey: "typeId" });
  };
  return Media;
};
