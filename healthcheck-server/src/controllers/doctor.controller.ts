import { Request, Response } from "express";
import { createDoctorService, deleteDoctorService, getDoctorsService, updateDoctorService } from "../services/doctor.service";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";

export const getDoctors = asyncHandler(
  async (req: Request, res: Response) => {
    const doctors = await getDoctorsService(req.user!);

    return sendSuccess({
      res,
      statusCode: 200,
      message: "Doctors fetched successfully",
      data: doctors,
    });
  }
);

export const createDoctor = asyncHandler(
  async (req: Request, res: Response) => {
    const doctor = await createDoctorService(req.body, req.user!);

    return sendSuccess({
      res,
      statusCode: 201,
      message: "Doctor created successfully",
      data: doctor,
    });
  }
);

export const updateDoctor = asyncHandler(
  async (req: Request, res: Response) => {
    const doctors = await updateDoctorService(req.body.docId, req.body, req.user!);

    return sendSuccess({
      res,
      statusCode: 200,
      message: "Doctors fetched successfully",
      data: doctors,
    });
  }
);

export const deleteDoctor = asyncHandler(
  async (req: Request, res: Response) => {
    const doctors = await deleteDoctorService(req.body.docId, req.user!);

    return sendSuccess({
      res,
      statusCode: 200,
      message: "Doctors fetched successfully",
      data: doctors,
    });
  }
);