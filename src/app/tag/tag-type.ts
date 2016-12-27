import { ModelType } from '../shared/model-type';
import { Tag } from './tag';

export class TagType implements ModelType<Tag> {

  factory(): Tag {
  	return new Tag();
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
        key: 'icon',
        type: 'string'
      }, {
        key: 'color',
        type: 'string'
      }
    ];
  }
}