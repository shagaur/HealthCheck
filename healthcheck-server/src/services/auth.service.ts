import bcrypt from "bcryptjs";
import { User, IUser } from "../models/user.model";
import { UserRole } from "../models/user.model";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  orgId?: string;
}) => {
  const existingUser = await User.findOne({
    email: data.email,
    orgId: data.orgId || null,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    role: user.role,
    orgId: user.orgId?.toString(),
  });

  const refreshToken = generateRefreshToken({
    userId: user._id.toString(),
  });

  const hashedRefresh = await bcrypt.hash(refreshToken, 10);

  user.refreshToken = hashedRefresh;
  await user.save();

  return { user, accessToken, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    role: user.role,
    orgId: user.orgId?.toString(),
  });

  const refreshToken = generateRefreshToken({
    userId: user._id.toString(),
  });

  const hashedRefresh = await bcrypt.hash(refreshToken, 10);

  user.refreshToken = hashedRefresh;
  await user.save();

  return { user, accessToken, refreshToken };
};

export const logoutUser = async (token: string) => {
  const decoded: any = verifyToken(token);
  await User.findByIdAndUpdate(decoded.userId, {
    refreshToken: null,
  });
  return true;
};
