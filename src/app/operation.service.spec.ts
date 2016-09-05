/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { OperationService } from './operation.service';

describe('Service: Operation', () => {
  beforeEach(() => {
    addProviders([OperationService]);
  });

  it('should ...',
    inject([OperationService],
      (service: OperationService) => {
        expect(service).toBeTruthy();
      }));
});
