const jwt = require('jsonwebtoken');

const dotenv = require("dotenv").config();

module.exports = {
    generateTokenForUser: function(userData) {
      return jwt.sign({
        userId: userData.id,
        isAdmin: userData.isAdmin
      },
      process.env.JWT_SIGN_SECRET,
      {
        expiresIn: '1h'
      })
    },
}