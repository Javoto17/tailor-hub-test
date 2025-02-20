import { logIn } from '@/modules/auth/application/logIn';
import { logOut } from '@/modules/auth/application/logOut';
import { signUp } from '@/modules/auth/application/signUp';
import { verifyToken } from '@/modules/auth/application/verifyToken';
import { generateAuthRepository } from '@/modules/auth/infrastructure/AuthRepository';
import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import useAuthStore from '@/stores/auth/authStore';
import { useMutation } from '@tanstack/react-query';

import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';
import { refreshToken } from '@/modules/auth/application/refreshToken';

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
    user,
  } = useAuthStore();

  const refreshTokenMutation = useMutation({
    mutationFn: () => refreshToken(authRepository)(),
  });

  const verifyTokenMutation = useMutation({
    mutationFn: () => verifyToken(authRepository)(),
    onSuccess: (data) => {
      verifyTokenAction(data);
      refreshTokenMutation.mutateAsync();
    },
  });

  const signUpMutation = useMutation({
    mutationFn: ({ name, email, password }: signUpParams) =>
      signUp(authRepository)(name, email, password),
    onSuccess: (_, { email, password }) => {
      loginMutation.mutateAsync({ email, password });
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

  return {
    user,
    signUpUser: {
      mutate: signUpMutation.mutateAsync,
      isLoading: signUpMutation.isPending,
      isError: signUpMutation.isError,
    },
    loginUser: {
      mutate: loginMutation.mutateAsync,
      isLoading: loginMutation.isPending,
      isError: loginMutation.isError,
    },
    logoutUser: {
      mutate: logoutMutation.mutateAsync,
      isLoading: logoutMutation.isPending,
      isError: logoutMutation.isError,
    },
    verifyUser: {
      mutate: verifyTokenMutation.mutateAsync,
      isLoading: verifyTokenMutation.isPending,
      isError: verifyTokenMutation.isError,
    },
    isAuthenticated,
  };
}
