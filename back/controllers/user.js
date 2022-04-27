const bcrypt = require("bcrypt"); // hash du mdp;
const jwt = require("jsonwebtoken"); //importation du package jsonwebtoken
const dotenv = require("dotenv"); // importation pour l'utilisation des variables d'environnements
dotenv.config();
const mysqlconnection = require("../db/db.mysql"); //importation mysqlconnection

//Inscription
exports.signup = (req, res) => {
  let isAdmin = false;
  if (req.body.email == "admin@gm.com") {
    isAdmin = true;
  }
  //chercher dans la base de donnee si email disponible
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
          .then((hash) => {
            console.log(hash);
            //donnees que je vais envoyer
            const user = {
              email: req.body.email,
              password: hash,
              username: req.body.username,
              isAdmin: isAdmin,
              isActif: false,
            };
            //Ajout à la BDD
            mysqlconnection.query(
              "INSERT INTO user SET ?",
              user,
              (error, results) => {
                if (error) {
                  console.log(error);
                  res.json({ error });
                } else {
                  console.log("-->results");
                  console.log(results);
                  res.json({
                    message:
                      "Votre compte a bien été créé ! Vous pouvez maintenant vous connecter.",
                  });
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
    (error, result) => {
      //Si utilisateur trouvé :
      if (result.length > 0) {
        //Verification du MDP
        bcrypt.compare(req.body.password, result[0].password).then((valid) => {
          //Si MDP est invalide erreur
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Mot de passe incorrect !" });
            //Si MDP valide création d'un token
          } else {
            res.json({
              id: result[0].id,
              username: result[0].username,
              message: "utilisateur trouve",
              email: result[0].email,
              isAdmin: result[0].isAdmin,
              isActif: result[0].isActif,
              token: jwt.sign(
                { userId: result[0].id },
                "RANDOM_TOKEN_SECRET", //nous utilisons une chaîne secrète de développement temporaire RANDOM_SECRET_KEY pour encoder notre token (à remplacer par une chaîne aléatoire beaucoup plus longue pour la production)
                { expiresIn: "24h" }
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
exports.deleteUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, config.token);
  if (decodedToken.role === "admin" && decodedToken.userId !== req.params.id) {
    mysqlconnection.query(
      `DELETE FROM user WHERE id = ${req.params.id}`,
      (error, results, fields) => {
        if (error) {
          return res.status(400).json(error);
        }
        return res
          .status(200)
          .json({ message: "Le compte a bien été supprimé définitivement!" });
      }
    );
  }
};
