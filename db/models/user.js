'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY
    }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Review, { foreignKey: 'userId' })
    User.hasMany(models.List, { foreignKey: 'userId' })
    User.belongsToMany(models.SubGenre, {
      through: 'favGenre',
      otherKey: 'subGenreId',
      foreignKey: 'userId'
    })
  };
  return User;
};
