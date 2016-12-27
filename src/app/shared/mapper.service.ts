import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ModelType } from './model-type';

@Injectable()
export class MapperService {

  mapToEntity<T>(input: Response | Object, type: ModelType<T>): T {
    if (input instanceof Response) {
      input = input.json();
    }
    let entity: T = type.factory();
    type.attributes().forEach((value: string, key: string) => {
      if (key in input) {
        entity[key] = input[key];
      }
    });
    return entity;
  }

  mapToEntities<T>(input: Response | Object[], type: ModelType<T>): T[] {
    if (input instanceof Response) {
      input = <Object[]> input.json()['hydra:member'];
    }
    let entities: T[] = [];
    input.forEach((value: Object) => {
      entities.push(this.mapToEntity(value, type));
    });
    return entities;
  }

  mapToObject<T>(entity: T, type: ModelType<T>): Object {
    let object: Object = {};
    object['id'] = entity['id'];
    type.attributes().forEach((value: string, key: string) => {
      if (key in entity) {
        object[key] = entity[key];
      }
    });
    return object;
  }
}