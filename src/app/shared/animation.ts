import { Component, trigger, transition, style, animate } from '@angular/core';

export const fadeAnimation = trigger(
  'fade', [
    transition(':enter', [
      style({opacity: 0}),
      animate('250ms', style({opacity: 1}))
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate('250ms', style({opacity: 0}))
    ])
  ]
);