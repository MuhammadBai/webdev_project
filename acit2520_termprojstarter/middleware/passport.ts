import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById } from "../controller/userController";
import { Request } from "express";

declare global {
  namespace Express {
    interface User {
      id: number;
      uname: string;
      password: string;
    }
  }
}

const localLogin = new LocalStrategy(
  {
    usernameField: "uname",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (
    req: Request,
    uname: string,
    password: string,
    done: (error: any, user?: Express.User | false, options?: { message: string }) => void
  ) => {
    try {
      const user = await getUserByEmailIdAndPassword(uname, password);
      if (!user) {
        return done(null, false, { message: "Invalid username or password." });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);


passport.serializeUser((user: Express.User, done) => {
  done(null, user.id);
});


passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await getUserById(id);
    if (user) {
      done(null, user);
    } else {
      done(new Error("User not found"), null);
    }
  } catch (err) {
    done(err, null);
  }
});

passport.use(localLogin);

export default passport;