/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { TagFormComponent } from './tag-form.component';

describe('Component: TagForm', () => {
  it('should create an instance', () => {
    let component = new TagFormComponent(null, null, null, null);
    expect(component).toBeTruthy();
  });
});
