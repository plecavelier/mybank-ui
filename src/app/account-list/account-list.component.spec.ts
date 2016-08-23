/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { AccountListComponent } from './account-list.component';

describe('Component: AccountList', () => {
  it('should create an instance', () => {
    let component = new AccountListComponent(null);
    expect(component).toBeTruthy();
  });
});
