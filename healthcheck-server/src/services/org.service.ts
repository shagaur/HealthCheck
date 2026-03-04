import bcrypt from "bcryptjs";
import { Organization } from "../models/organization.model";
import { User } from "../models/user.model";

export const getOrganizationsService = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const data = await Organization.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Organization.countDocuments();

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const createOrganizationService = async (
  data: any,
  superAdminId: string | undefined,
) => {
  const { name, adminName, adminEmail, adminPassword } = data;

  const existingOrg = await Organization.findOne({ name });
  if (existingOrg) {
    throw new Error("Organization already exists");
  }

  const org = await Organization.create({
    name,
    email: adminEmail,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    createdBy: superAdminId,
  });

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await User.create({
    name: adminName,
    email: adminEmail,
    password: hashedPassword,
    role: "ORG_ADMIN",
    orgId: org._id,
  });

  return org;
};
