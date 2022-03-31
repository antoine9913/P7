const jwt = require("jsonwebtoken"); // Plug-in sécurité connexion
require("dotenv").config();
module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]; //Récupère le token provenant de la requête
		const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
		const userId = decodedToken.userId; //Extrait l'ID utilisateur du token
		if (req.body.userId && req.body.userId !== userId) {
			//Si le userId ne correspond pas à celui du corps de la requête
			throw "Identifiant utilisateur invalide";
		} else {
			req.userId = userId;
			next();
		}
	} catch (error) {
		res.status(401).json({ error: new Error("Requête invalide !") });
	}
};