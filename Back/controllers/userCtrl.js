// Imports
const bcrypt    = require('bcrypt');
const jwtUtils  = require('../utils/jwt.utils');
const models    = require('../models');
const asyncLib = require('async');

// Constants
// const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const PASSWORD_REGEX = /^[a-zA-Z]\w{3,14}$/;


// Routes
module.exports = {
    signup: function(req, res) {
      
      // Params
      const email    = req.body.email;
      const username = req.body.username;
      const password = req.body.password;
      const picture  = req.body.picture;
  
      if (email == null || username == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
      }

      asyncLib.waterfall([
        function(done) {
          models.User.findOne({
            attributes: ['email'],
            where: { email: email }
          })
          .then(function(userFound) {
            done(null, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
        },
        function(userFound, done) {
          if (!userFound) {
            bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
              done(null, userFound, bcryptedPassword);
            });
          } else {
            return res.status(409).json({ 'error': 'user already exist' });
          }
        },
        function(userFound, bcryptedPassword, done) {
          var newUser = models.User.create({
            email: email,
            username: username,
            password: bcryptedPassword,
            picture: picture,
            isAdmin: 0
          })
          .then(function(newUser) {
            done(newUser);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'cannot add user' });
          });
        }
      ], function(newUser) {
        if (newUser) {
          return res.status(201).json({
            'userId': newUser.id
          });
        } else {
          return res.status(500).json({ 'error': 'cannot add user' });
        }
      });
    },
login: function (req, res) {
  
      // Params
      const email    = req.body.email;
      const password = req.body.password;
  
      if (email == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
      }
      asyncLib.waterfall([
        function(done) {
          models.User.findOne({
            where: { email: email }
          })
          .then(function(userFound) {
            done(null, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
        },
        function(userFound, done) {
          if (userFound) {
            bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
              done(null, userFound, resBycrypt);
            });
          } else {
            return res.status(404).json({ 'error': 'user not exist in DB' });
          }
        },
        function(userFound, resBycrypt, done) {
          if(resBycrypt) {
            done(userFound);
          } else {
            return res.status(403).json({ 'error': 'invalid password' });
          }
        }
      ], function(userFound) {
        if (userFound) {
          return res.status(201).json({
            'userId': userFound.id,
            'token': jwtUtils.generateTokenForUser(userFound)
          });
        } else {
          return res.status(500).json({ 'error': 'cannot log on user' });
        }
      });
    },
  }