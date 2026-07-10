interface AuthUser {
  username: string;
  displayName: string;
  department: string;
}

interface AuthResponse {
  token: string;
  expiresIn: number;
  user: AuthUser;
}
