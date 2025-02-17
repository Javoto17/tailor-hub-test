import { AuthRepository } from '../domain/AuthRepository';

export const refreshToken = (authRepository: AuthRepository) => async () => {
  return await authRepository.refreshToken();
};
