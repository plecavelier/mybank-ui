import { Account } from '../account/account';
import { Tag } from '../tag/tag';

export class Operation {

  '@id': string;
  id: number;
  name: string = '';
  description: string = '';
  date: Date = new Date();
  amount: number;
  account: Account;
  tag: Tag;
}
