import { ModelType } from '../shared/model-type';
import { Operation } from './operation';
import { AccountType } from '../account/account-type';
import { TagType } from '../tag/tag-type';

export class OperationType implements ModelType<Operation> {

  factory(): Operation {
  	return new Operation();
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
        key: 'description',
        type: 'string'
      }, {
        key: 'date',
        type: 'date'
      }, {
        key: 'amount',
        type: 'number'
      }, {
        key: 'account',
        type: 'model',
        model: new AccountType()
      }, {
        key: 'tag',
        type: 'model',
        model: new AccountType()
      }
    ];
  }
}