export interface ResponseInterface<T> {
  total: number;
  page: number;
  totalPages: number;
  data: T;
}
