/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { AlertService } from './alert.service';

describe('Service: Alert', () => {
  beforeEach(() => {
    addProviders([AlertService]);
  });

  it('should ...',
    inject([AlertService],
      (service: AlertService) => {
        expect(service).toBeTruthy();
      }));
});
