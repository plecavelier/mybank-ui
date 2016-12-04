/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { TagListComponent } from './tag-list.component';

describe('Component: TagList', () => {
  it('should create an instance', () => {
    let component = new TagListComponent(null, null, null);
    expect(component).toBeTruthy();
  });
});
