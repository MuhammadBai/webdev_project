import { Router, Request, Response } from "express";
import { ensureAuthenticated } from "../middleware/checkAuth";
import { getPosts, getPost, addPost } from "../fake-db";


declare global {
  namespace Express {
    interface User {
      id: number;
      uname: string;
      password: string;
    }
  }
}

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const posts = getPosts(20);
  res.render("posts", { posts, user: req.user });
});

router.get("/create", ensureAuthenticated, (req: Request, res: Response) => {
  res.render("createPosts", { user: req.user });
});

router.post("/create", ensureAuthenticated, (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title || !req.user) {
    return void res.redirect("/posts/create");
  }

  const newPost = addPost(title, "", req.user.id, "", "");
  res.redirect(`/posts/show/${newPost.id}`);
});

router.get("/show/:postid", (req: Request<{ postid: string }>, res: Response) => {
  const postId = Number(req.params.postid);
  const post = getPost(postId);
  
  if (!post) {
    res.status(404).send("Not found");
    return;
  }
  
  res.render("individualPost", { post, user: req.user });
});

export default router;