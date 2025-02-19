export interface ClientRepository {
  get<T>(
    url: string,
    options?: RequestInit
  ): Promise<{
    data: T;
    headers: Headers;
  }>;
  post<T>(
    url: string,
    data: any,
    options?: RequestInit
  ): Promise<{
    data: T;
    headers: Headers;
  }>;
  remove<T>(
    url: string,
    options?: RequestInit
  ): Promise<{
    data: T;
    headers: Headers;
  }>;
  put<T>(
    url: string,
    data: any,
    options?: RequestInit
  ): Promise<{
    data: T;
    headers: Headers;
  }>;
}
