import { AuthRepository } from '../domain/AuthRepository';

export const logOut = (authRepository: AuthRepository) => async () => {
  return await authRepository.logout();
};
