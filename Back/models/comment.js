'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    userId: DataTypes.STRING,
    postId: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.Comment.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        }),
        models.Comment.belongsTo(models.Post, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Comment;
};