import bcrypt from "bcryptjs";
import { User } from "../models/user.model";

export const getDoctorsService = async (user: any) => {
  if (user.role === "SUPER_ADMIN") {
    return User.find({ role: "DOCTOR" }).select("-password");
  }

  return User.find({
    role: "DOCTOR",
    orgId: user.orgId,
  }).select("-password");
};

export const createDoctorService = async (
  data: any,
  user: { role: string; orgId?: string },
) => {
  if (!user.orgId) {
    throw new Error("Organization not found");
  }

  const existing = await User.findOne({
    email: data.email,
    orgId: user.orgId,
  });

  if (existing) {
    throw new Error("User already exists in this organization");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const doctor = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: "DOCTOR",
    orgId: user.orgId,
    roleMeta: {
      specialization: data?.specialization || "",
      experience: data?.experience || "",
      qualification: data?.qualification || "",
      licenseNumber: data?.licenseNumber || "",
    },
  });

  return doctor;
};

export const updateDoctorService = async (
  doctorId: string,
  data: any,
  user: any,
) => {
  const doctor = await User.findOne({
    _id: doctorId,
    role: "DOCTOR",
    orgId: user.orgId,
  });

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  doctor.name = data.name ?? doctor.name;

  doctor.roleMeta = {
    ...doctor.roleMeta,
    ...data.roleMeta,
  };

  await doctor.save();

  return doctor;
};

export const deleteDoctorService = async (doctorId: string, user: any) => {
  const doctor = await User.findOne({
    _id: doctorId,
    role: "DOCTOR",
    orgId: user.orgId,
  });

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  doctor.isActive = false;
  await doctor.save();
};
