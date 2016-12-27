export class PaginatedList<R> {

  list: R[];
  page: number;
  previous: number = null;
  next: number = null;
  total: number;
}
