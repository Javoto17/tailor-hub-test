import { AuthRepository } from '../domain/AuthRepository';

export const logIn =
  (authRepository: AuthRepository) =>
  async (email: string, password: string) => {
    const data = await authRepository.login(email, password);

    return data;
  };
