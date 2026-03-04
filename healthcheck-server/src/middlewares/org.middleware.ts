import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response";

export const validateOrgAccess = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const orgIdFromParams = req.params.orgId;

  if (!req.user) {
    return sendError({
      res,
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  if (req.user.role === "SUPER_ADMIN") {
    return next();
  }

  if (req.user.orgId !== orgIdFromParams) {
    return sendError({
      res,
      statusCode: 403,
      message: "Access denied for this organization",
    });
  }

  next();
};
