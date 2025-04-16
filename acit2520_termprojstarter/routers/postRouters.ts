import { Router } from "express";
import { addComment, addPost, deletePost, editPost, getPost, getPosts } from "../fake-db";

const router = Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}


router.get("/", (req, res) => {
  const posts = getPosts(10); 
  res.render("posts", { posts, user: req.user });
});


router.get("/show/:postId", (req, res) => {
  const postId = parseInt(req.params.postId);
  const post = getPost(postId);
  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.render("individualPost", { post, user: req.user });
});


router.get("/create", ensureAuthenticated, (req, res) => {
  res.render("createPosts", { user: req.user });
});


router.post("/create", ensureAuthenticated, (req, res) => {
  const { title, link, description, subgroup } = req.body;
  const creator = req.user.id;
  addPost(title, link, creator, description, subgroup);
  res.redirect("/posts");
});


router.get("/edit/:postId", ensureAuthenticated, (req, res) => {
  const postId = parseInt(req.params.postId);
  const post = getPost(postId);
  if (!post || post.creator.id !== req.user.id) {
    return res.status(403).send("Unauthorized or post not found");
  }
  res.render("editPost", { post, user: req.user });
});


router.post("/edit/:postId", ensureAuthenticated, (req, res) => {
  const postId = parseInt(req.params.postId);
  const post = getPost(postId);
  if (!post || post.creator.id !== req.user.id) {
    return res.status(403).send("Unauthorized or post not found");
  }
  const { title, link, description, subgroup } = req.body;
  editPost(postId, { title, link, description, subgroup });
  res.redirect(`/posts/show/${postId}`);
});


router.get("/deleteconfirm/:postId", ensureAuthenticated, (req, res) => {
  const postId = parseInt(req.params.postId);
  const post = getPost(postId);
  if (!post || post.creator.id !== req.user.id) {
    return res.status(403).send("Unauthorized or post not found");
  }
  res.render("deletePost", { post, user: req.user });
});


router.post("/delete/:postId", ensureAuthenticated, (req, res) => {
  const postId = parseInt(req.params.postId);
  const post = getPost(postId);
  if (!post || post.creator.id !== req.user.id) {
    return res.status(403).send("Unauthorized or post not found");
  }
  deletePost(postId);
  res.redirect("/posts");
});


router.post("/comment-create/:postId", ensureAuthenticated, (req, res) => {
  const postId = parseInt(req.params.postId);
  const post = getPost(postId);
  if (!post) {
    return res.status(404).send("Post not found");
  }
  const { description } = req.body;
  const creator = req.user.id;
  addComment(postId, creator, description);
  res.redirect(`/posts/show/${postId}`);
});

export default router;