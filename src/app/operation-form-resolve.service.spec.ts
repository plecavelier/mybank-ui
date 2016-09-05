/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { OperationFormResolveService } from './operation-form-resolve.service';

describe('Service: OperationFormResolve', () => {
  beforeEach(() => {
    addProviders([OperationFormResolveService]);
  });

  it('should ...',
    inject([OperationFormResolveService],
      (service: OperationFormResolveService) => {
        expect(service).toBeTruthy();
      }));
});
