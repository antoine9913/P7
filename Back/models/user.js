'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    picture: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN 
  }, {
    classMethods: {
      associate: function(models) {
        models.User.hasMany(models.Post);
        models.User.hasMany(models.comment);
      }
    }
  });
  return User;
};