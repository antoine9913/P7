'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    userId: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachement: DataTypes.STRING,
    likes: DataTypes.BOOLEAN 
  }, {
    classMethods: {
      associate: function(models) {
        models.Post.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
          models.Post.hasMany(models.comment);
      }
    }
  });
  return Post;
};