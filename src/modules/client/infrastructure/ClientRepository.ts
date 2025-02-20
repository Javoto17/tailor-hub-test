import { StorageRepository } from '@/modules/storage/domain/StorageRepository';
import { ClientRepository } from '../domain/ClientRepository';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiResponse<T> = { data: T; headers: Headers };

const createMakeRequest = (storageRepository: StorageRepository) => {
  const createHeaders = (
    customHeaders: Record<string, string>,
    token?: string
  ) => {
    const headers = new Headers();

    headers.set('Content-type', 'application/json');
    headers.set('Accept', 'application/json');

    if (token) headers.set('Authorization', token);

    if (customHeaders) {
      Object.entries(customHeaders).forEach(([key, value]) =>
        headers.set(key, value)
      );
    }

    return headers;
  };

  const isJsonResponse = (response: Response): boolean => {
    const contentType = response.headers.get('Content-Type');
    return Boolean(contentType?.includes('application/json'));
  };

  const handleError = async (response: Response): Promise<never> => {
    const error = await response.json();
    throw new Error(
      `Error fetching data: ${response.status} -> ${error.message || response.statusText}`
    );
  };

  const parseResponse = async (response: Response) => {
    return isJsonResponse(response) ? response.json() : response.text();
  };

  const createRequestBody = (data: unknown): string | FormData | undefined => {
    if (!data) return undefined;
    return data instanceof FormData ? data : JSON.stringify(data);
  };

  return async <T>(
    method: HttpMethod,
    url: string,
    options: RequestInit = {},
    data?: unknown
  ): Promise<ApiResponse<T>> => {
    const token = await storageRepository.get('token');

    const headers = createHeaders(
      options?.headers as Record<string, string>,
      token
    );

    const fetchOptions: RequestInit = {
      ...options,
      method,
      headers,
      body: createRequestBody(data),
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) return handleError(response);

    const parsedData = await parseResponse(response);
    return { data: parsedData as T, headers: response.headers };
  };
};

export const generateClientRepository = (
  storageRepository: StorageRepository
): ClientRepository => {
  const makeRequest = createMakeRequest(storageRepository);

  return {
    get: <T>(url: string, options: RequestInit = {}) =>
      makeRequest<T>('GET', url, options),
    post: <T>(url: string, data: unknown, options: RequestInit = {}) =>
      makeRequest<T>('POST', url, options, data),
    put: <T>(url: string, data: unknown, options: RequestInit = {}) =>
      makeRequest<T>('PUT', url, options, data),
    remove: <T>(url: string, options: RequestInit = {}) =>
      makeRequest<T>('DELETE', url, options),
  };
};
