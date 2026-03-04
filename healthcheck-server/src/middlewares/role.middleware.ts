import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response";

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendError({
        res,
        statusCode: 403,
        message: "Forbidden",
      });
    }

    next();
  };
};
