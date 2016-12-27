import { ModelType } from '../shared/model-type';
import { Account } from './account';

export class AccountType implements ModelType<Account> {

  factory(): Account {
  	return new Account();
  }

  attributes(): {key: string, type: string, model?: any}[] {
    return [
      {
        key: '@id',
        type: 'string'
      }, {
        key: 'id',
        type: 'number'
      }, {
        key: 'name',
        type: 'string'
      }, {
        key: 'number',
        type: 'string'
      }, {
        key: 'balance',
        type: 'number'
      }, {
        key: 'description',
        type: 'string'
      }
    ];
  }
}