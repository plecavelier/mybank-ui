/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { OperationsComponent } from './operations.component';

describe('Component: Operations', () => {
  it('should create an instance', () => {
    let component = new OperationsComponent(null, null);
    expect(component).toBeTruthy();
  });
});
