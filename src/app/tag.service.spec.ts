/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { TagService } from './tag.service';

describe('Service: Tag', () => {
  beforeEach(() => {
    addProviders([TagService]);
  });

  it('should ...',
    inject([TagService],
      (service: TagService) => {
        expect(service).toBeTruthy();
      }));
});
