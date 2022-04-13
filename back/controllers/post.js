const mysqlconnection = require("../db/db.mysql");

// New comment
exports.newComment = (req, res, next) => {
  mysqlconnection.query(
    `INSERT INTO comments VALUES ('${req.body.id_user}', '${req.body.texte}', '${req.params.id}')`,
    (error, result) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.status(200).json(result);
    }
  );
};
// Get all comments
exports.getAllComments = (req, res, next) => {
  mysqlconnection.query(
    `SELECT * FROM comments INNER JOIN user ON user.id = comments.id_user WHERE comments.id_post = ${req.params.id} `, // permet de lier plusieurs tables entre elles par une colonne commune grace a 'ON' on lie les collones
    (error, result) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.status(200).json(result);
    }
  );
};
//Delete comment
exports.deleteComment = (req, res) => {
  mysqlconnection.query(
    `DELETE FROM comments WHERE comments.id = ${req.params.id}`,
    (error, result) => {
      if (error) {
        return res.status(400).json({ error });
      } else {
        console.log(result);
        return res
          .status(200)
          .json({ message: "Votre commentaire est supprimé ! " });
      }
    }
  );
};

// All post
exports.getAllPost = (req, res, next) => {
  mysqlconnection.query("SELECT * FROM posts", (error, result) => {
    if (error) {
      return res.status(400).json({
        message: "erreur!",
      });
    }
    return res.status(200).json(result);
  });
};
// NewPost
exports.createPost = (req, res, next) => {
  let imageUrl = "";
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  } else {
    imageUrl = req.body.media;
  }

  mysqlconnection.query(
    `INSERT INTO posts VALUES (NULL, '${req.body.id_user}', '${req.body.titre}', '${req.body.texte}', 
      '${imageUrl}')`,
    (error, result) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.status(201).json({
        message: "Votre post à été publié !",
      });
    }
  );
};
// OnePost
exports.getOnePost = (req, res, next) => {
  mysqlconnection.query(
    `SELECT * FROM posts INNER JOIN user ON posts.id_user = user.id WHERE id_post = ${req.params.id}`,
    (error, result) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.status(200).json(result);
    }
  );
};
// Delete OnePost
exports.deletePost = (req, res, next) => {
  mysqlconnection.query(
    `DELETE FROM posts WHERE id_post = ${req.params.id}`,
    (error, result) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.status(200).json(result);
    }
  );
};
// Modify OnePost
exports.modifyPost = (req, res, next) => {
  mysqlconnection.query(
    `UPDATE posts SET title = '${req.body.title}', content = '${req.body.content}' WHERE posts.id = ${req.params.id}`,
    (error, result) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.status(200).json(result);
    }
  );
};
// Get User's Posts
exports.getUserPosts = (req, res, next) => {
  mysqlconnection.query(
    `SELECT * FROM posts WHERE posts.userId = ${req.params.id}`,
    (error, result) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.status(200).json(result);
    }
  );
};
