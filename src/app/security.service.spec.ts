/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { SecurityService } from './security.service';

describe('Service: Security', () => {
  beforeEach(() => {
    addProviders([SecurityService]);
  });

  it('should ...',
    inject([SecurityService],
      (service: SecurityService) => {
        expect(service).toBeTruthy();
      }));
});
