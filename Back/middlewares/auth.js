const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        // Verification que le token est bien présent
        if (!req.headers.authorization) {
            throw 'Token d\'authentification manquant !';
        }

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);
        const userId = decodedToken.userId;
        const userIsAdmin = decodedToken.isAdmin;

        if (req.body.userId && parseInt(req.body.userId, 10) !== userId) {
            throw 'Identifiant utilisateur invalide';
        } else {
            res.locals.userId = userId;
            res.locals.userIsAdmin = userIsAdmin;
            next();
        }
    } catch (error) {
        return res.status(400).json({ error })
    }
};