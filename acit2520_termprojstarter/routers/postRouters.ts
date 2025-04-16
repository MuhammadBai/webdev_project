import express, { Request, Response, Router } from "express";
const router: Router = express.Router();

import { ensureAuthenticated } from "../middleware/checkAuth";
import PostModel from "../models/Post";
import SubModel from "../models/Sub";
import { createPost, renderCreateForm } from "../controller/postController";

// Show recent posts
router.get("/", async (req: Request, res: Response) => {
  const posts = await PostModel.getAll();
  const user = req.user;
  res.render("posts", { posts, user });
});

// Show form to create a post
router.get("/create", ensureAuthenticated, renderCreateForm);

// Handle creation of a new post
router.post("/create", ensureAuthenticated, createPost);

// Show a single post
router.get("/show/:postid", async (req: Request, res: Response) => {
  const post = await PostModel.findById(parseInt(req.params.postid));
  if (!post) return res.status(404).send("Post not found");
  res.render("individualPost", { post, user: req.user });
});

// Show form to edit a post
router.get("/edit/:postid", ensureAuthenticated, async (req: Request, res: Response) => {
  const post = await PostModel.findById(parseInt(req.params.postid));
  if (!post) return res.status(404).send("Post not found");
  if (post.user !== req.user?.username) return res.status(403).send("Forbidden");
  res.render("editPost", { post });
});

// Handle editing a post
router.post("/edit/:postid", ensureAuthenticated, async (req: Request, res: Response) => {
  const post = await PostModel.findById(parseInt(req.params.postid));
  if (!post) return res.status(404).send("Post not found");
  if (post.user !== req.user?.username) return res.status(403).send("Forbidden");

  const { title, description, link } = req.body;
  post.title = title || post.title;
  post.description = description || post.description;
  post.link = link || post.link;

  res.redirect(`/posts/show/${post.id}`);
});

// Confirm deletion
router.get("/deleteconfirm/:postid", ensureAuthenticated, async (req: Request, res: Response) => {
  const post = await PostModel.findById(parseInt(req.params.postid));
  if (!post) return res.status(404).send("Post not found");
  if (post.user !== req.user?.username) return res.status(403).send("Forbidden");

  res.render("deletePost", { post });
});

// Handle deleting a post
router.post("/delete/:postid", ensureAuthenticated, async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postid);
  const post = await PostModel.findById(postId);
  if (!post) return res.status(404).send("Post not found");
  if (post.user !== req.user?.username) return res.status(403).send("Forbidden");

  const posts = await PostModel.getAll();
  const index = posts.findIndex((p) => p.id === postId);
  if (index > -1) posts.splice(index, 1);

  res.redirect("/");
});

// Handle creating a comment
router.post("/comment-create/:postid", ensureAuthenticated, async (req: Request, res: Response) => {
  const post = await PostModel.findById(parseInt(req.params.postid));
  if (!post) return res.status(404).send("Post not found");

  const { description } = req.body;
  if (!description) return res.status(400).send("Comment cannot be empty");

  if (!post.comments) post.comments = [];

  post.comments.push({
    id: Date.now(),
    creator: req.user!.username,
    description,
    timestamp: new Date(),
  });

  res.redirect(`/posts/show/${post.id}`);
});

export default router;
