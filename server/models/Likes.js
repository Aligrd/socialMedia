const LikeModel = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes");

  return Likes;
};

module.exports = LikeModel;
