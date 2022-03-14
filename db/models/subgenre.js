'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubGenre = sequelize.define('SubGenre', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    }
  }, {});
  SubGenre.associate = function (models) {
    // associations can be defined here
    SubGenre.belongsToMany(models.User, {
      through: 'favGenre',
      otherKey: 'userId',
      foreignKey: 'subGenreId'
    })
  };
  return SubGenre;
};
