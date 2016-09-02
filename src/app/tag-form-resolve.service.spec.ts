/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { TagFormResolveService } from './tag-form-resolve.service';

describe('Service: TagFormResolve', () => {
  beforeEach(() => {
    addProviders([TagFormResolveService]);
  });

  it('should ...',
    inject([TagFormResolveService],
      (service: TagFormResolveService) => {
        expect(service).toBeTruthy();
      }));
});
