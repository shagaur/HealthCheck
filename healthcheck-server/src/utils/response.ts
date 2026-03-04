import { Response } from "express";

interface SuccessResponseOptions<T> {
  res: Response;
  statusCode?: number;
  message?: string;
  data?: T;
  meta?: any;
}

export const sendSuccess = <T>({
  res,
  statusCode = 200,
  message = "Success",
  data,
  meta,
}: SuccessResponseOptions<T>) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta,
  });
};

interface ErrorResponseOptions {
  res: Response;
  statusCode?: number;
  message?: string;
  error?: any;
}

export const sendError = ({
  res,
  statusCode = 500,
  message = "Something went wrong",
  error,
}: ErrorResponseOptions) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
