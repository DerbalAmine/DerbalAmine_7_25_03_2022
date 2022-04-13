const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

const postCtrl = require("../controllers/post");

//routes pour les posts
router.post("/", auth, multer, postCtrl.createPost);
router.get("/", auth, multer, postCtrl.getAllPost);
router.get("/all/:id", auth, postCtrl.getUserPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.delete("/:id", auth, postCtrl.deletePost);
router.put("/:id", auth, multer, postCtrl.modifyPost);

//routes pour les commentaires
router.post("/:id/comment", auth, postCtrl.newComment);
router.get("/:id/comments", auth, postCtrl.getAllComments);
router.delete("/comment/:id", auth, postCtrl.deleteComment);

module.exports = router;
