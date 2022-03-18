const express = require('express')

const app = express();

app.get('/', function (req, res) {
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1>Bienvenue sur mon serveur</h1>')
});

module.exports = app;