import { AuthRepository } from '../domain/AuthRepository';

export const verifyToken = (authRepository: AuthRepository) => async () => {
  return await authRepository.verifyToken();
};
