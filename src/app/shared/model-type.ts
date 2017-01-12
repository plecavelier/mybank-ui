import { ValidatorFn } from '@angular/forms';

export interface ModelType<T> {

  factory(): T;

  attributes(): {
    key: string,
    type: string,
    model?: any,
    fieldType?: string,
    values?: string[],
    label?: string,
    validators?: ValidatorFn|ValidatorFn[],
    onlyNew?: boolean,
    required?: boolean
  }[];
}