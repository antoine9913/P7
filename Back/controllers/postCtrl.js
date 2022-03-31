const db = require("../models");
const fs = require("fs");

exports.getAllPosts = (req, res) => {
	db.Post.findAll({
		include: [
			{
				model: db.User,
				attributes: ["username", "avatar"],
			},
			{
				model: db.Comment,
				required: false,
				attributes: ["content", "id"],
				include: [
					{
						model: db.User,
						attributes: ["username", "avatar", "id"],
					},
				],
			},
			{
				model: db.Like,
				required: false,
			},
		],
		order: [["createdAt", "DESC"]],
	})
		.then((posts) => res.status(200).json(posts))
		.catch((error) => res.status(500).json({ error }));
};

exports.getOnePost = (req, res) => {
	db.Post.findOne({
		where: { id: req.params.id },
		include: [
			{
				model: db.User,
				attributes: ["id", "username", "avatar"],
			},
			{
				model: db.Comment,
				required: false,
				attributes: ["id", "content", "createdAt"],
				include: [
					{
						model: db.User,
						attributes: ["username", "avatar", "id"],
					},
				],
				order: [["createdAt", "DESC"]],
			},
		],
	})
		.then((post) => {
			if (!post) {
				return res.status(400).json({ error: "post non disponible !" });
			}
			res.status(200).json(post);
		})
		.catch((error) => {
			res.status(400).json({ error });
		});
};

exports.create = (req, res) => {
	db.User.findOne({
		where: { id: req.userId },
	})
		.then((user) => {
			if (user !== null) {
				let attachment;
				if (req.file != undefined) {
					attachment = `${req.protocol}://${req.get("host")}/images/${
						req.file.filename
					}`;
				} else {
					attachment == null;
				}
				if (req.body.content == "" && req.file == undefined) {
					res.status(400).json({ error: "Il n'y a aucun contenu à ajouter !" });
				} else {
					db.Post.create({
						title: req.body.title,
						content: req.body.content,
						attachment: attachment,
						UserId: user.id,
					})
						.then((newpost) => {
							res.status(201).json(newpost);
						})
						.catch((err) => {
							res.status(500).json(err);
						});
				}
			} else {
				res.status(400).json();
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: "erreur serveur" });
		});
};

//Modification message
exports.update = (req, res) => {
	const id = req.params.id;

	const data = req.file
		? {
				title: req.body.title,
				content: req.body.content,
				userId: req.body.userId,
				attachment: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: {
				title: req.body.title,
				content: req.body.content,
				userId: req.body.userId,
		  };

	db.Post.findByPk(id).then((post) => {
		const filename = post.attachment
			? {
					name: post.attachment.split("3000/")[1],
			  }
			: {
					name: post.attachment,
			  };
		fs.unlink(`images/${filename.name}`, () => {
			db.Post.update(data, {
				where: { id: id },
			})
				.then((num) => {
					if (num == 1) {
						res.send({
							message: "Le post a été mis à jour.",
						});
					} else {
						res.send({
							message: "Erreur lors de la mise à jour de ce post",
						});
					}
				})
				.catch((err) => {
					res.status(500).send({
						message: "Impossible de mettre à jour ce post",
					});
				});
		});
	});
};

exports.delete = (req, res) => {
	db.Post.findOne({
		where: { id: req.params.id },
	})
		.then((postFound) => {
			if (postFound) {
				db.User.findOne({
					attributes: ["isAdmin"],
					where: { id: req.userId },
				})
					.then((userIsAdmin) => {
						// Si l'utilisateur est le créateur OU admin dans la db, on supprime le message
						if (
							req.userId == postFound.UserId ||
							userIsAdmin.dataValues.isAdmin == true
						) {
							db.Post.findOne({
								where: { id: req.params.id },
							})
								.then((post) => {
									if (post.attachment) {
										const filename = post.attachment.split("/images/")[1];
										fs.unlink(`images/${filename}`, () => {
											db.Post.destroy({
												where: { id: post.id },
											})
												.then(() => res.end())
												.catch((err) => res.status(500).json(err));
										});
									} else {
										db.Post.destroy({
											where: { id: post.id },
										})
											.then(() => res.end())
											.catch((err) => res.status(500).json(err));
									}
								})
								.then(() =>
									res.status(201).json({ message: "Post supprimé" })
								)
								.catch((error) => res.status(404).json({ error }));
						} else {
							// Si l'utilisateur n'est pas le créateur ni admin
							// Status 403 : non autorisé
							res.status(403).json({
								error: "Vous n'êtes pas autorisé à supprimer le post",
							});
						}
					})
					.catch((error) =>
						res.status(500).json({
							error: "Impossible de communiquer avec la base de données",
						})
					);
			} else {
				res.status(404).json({ error: "Post non trouvé" });
			}
		})
		.catch((error) =>
			res.status(500).json({ error: "Impossible de supprimer le post" })
		);
};

// Ajouter un like
exports.addLike = (req, res) => {
	const like = {
		PostId: req.body.PostId,
		UserId: req.userId,
	};
	db.Like.create(like)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.post || "Impossible de liker cet article.",
			});
		});
};

// Récupérer les likes d'un message
exports.getAllLikes = (req, res) => {
	db.Like.findAll({ where: { PostId: req.params.id } })
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((error) => res.status(500).json({ error }));
};

// Ajouter un dislike
exports.removeLike = (req, res) => {
	db.Like.findOne({ where: { UserId: req.userId, PostId: req.params.id } })
		.then((like) => {
			like
				.destroy()
				.then(() => res.status(200).json({ message: "like annulé !" }))
				.catch((error) => {
					console.log("2", error);
					res.status(404).json({ error });
				});
		})

		.catch((error) => {
			console.log("1", error);
			res.status(500).json({ error });
		});
};