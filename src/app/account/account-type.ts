import { Validators } from '@angular/forms';

import { ModelType } from '../shared/model-type';
import { Account } from './account';

export class AccountType implements ModelType<Account> {

  factory(): Account {
  	return new Account();
  }

  attributes() {
    return [
      {
        key: '@id',
        type: 'string'
      }, {
        key: 'id',
        type: 'number'
      }, {
        key: 'name',
        type: 'string',
        fieldType: 'text',
        label: 'Nom',
        validators: [ Validators.required, Validators.maxLength(50) ]
      }, {
        key: 'description',
        type: 'string',
        fieldType: 'textarea',
        label: 'Description',
        validators: [ Validators.maxLength(250) ]
      }, {
        key: 'number',
        type: 'string',
        fieldType: 'text',
        label: 'Numéro de compte',
        validators: [ Validators.required, Validators.maxLength(50) ]
      }, {
        key: 'balance',
        type: 'number',
        fieldType: 'amount',
        label: 'Solde',
        validators: [ Validators.required, Validators.pattern('^[0-9]+([.][0-9]{0,2})?$') ],
        onlyNew: true
      }
    ];
  }
}