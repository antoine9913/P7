const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const fs = require("fs");
require("dotenv").config();

REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,20}$/;
REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
exports.register = (req, res) => {
	if (!REGEX_PASSWORD.test(req.body.password)) {
		return res.status(400).json({
			error: "Le mot de passe doit contenir entre 6 et 20 caractères",
		});
	}
	if (!REGEX_EMAIL.test(req.body.email)) {
		return res.status(400).json({
			error: "Le format d'email n'est pas valide",
		});
	}
	db.User.findOne({
		where: { email: req.body.email },
	})
		.then((userFound) => {
			if (!userFound) {
				bcrypt.hash(req.body.password, 10).then((hash) => {
					db.User.create({
						email: req.body.email,
						username: req.body.username,
						avatar: "http://localhost:8080/images/avatar.png",
						bio: "Veuillez compléter votre profil...",
						password: hash,
						isAdmin: false
					})
						.then((user) => {
							res.status(201).json({
								id: user.id,
							});
						})
						.catch((error) => res.status(400).json({ error }));
				});
			} else {
				res.status(409).json({
					error: "Cet utilisateur existe déjà",
				});
			}
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
	db.User.findOne({ where: { email: req.body.email } })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: "Utilisateur non trouvé ! " });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ error: "Mot de passe incorrect !" });
					}

					res.status(200).json({
						userId: user.id,
						isAdmin: user.isAdmin,
						username: user.username,
						token: jwt.sign(
							{
								userId: user.id,
							},
							process.env.JWT_TOKEN,
							{ expiresIn: "24h" }
						),
					});
				})
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.getUserProfile = (req, res) => {
	db.User.findOne({
		attributes: ["username", "email", "bio", "avatar", "isAdmin", "id"],
		where: { id: req.params.id },
	})
		.then((user) => {
			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({ error: "Utilisateur non trouvé" });
			}
		})
		.catch((error) => {
			res.status(500).json({ error: "Impossible de voir le profil" });
		});
};

exports.updateProfile = (req, res) => {
	const id = req.params.id;
	const data = req.file
		? {
				// Si image
				bio: req.body.bio,
				avatar: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: {
				// Sans image
				bio: req.body.bio,
		  };

	db.User.findByPk(id).then((user) => {
		const filename = user.avatar
			? {
					name: user.avatar.split("/images/")[1],
			  }
			: {
					name: user.avatar,
			  };
			  console.log(filename)
		fs.unlink(`images/${filename.name}`, () => {
			db.User.update(data, {
				where: { id: id },
			})
				.then((num) => {
					if ((num = 1)) {
						res.send({
							message: "Votre profil a été mis à jour.",
						});
					} else {
						res.send({
							message: "Nous ne pouvons mettre à jour votre profil.",
						});
					}
				})
				.catch((err) => {
					res.status(500).send({
						message: "Impossible de mettre à jour de votre profil.",
					});
				});
		});
	});
};

exports.deleteProfile = (req, res) => {
	db.User.findOne({
		where: { id: req.params.id },
	})
		.then((userFound) => {
			if (userFound) {
				db.User.findOne({
					attributes: ["isAdmin"],
					where: { id: req.userId },
				})
					.then((userIsAdmin) => {
						// Si c'est le profil de l'utilisateur ou l'admin, on supprime le commentaire
						if (
							req.userId == userFound.id ||
							userIsAdmin.dataValues.isAdmin == true
						) {
							db.User.destroy({
								where: { id: req.params.id },
							})
								.then(() =>
									res.status(201).json({ message: "Compte supprimé" })
								)
								.catch((error) => res.status(404).json({ error }));
						} else {
							// Si ce n'est pas le profil de l'utilisateur ni l'admin qui demande la suppression
							// Status 403 : non autorisé
							res.status(403).json({
								error: "Vous n'êtes pas autorisé à supprimer le compte",
							});
						}
					})
					.catch((error) => res.status(404).json({ error: error }));
			} else {
				res.status(404).json({ error: "Profil non trouvé" });
			}
		})
		.catch((error) =>
			res.status(500).json({ error: "Impossible de supprimer le compte" })
		);
};