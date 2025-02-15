import { User } from './Auth';

export interface AuthRepository {
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  refreshToken: () => Promise<void>;
  verifyToken: () => Promise<User>;
}
