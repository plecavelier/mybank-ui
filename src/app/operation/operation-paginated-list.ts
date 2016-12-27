import { Operation } from './operation';
import { PaginatedList } from '../shared/paginated-list';

export class OperationPaginatedList extends PaginatedList<Operation> {

  totalAmount: number;
}
