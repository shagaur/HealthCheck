import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { sendError } from "../utils/response";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendError({
      res,
      statusCode: 401,
      message: "Not authorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    return sendError({
      res,
      statusCode: 401,
      message: "Invalid token",
    });
  }
};

export const authorizeRole =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!allowedRoles.includes(req.user!.role)) {
      return sendError({
        res,
        statusCode: 403,
        message: "Forbidden: Access denied",
      });
    }

    next();
  };
