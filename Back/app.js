const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

require("dotenv").config();
const db = require("./models");
//Connexion à la base de données
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connecté à la base de données avec succès");
  })
  .catch((error) => {
    console.log("Impossible de se connecter à la base de données : ", error);
  });

//En-têtes HTTP
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;
