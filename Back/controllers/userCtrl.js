const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('../models');

exports.signup = (req, res, next) => {
    // Regexp pour email (au moins 8 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial
    if (!/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(req.body.password)) {
        return res.status(400).json({ error: 'Le mot de passe doit contenir minimum 8 caractères et au minimum une minuscule, une majuscule, un chiffre et un caractère spécial (!@#$%^&*)' })
    }

    // Hashage du mot de pass
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Création et sauvegarde de l'user
            db.User.create({
                email: req.body.email,
                username: req.body.username,
                password: hash,
                picture: req.body.picture,
                isAdmin: 0
            })
                .then(user => {
                    res.status(201).json({
                      userId: user.id,
                      isAdmin: user.isAdmin,
                        token: jwt.sign(
                            {
                                userId: user.id,
                                isAdmin: user.isAdmin,
                            },
                            process.env.JWT_SIGN_SECRET,
                            { expiresIn: '24h' }
                        ),
                    })
                })
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

exports.login = (req, res, next) => {
    db.User.findOne({ where: { email: req.body.email } })
        .then(user => {
            // recherche si l'utilisateur existe déja
            if (!user) {
                return res.status(401).json({ error: 'Informations d\'identification invalides' })
            }

            // comparaison de ce qui est tapé et ce qui est dans la BdD
            bcrypt.compare(req.body.password, user.password)
                .then(isValid => {
                    if (!isValid) {
                        return res.status(401).json({ error: 'Informations d\'identification invalides' })
                    }

                    res.status(200).json({
                      userId: user.id,
                      isAdmin: user.isAdmin,
                        token: jwt.sign(
                            {
                                userId: user.id,
                                isAdmin: user.isAdmin,
                            },
                            process.env.JWT_SIGN_SECRET,
                            { expiresIn: '24h' }
                        ),
                    })
                })
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
};

exports.getCurrentUser = (req, res, next) => {
    db.User.findOne({ where: { id: res.locals.userId } })
        .then(user => {
            return res.status(200).json({
                userId: user.id,
                email: user.email,
                username: user.username,
                picture: user.picture,
                isAdmin: user.isAdmin
            });
        })
        .catch(error => res.status(500).json({ error }))
}

exports.modifyAccount = (req, res, next) => { 
  db.User.findOne({ 
    attributes: ['id', 'picture'],
    where: { id: userId }})
      .then(user => {
          db.User.update({ 
            picture: (picture ? picture : user.picture)})         
      .then(() => res.status(201).json({ message: 'Compte modifié !' }))
      .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.deleteCurrentUser = (req, res, next) => {
  db.User.destroy({ where: { id: res.locals.userId } })
      .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
      .catch(error => res.status(404).json({ error }))
}