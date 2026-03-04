import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler";
import { generateAccessToken, verifyToken } from "../utils/jwt";
import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/response";

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return sendError({
      res,
      statusCode: 401,
      message: "No refresh token",
    });
  }

  const decoded: any = verifyToken(token);

  const user = await User.findById(decoded.userId).select("+refreshToken");

  if (!user || !user.refreshToken) {
    return sendError({
      res,
      statusCode: 401,
      message: "Invalid refresh token",
    });
  }

  const isMatch = await bcrypt.compare(token, user.refreshToken);

  if (!isMatch) {
    return sendError({
      res,
      statusCode: 401,
      message: "Invalid refresh token",
    });
  }

  const newAccessToken = generateAccessToken({
    userId: user._id.toString(),
    role: user.role,
    orgId: user.orgId?.toString(),
  });

  return sendSuccess({
    res,
    statusCode: 200,
    message: "Refresh token generated successfully",
    data: { accessToken: newAccessToken },
  });
});
