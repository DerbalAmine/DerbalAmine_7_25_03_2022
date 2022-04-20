const express = require("express");
const path = require("path");
const helmet = require("helmet");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
require("dotenv").config();

// Création de l'application express
const app = express();

//const mysql = require("./db/db.mysql");

// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
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
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next();
});
console.log(userRoutes);

//bodyParser etant deprecated, on utilise directement la méthode express.json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // utilisation du module 'helmet' pour la sécurité en protégeant l'application des failles XSS ciblant les cookies
app.use("/images", express.static(path.join(__dirname, "images"))); // Middleware permettant de charger les fichiers qui sont dans le repertoire images
app.use("/api/post", postRoutes);
app.use("/api", userRoutes);

module.exports = app;
