/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { AccountFormResolveService } from './account-form-resolve.service';

describe('Service: AccountFormResolve', () => {
  beforeEach(() => {
    addProviders([AccountFormResolveService]);
  });

  it('should ...',
    inject([AccountFormResolveService],
      (service: AccountFormResolveService) => {
        expect(service).toBeTruthy();
      }));
});
