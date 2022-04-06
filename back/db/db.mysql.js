//importer le package pour utliser les variables d'environnement
const dotenv = require("dotenv");
dotenv.config;

// importer mysql
const mysql = require("mysql");
console.log(mysql);

//parametres de connexion a la base de donnees
const mysqlconnection = mysql.createConnection({
  host: "localhost",
  database: "groupomania",
  user: "root",
  password: "",
});
//console.log(mysqlconnection);
//console.log("--->mysqlconnection");

// la connexion a la base de donnees

mysqlconnection.connect((err) => {
  if (err) {
    console.log(`error connecting: $(err)`);
  } else {
    console.log("Connection à la base de donnée groupomania réussie");
    console.log(`connected ad id ${mysqlconnection.threadId}`);
  }
});

module.exports = mysqlconnection;
