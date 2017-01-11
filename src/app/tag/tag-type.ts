import { Validators } from '@angular/forms';

import { ModelType } from '../shared/model-type';
import { Tag } from './tag';

export class TagType implements ModelType<Tag> {

  factory(): Tag {
  	return new Tag();
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
        key: 'color',
        type: 'string',
        fieldType: 'color',
        values : [
          '#576E99',
          '#206CFF',
          '#0000CC',
          '#5229A3',
          '#854F61',
          '#B5074C',
          '#CC0000',
          '#D85349',
          '#FF4B14',
          '#EC7000',
          '#B36D00',
          '#AB8B00',
          '#636330',
          '#64992C',
          '#03BC06',
          '#006633'
        ],
        label: 'Icône',
        validators: Validators.required
      }, {
        key: 'icon',
        type: 'string',
        fieldType: 'icon',
        values: [
          'euro',
          'glass',
          'music',
          'film',
          'home',
          'road',
          'earphone',
          'book',
          'camera',
          'facetime-video',
          'gift',
          'plane',
          'shopping-cart',
          'hdd',
          'globe',
          'wrench',
          'paperclip',
          'phone',
          'flash',
          'cutlery',
          'tower',
          'tree-conifer',
          'tree-deciduous',
          'cd',
          'baby-formula',
          'tent',
          'blackboard',
          'bed',
          'lamp',
          'piggy-bank',
          'scale',
          'education',
          'oil',
          'sunglasses'
        ],
        label: 'Couleur',
        validators: Validators.required
      }
    ];
  }
}