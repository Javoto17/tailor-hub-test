import { StorageRepository } from '@/modules/storage/domain/StorageRepository';
import { ClientRepository } from '../domain/ClientRepository';

const setCustomHeaders = (
  customHeaders: Record<string, string>,
  authPassword?: string
) => {
  const header = new Headers();

  header.append('accept', 'application/json');
  header.append('content-type', 'application/json');

  if (authPassword) {
    header.append('authorization', authPassword);
  }

  for (const key in customHeaders) {
    header.append(key, customHeaders[key]);
  }

  return header;
};

export const generateClientRepository = (
  storageRepository: StorageRepository
): ClientRepository => {
  return {
    get: async function get<T>(
      url: string,
      options: RequestInit = {}
    ): Promise<{ data: T; headers: Headers }> {
      const token = await storageRepository.get('token');

      const headers = setCustomHeaders(
        options?.headers as Record<string, string>,
        token
      );

      const fetchOptions: RequestInit = {
        ...options,
        method: 'GET',
        headers,
      };

      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        throw new Error(
          `Error fetching data: ${response?.status} -> ${response.statusText}`
        );
      }

      return { data: (await response.json()) as T, headers: response.headers };
    },
    post: async function post<T>(
      url: string,
      data: unknown,
      options: RequestInit = {}
    ): Promise<{ data: T; headers: Headers }> {
      const token = await storageRepository.get('token');

      const headers = setCustomHeaders(
        options?.headers as Record<string, string>,
        token
      );

      const fetchOptions: RequestInit = {
        ...options,
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      };

      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        throw new Error(
          `Error fetching data: ${response?.status} -> ${response.statusText}`
        );
      }

      if (response?.status === 200) {
        return {
          data: (await response.text()) as T,
          headers: response.headers,
        };
      }

      return { data: (await response.json()) as T, headers: response.headers };
    },
    put: async function put<T>(
      url: string,
      data: unknown,
      options: RequestInit = {}
    ): Promise<{ data: T; headers: Headers }> {
      const token = await storageRepository.get('token');

      const headers = setCustomHeaders(
        options?.headers as Record<string, string>,
        token
      );

      const fetchOptions: RequestInit = {
        ...options,
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      };

      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        throw new Error(
          `Error fetching data: ${response?.status} -> ${response.statusText}`
        );
      }

      return { data: (await response.json()) as T, headers: response.headers };
    },
    remove: async function remove<T>(
      url: string,
      options: RequestInit = {}
    ): Promise<{ headers: Headers; data: T }> {
      const token = await storageRepository.get('token');

      const headers = setCustomHeaders(
        options?.headers as Record<string, string>,
        token
      );

      const fetchOptions: RequestInit = {
        ...options,
        method: 'DELETE',
        headers,
      };

      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        throw new Error(
          `Error fetching data: ${response?.status} -> ${response.statusText}`
        );
      }

      if (response?.status === 200) {
        return {
          headers: response.headers,
          data: (await response.json()) as T,
        };
      }

      return { headers: response.headers, data: (await response.text()) as T };
    },
  };
};
