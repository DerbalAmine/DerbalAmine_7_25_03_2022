const bcrypt = require("bcrypt"); // hash du mdp;
const jwt = require("jsonwebtoken"); //importation du package jsonwebtoken
const dotenv = require("dotenv"); // importation pour l'utilisation des variables d'environnements
dotenv.config;
const mysqlconnection = require("../db/db.mysql"); //importation mysqlconnection

//Inscription
exports.signup = (req, res) => {
  //Verification email disponible
  mysqlconnection.query(
    `SELECT * FROM user WHERE email='${req.body.email}'`,
    (error, results) => {
      //Si email deja utilisé
      if (results.length > 0) {
        res.json({ message: "Email non disponible." });
        //Si email disponible
      } else {
        //Cryptage du MDP
        bcrypt
          .hash(req.body.password, 10)
          .then((cryptedPassword) => {
            //Ajout à la BDD
            mysqlconnection.query(
              `INSERT INTO user VALUES (NULL, '${req.body.username}', '${req.body.email}', '${cryptedPassword}')`,
              (error, results) => {
                if (error) {
                  console.log(error);
                  res.json({ error });
                } else {
                  console.log("-->results");
                  console.log(results);
                  res.json({ message: "Utilisateur crée !" });
                }
              }
            );
          })
          .catch((error) =>
            res.status(500).json({
              error,
            })
          );
      }
    }
  );
};
//Connexion
exports.login = (req, res) => {
  //Recherche de l'utilisateur dans la BDD
  console.log(req.body.email);
  mysqlconnection.query(
    `SELECT * FROM user WHERE email='${req.body.email}'`,
    (error, result, rows) => {
      //Si utilisateur trouvé :
      if (result.length > 0) {
        //Verification du MDP
        bcrypt.compare(req.body.password, result[0].password).then((valid) => {
          //Si MDP est invalide erreur
          if (!valid) {
            res.json({ message: "Mot de passe incorrect." });
            //Si MDP valide création d'un token
          } else {
            res.json({
              id: result[0].id,
              username: result[0].username,
              email: result[0].email,
              token: jwt.sign(
                {
                  userId: result[0].id,
                },
                "RANDOM_TOKEN_SECRET",
                {
                  expiresIn: "24h",
                }
              ),
            });
          }
        });
      } else {
        res.status(404).json({
          message: "Utilisateur inconnu.",
        });
      }
    }
  );
};
// Delete User
exports.deleteUser = (req, res) => {
  mysqlconnection.query(
    `DELETE FROM users WHERE id = ${req.params.id}`,
    (error, result) => {
      if (error) {
        return res.json({ error });
      }
      return res.status(200).json(result);
    }
  );
};
