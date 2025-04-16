export {}; // Added this line to remove "not a module" error

type Comment = {
  id: number;
  creator: string;
  description: string;
  timestamp: Date;
};

type Post = {
  id: number;
  title: string;
  link?: string;
  description?: string;
  sub: string;
  user: string;
  createdAt: Date;
  comments?: Comment[];
};

const posts: Post[] = [];

export default {
  create: async (post: Post) => {
    posts.push(post);
    return post;
  },
  findById: async (id: number) => {
    return posts.find((p) => p.id === id);
  },
  getAll: async () => {
    return posts
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 20);
  },
};
