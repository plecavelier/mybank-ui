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
    type.attributes().forEach(attribute => {
      if (attribute.key in input) {
        entity[attribute.key] = this.mapProperty(input[attribute.key], attribute.type, attribute.model);
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
    type.attributes().forEach(attribute => {
      if (attribute.key in entity) {
        if (attribute.type == 'model') {
          object[attribute.key] = entity[attribute.key]['@id'];
        } else {
          object[attribute.key] = entity[attribute.key];
        }
      }
    });
    return object;
  }

  private mapProperty(value: any, type: string, model?: any): any | Date {
    if (value == null) {
      return null;
    }
    switch(type) {
      case 'string':
        return String(value);

      case 'number':
        return Number(value);

      case 'date':
        return new Date(value);

      case 'model':
        return this.mapToEntity(<Object> value, model);
    }
    return value;
  }
}