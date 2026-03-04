import { Request, Response } from "express";
import { sendSuccess } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";
import { createOrganizationService, getOrganizationsService } from "../services/org.service";

export const createOrganization = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await createOrganizationService(req.body, req?.user?.userId);

    return sendSuccess({
      res,
      statusCode: 201,
      message: "Organization created successfully",
      data: result,
    });
  },
);

export const getOrganizations = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await getOrganizationsService(page, limit);

    return sendSuccess({
      res,
      statusCode: 200,
      message: "Organizations fetched successfully",
      data: result,
    });
  },
);
