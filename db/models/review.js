'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
    moviesId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Movies' }
    }
  }, {});
  Review.associate = function (models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: 'UserId' })
    Review.belongsTo(models.Movie, { foreignKey: 'moviesId' })
  };
  return Review;
};
