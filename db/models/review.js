"use strict";
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
      movieId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Movies" },
      },
    },
    {}
  );
  Review.associate = function (models) {
    // associations can be defined here
    Review.belongsTo(models.Movie, { foreignKey: "movieId" });
    Review.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Review;
};
