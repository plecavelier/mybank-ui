/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { MonthNamePipe } from './month-name.pipe';

describe('Pipe: MonthName', () => {
  it('create an instance', () => {
    let pipe = new MonthNamePipe();
    expect(pipe).toBeTruthy();
  });
});
