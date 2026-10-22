# ACIT 2520 Term Project – Post Creation and Display

A Reddit-style web app built with TypeScript, Express, EJS and Passport. This README covers the post features and each team member's contributions.

---

## Implemented Features

### Post Creation

- **GET /posts/create**
  - Renders a form where logged-in users can submit a new post.
  - Users must provide either a description or a link (or both).
  - Subgroups are selected from a dropdown, or created automatically if the name is new.
- **POST /posts/create**
  - Handles form submission.
  - Performs validation and associates the post with the current user.
  - Saves the post and redirects to the post's dedicated view page.

### Post Display

- **GET /posts/show/:postid**
  - Displays an individual post with:
    - Title, link and description
    - Subgroup name
    - Creation date
    - Creator's username
  - Includes a list of comments and a comment form (if the user is logged in).

### Home Page Posts

- **GET /** (root route)
  - Displays the 20 most recent posts, newest first.
  - Each post shows its title, link, subgroup and creator.

### Post Editing & Deletion

- **GET /posts/edit/:postid** and **POST /posts/edit/:postid**
  - Only the post's creator can edit.
  - Edits the title, description or link of a post.
- **GET /posts/deleteconfirm/:postid**
  - Displays a confirmation page before deletion.
- **POST /posts/delete/:postid**
  - Deletes the post if the logged-in user is the creator.

### Commenting

- Logged-in users can comment on any post.
- Comments are stored with the username and timestamp.
- Anonymous users are redirected to log in before commenting.

---

## Files for the Post Features

| File | Purpose |
|---|---|
| `models/Post.ts` | Stores and manages post data |
| `models/Sub.ts` | Handles subgroups (creation and retrieval) |
| `controller/postController.ts` | Logic for creating posts and rendering the form |
| `routers/postRouters.ts` | All post routes (create, show, edit, delete, comment) |
| `views/` | EJS templates: `createPosts.ejs`, `individualPost.ejs`, `editPost.ejs`, `deletePost.ejs` |

---

## Summary

- Users log in with Passport.
- Logged-in users can create posts and add comments.
- Only a post's creator can edit or delete it.
- Post routes are protected so only logged-in users can make changes.

---

## Team Contributions

### Muhammad

- Built the post workflow: created the Post and Sub models, the post routes and the post controller
- Added post creation with validation and automatic subgroup creation
- Built the post page with comments, plus edit and delete with a confirmation page
- Restricted edit and delete to the post's creator
- Added TypeScript types for posts
- Created the `editPost` and `deletePost` views and updated the `createPosts` and `individualPost` views

### Chelcie

- Fixed `postController` to use the fake database to store and create posts
- Fixed the Passport types in `passport.ts` so they no longer use `any`
- Removed async requests from `postRouters`
- Adjusted posts so only the user who posted can edit or delete them
- Hid the Create Post button for users who are not logged in
- Partially formatted the subgroup listing page to show all subgroups

### Khoi

- Fixed and tweaked the EJS views for posts and subgroups
- Improved the overall look of the website
