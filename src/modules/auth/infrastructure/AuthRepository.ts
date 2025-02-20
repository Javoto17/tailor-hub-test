import { ClientRepository } from '@/modules/client/domain/ClientRepository';
import { StorageRepository } from '@/modules/storage/domain/StorageRepository';
import { AuthRepository } from '../domain/AuthRepository';
import { User } from '../domain/Auth';

export function generateAuthRepository(
  clientRepository: ClientRepository,
  storageRepository: StorageRepository
): AuthRepository {
  const API_URL = process.env.API_URL;

  const getCookie = async (headers: Headers) => {
    const cookies = headers.get('set-cookie');
    // Get cookies from the response headers
    const refreshToken = cookies
      ?.split(';')
      .find((cookie) => cookie.trim().startsWith('refreshToken=')); // Extract the refresh token cookie
    if (refreshToken) {
      return refreshToken.split('=')[1]; // Get the value of the refresh token
    }
  };

  return {
    login: async (email: string, password: string): Promise<User> => {
      try {
        const { data, headers } = await clientRepository.post<User>(
          API_URL + `auth/login`,
          {
            email,
            password,
          }
        );

        if (!headers.get('authorization')) {
          throw new Error('No authorization header found');
        }

        const refreshToken = await getCookie(headers);

        if (!refreshToken) {
          throw new Error('No refresh token found');
        }

        storageRepository.set('token', headers.get('authorization') as string);
        storageRepository.set('refreshToken', refreshToken);

        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    signUp: async (
      name: string,
      email: string,
      password: string
    ): Promise<void> => {
      try {
        const { data } = await clientRepository.post<void>(
          API_URL + `auth/signup`,
          { name, email, password }
        );

        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    refreshToken: async (): Promise<void> => {
      try {
        const { headers } = await clientRepository.get<void>(
          API_URL + `auth/refresh-token`
        );

        if (!headers.get('authorization')) {
          throw new Error('No authorization header found');
        }

        const refreshToken = await getCookie(headers);

        if (!refreshToken) {
          throw new Error('No refresh token found');
        }

        storageRepository.set('token', headers.get('authorization') as string);
        storageRepository.set('refreshToken', refreshToken);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    verifyToken: async (): Promise<User> => {
      try {
        const refreshToken = storageRepository.get('refreshToken');

        if (!refreshToken) {
          throw new Error('No token found');
        }

        const { data } = await clientRepository.get<User>(
          API_URL + `auth/verify`,
          {
            headers: {
              Cookie: `refreshToken=${refreshToken}`,
            },
          }
        );

        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    logout: async (): Promise<void> => {
      await clientRepository.get<void>(API_URL + `auth/logout`);
    },
  };
}

// ... existing code ...
