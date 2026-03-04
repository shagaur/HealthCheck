import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  
  return sendError({
    res,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  });
};
