export interface JwtPayload {
  userId: string;
  role: string;
  orgId?: string;
}
