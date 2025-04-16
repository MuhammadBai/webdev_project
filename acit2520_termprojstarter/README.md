# ACIT 2520 Term Project – Post Creation and Display

---

## Features I Implemented

### Post Creation

- **GET /posts/create**
  - Renders a form where logged-in users can submit a new post.
  - Users must provide either a description or a link (or both).
  - Subgroups are selected from a dropdown — or created automatically if the name is new.

- **POST /posts/create**
  - Handles form submission.
  - Performs validation and associates the post with the current user.
  - Saves the post and redirects to the post's dedicated view page.

---

### Post Display

- **GET /posts/show/:postid**
  - Displays an individual post with:
    - Title, link, description
    - Subgroup name
    - Creation date
    - Creator’s username
  - Also includes a list of comments and a comment form (if the user is logged in).

---

### Home Page Posts

- **GET /** (root route)
  - Displays the 20 most recent posts in descending order.
  - Each post includes its title, link, subgroup, and creator.

---

### Post Editing & Deletion

- **GET /posts/edit/:postid** and **POST /posts/edit/:postid**
  - Only the post's creator can edit.
  - Edits the title, description, or link of a post.

- **GET /posts/deleteconfirm/:postid**
  - Displays a confirmation page before deletion.

- **POST /posts/delete/:postid**
  - Deletes the post if the logged-in user is the creator.

---

### Commenting

- Logged-in users can submit comments under any post.
- Comments are stored along with the username and timestamp.
- Anonymous users are redirected to log in before commenting.

---

## Technologies Used

- **Node.js** + **Express**
- **TypeScript**
- **EJS** templating
- **Passport.js** for authentication
- **Pico.css** for lightweight styling
- **In-memory data models** for Posts, Subgroups, Comments, Users

---

## Structure I Worked With

- `/models/Post.ts` – stores and manages post data
- `/models/Sub.ts` – handles subgroups (creation & retrieval)
- `/controller/postController.ts` – logic for creating posts and rendering the form
- `/routers/postRouters.ts` – all routes related to posts (create, show, edit, delete, comment)
- `/views/` – EJS templates like `createPosts.ejs`, `individualPost.ejs`, `editPost.ejs`, `deletePost.ejs`

---

## Summary

- Users log in via Passport.
- Authenticated users can create posts and add comments.
- Posts can be edited or deleted by their creator only.
- Everything is handled using clean async/await logic and protected routes.

---
