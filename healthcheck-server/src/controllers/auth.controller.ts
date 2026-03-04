import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { registerUser, loginUser, logoutUser } from "../services/auth.service";
import { sendError, sendSuccess } from "../utils/response";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await registerUser(req.body);

  return sendSuccess({
    res,
    statusCode: 201,
    message: "User register successfully",
    data: result,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { user, accessToken, refreshToken } = await loginUser(email, password);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return sendSuccess({
    res,
    statusCode: 200,
    message: "User logged in successfully",
    data: { accessToken },
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return sendError({
      res,
      statusCode: 401,
      message: "No refresh token provided",
    });
  }

  await logoutUser(token);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return sendSuccess({
    res,
    statusCode: 200,
    message: "User logged out successfully",
    data: null,
  });
});
