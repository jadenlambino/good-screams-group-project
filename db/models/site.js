"use strict";
module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define(
    "Site",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    {}
  );
  Site.associate = function (models) {
    // associations can be defined here
    Site.hasMany(models.Media, { foreignKey: "siteId" });
  };
  return Site;
};
