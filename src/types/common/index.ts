

export interface IPagination<TData> {
  page?: number;
  total?: number;
  totalPages?: number;
  data: TData[]; 
}