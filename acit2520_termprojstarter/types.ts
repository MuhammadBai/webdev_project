export type TPosts = {
  [key: number]: {
    id: number;
    title: string;
    link: string;
    description: string;
    creator: number;
    subgroup: string;
    timestamp: number;
  };
};

export type TPost = {
  id: number;
  title: string;
  link: string;
  description: string;
  creator: number;
  subgroup: string;
  timestamp: number;
};

export type TComments = {
  [key: number]: {
    id: number;
    post_id: number;
    creator: number;
    description: string;
    timestamp: number;
  };
};

export type TUsers = {
  [key: number]: { id: number; uname: string; password: string };
};

export type TVotes = { user_id: number; post_id: number; value: number }[];

// Extend Express types so TypeScript knows about req.user
declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
    }

    interface Request {
      user?: User;
    }
  }
}

export {}; //Marks this as a module so the declarations apply
