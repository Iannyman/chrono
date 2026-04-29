interface AuthUser {
  username: string;
  displayName: string;
  department: string;
}

interface AuthResponse {
  token: string;
  expiresIn: string;
  user: AuthUser;
}
