interface QueryBuilderOption {
  table: string;
  field?: string[];
  join?: string[];
  where?: string[];
  group?: string[];
  having?: string[];
  sort?: string[];
  paging?: {
    perPage: number;
    currentPage: number;
  };
}

export default QueryBuilderOption;
