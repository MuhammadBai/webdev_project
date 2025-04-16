import { Router, Request, Response } from "express";
import { getPosts, decoratePost } from "../fake-db";

const router = Router();


router.get("/list", (req: Request, res: Response) => {
  const posts = getPosts(); 
  const subs: { [key: string]: number } = {};

  posts.forEach((post) => {
    const key = post.subgroup;
    subs[key] = (subs[key] || 0) + 1;
  });

  const sortedSubs = Object.keys(subs)
    .sort()
    .map((name) => ({
      name,
      count: subs[name],
    }));

  res.render("subs", { subs: sortedSubs, user: req.user });
});

router.get("/show/:subname", (req: Request, res: Response) => {
  const subname = req.params.subname;
  const posts = getPosts(100) 
    .filter((post) => post.subgroup === subname)
    .map(decoratePost);

  res.render("posts", { posts, user: req.user });
});

export default router;
