import { Validators } from '@angular/forms';

import { ModelType } from '../shared/model-type';
import { Operation } from './operation';
import { AccountType } from '../account/account-type';
import { TagType } from '../tag/tag-type';

export class OperationType implements ModelType<Operation> {

  factory(): Operation {
  	return new Operation();
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
        key: 'account',
        type: 'model',
        model: new AccountType(),
        fieldType: 'select',
        label: 'Compte bancaire',
        validators: Validators.required,
        required: true
      }, {
        key: 'date',
        type: 'date',
        fieldType: 'date',
        label: 'Date',
        validators: [ Validators.required, Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$') ],
        required: true
      }, {
        key: 'name',
        type: 'string',
        fieldType: 'text',
        label: 'Nom',
        validators: [ Validators.required, Validators.maxLength(50) ],
        required: true
      }, {
        key: 'description',
        type: 'string',
        fieldType: 'textarea',
        label: 'Description',
        validators: [ Validators.maxLength(250) ]
      }, {
        key: 'amount',
        type: 'number',
        fieldType: 'amount',
        label: 'Montant',
        validators: [ Validators.required, Validators.pattern('^-?[0-9]+([.][0-9]{0,2})?$') ],
        required: true
      }, {
        key: 'tag',
        type: 'model',
        model: new AccountType(),
        fieldType: 'select',
        label: 'Catégorie'
      }
    ];
  }
}