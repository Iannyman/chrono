interface AuthUser {
  username: string;
  displayName: string;
  department: string;
}

interface AuthResponse {
  token: string;
  expiresAt: string;
  user: AuthUser;
}
