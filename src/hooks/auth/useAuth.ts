import { logIn } from '@/modules/auth/application/logIn';
import { logOut } from '@/modules/auth/application/logOut';
import { signUp } from '@/modules/auth/application/signUp';
import { verifyToken } from '@/modules/auth/application/verifyToken';
import { generateAuthRepository } from '@/modules/auth/infrastructure/AuthRepository';
import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import useAuthStore from '@/stores/auth/authStore';
import { useMutation } from '@tanstack/react-query';

import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);
const authRepository = generateAuthRepository(
  clientRepository,
  storageRepository
);

interface signUpParams {
  name: string;
  email: string;
  password: string;
}

interface loginParams {
  email: string;
  password: string;
}

export function useAuth() {
  const {
    isAuthenticated,
    login: loginAction,
    logout: logoutAction,
    verifyToken: verifyTokenAction,
  } = useAuthStore();

  const verifyTokenMutation = useMutation({
    mutationFn: () => verifyToken(authRepository)(),
    onSuccess: (data) => {
      verifyTokenAction(data);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: ({ name, email, password }: signUpParams) =>
      signUp(authRepository)(name, email, password),
    onSuccess: () => {
      verifyTokenMutation.mutateAsync();
    },
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: loginParams) =>
      logIn(authRepository)(email, password),
    onSuccess: (data) => {
      loginAction(data);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => logOut(authRepository)(),
    onSuccess: () => {
      logoutAction();
    },
  });

  const signUpUser = (name: string, email: string, password: string) => {
    signUpMutation.mutateAsync({
      name,
      email,
      password,
    });
  };

  const loginUser = (email: string, password: string) => {
    loginMutation.mutateAsync({
      email,
      password,
    });
  };

  const verifyUserToken = () => {
    verifyTokenMutation.mutateAsync();
  };

  const logoutUser = () => {
    logoutMutation.mutateAsync();
  };

  return {
    signUpUser,
    loginUser,
    logoutUser,
    verifyUserToken,
    isAuthenticated,
  };
}
