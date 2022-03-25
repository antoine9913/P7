// Imports
const models    = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils')

// Constants

const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT   = 50;

// Routes

module.exports = {
    createPost: function(req, res) {
        // Getting auth header
        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);

        // Params
        var title   = req.body.title;
        var content = req.body.content;
    
        if (title == null || content == null) {
          return res.status(400).json({ 'error': 'missing parameters' });
        }
    
        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
          return res.status(400).json({ 'error': 'invalid parameters' });
        }
    
        asyncLib.waterfall([
          function(done) {
            models.User.findOne({
              where: { id: userId }
            })
            .then(function(userFound) {
              done(null, userFound);
            })
            .catch(function(err) {
              return res.status(500).json({ 'error': 'unable to verify user' });
            });
          },
          function(userFound, done) {
            if(userFound) {
              models.Post.create({
                userId : userFound.id,
                title  : title,
                content: content,
                likes  : 0,
              })
              .then(function(newPost) {
                done(newPost);
              });
            } else {
              res.status(404).json({ 'error': 'user not found' });
            }
          },
        ], function(newPost) {
          if (newPost) {
            return res.status(201).json(newPost);
          } else {
            return res.status(500).json({ 'error': 'cannot post message' });
          }
        });
      },
    listPost: function(req, res,){
        models.Post.findAll({
            order: [
                [req.query.sort ?? 'id', req.query.order ?? 'ASC']
            ],
            include: (req.query.include === 'user' ? [{ model: models.User, attributes: ['username'] }] : '')
        })
            .then(posts => res.status(200).json(posts))
            .catch(error => res.status(500).json({ error }))
    }
}