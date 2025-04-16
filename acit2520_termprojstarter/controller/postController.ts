import "../types"; 
import PostModel from "../models/Post";
import SubModel from "../models/Sub";
import { RequestHandler } from "express";

export const createPost: RequestHandler = (req, res) => {
  const { title, description, link, sub } = req.body;
  const user = req.user?.username || "anonymous";

  if (!description && !link) {
    return res.status(400).send("Must have either a description or a link.");
  }

  let subRecord = SubModel.findOne({ name: sub });
  if (!subRecord) {
    subRecord = SubModel.create({ name: sub });
  }

  const newPost = PostModel.create({
    id: Date.now(),
    title,
    description,
    link,
    sub: subRecord.name,
    user,
    createdAt: new Date(),
  });

  res.redirect(`/posts/show/${newPost.id}`);
};

export const renderCreateForm: RequestHandler = (req, res) => {
  const subs = SubModel.getAll();
  res.render("createPosts", { subs });
};
