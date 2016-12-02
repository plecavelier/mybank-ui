/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { OperationFormComponent } from './operation-form.component';

describe('Component: OperationForm', () => {
  it('should create an instance', () => {
    let component = new OperationFormComponent(null, null, null, null, null, null);
    expect(component).toBeTruthy();
  });
});
