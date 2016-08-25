/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { AccountService } from './account.service';

describe('Service: Account', () => {
  beforeEach(() => {
    addProviders([AccountService]);
  });

  it('should ...',
    inject([AccountService],
      (service: AccountService) => {
        expect(service).toBeTruthy();
      }));
});
