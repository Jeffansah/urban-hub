import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token)
    return next(
      createError(401, "You are unauthorized to perform this operation")
    );

  jwt.verify(token, process.env.JWT_KEY, (error, userInfo) => {
    if (error) return next(createError(403, "Token not valid"));

    req.user = userInfo;

    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(
        createError(403, "You are unauthorized to perform this operation")
      );
    }
  });
};
