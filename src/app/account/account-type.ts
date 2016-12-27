import { ModelType } from '../shared/model-type';
import { Account } from './account';

export class AccountType implements ModelType<Account> {

  factory(): Account {
  	return new Account();
  }

  attributes(): Map<string, any> {
    let mapping: Map<string, any> = new Map<string, any>();
    mapping.set('id', 'number');
    mapping.set('name', 'string');
    mapping.set('number', 'string');
    mapping.set('balance', 'number');
    mapping.set('description', 'string');
    return mapping;
  }
}