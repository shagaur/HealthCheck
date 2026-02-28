export type UserRole = "admin" | "doctor" | "staff"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
}