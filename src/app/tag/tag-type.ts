import { ModelType } from '../shared/model-type';
import { Tag } from './tag';

export class TagType implements ModelType<Tag> {

  factory(): Tag {
  	return new Tag();
  }

  attributes(): Map<string, any> {
    let mapping: Map<string, any> = new Map<string, any>();
    mapping.set('id', 'number');
    mapping.set('name', 'string');
    mapping.set('description', 'string');
    mapping.set('icon', 'string');
    mapping.set('color', 'string');
    return mapping;
  }
}