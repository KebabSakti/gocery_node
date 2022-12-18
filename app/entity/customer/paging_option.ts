class PagingOption {
  page: number;
  limit: number;
  offset: number = 0;

  constructor(page: number, limit: number) {
    this.page = page;
    this.limit = limit;

    if (page > 0) {
      this.offset = (page - 1) * limit;
    }
  }
}

export default PagingOption;
