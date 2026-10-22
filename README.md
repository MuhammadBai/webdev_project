# Community Posts Web App 

A Reddit-style web app built with **TypeScript, Express and EJS**. Users log in, create posts in topic groups ("subs"), comment on posts, and edit or delete their own posts.

Built as a 4-person team project at BCIT. The app code is in [`acit2520_termprojstarter/`](acit2520_termprojstarter/). The detailed feature list and each team member's contributions are in [its README](acit2520_termprojstarter/README.md).

## My contribution

I built the **post workflow**:

- Post and Sub models, post routes, and the post controller
- Post creation with validation and automatic subgroup creation
- Post page with comments, plus edit and delete with a confirmation page
- Edit and delete restricted to the post's creator
- TypeScript types for posts
- The `createPosts`, `individualPost`, `editPost` and `deletePost` views

## Tech stack

- **TypeScript** with **Express 5**
- **EJS** templates for server-rendered pages
- **Passport** (local strategy) with **express-session** for login
- In-memory data store (`fake-db.ts`) instead of a real database

## Project structure

```
acit2520_termprojstarter/
├── app.ts            Express app setup, sessions, routes
├── fake-db.ts        In-memory users, posts, comments
├── types.ts          Shared TypeScript types
├── controller/       postController, userController
├── middleware/       Passport setup, auth check
├── models/           Post and Sub models
├── routers/          auth, index, posts, subs routes
└── views/            EJS pages
```

## Run it

Requires Node.js 20 or newer.

```bash
cd acit2520_termprojstarter
npm install
npm start
```

Then open **http://localhost:8000**. Demo login: `alice123` / `alice123!`

## Notes

This was a course project, so data is stored in memory and resets when the server restarts. A production version would use a real database, hashed passwords, and a session secret loaded from an environment variable.
