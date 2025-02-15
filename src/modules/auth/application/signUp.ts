import { AuthRepository } from '../domain/AuthRepository';

export const signUp =
  (authRepository: AuthRepository) =>
  async (name: string, email: string, password: string) => {
    return await authRepository.signUp(name, email, password);
  };
