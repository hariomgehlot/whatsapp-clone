import { animate, style, transition, trigger } from '@angular/animations';

export const routeAnimations = trigger('routeAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)', opacity: 0 }),
    animate('300ms ease-in-out', style({ transform: 'translateY(0)' })),
  ]),
  transition(':leave', [
    animate(
      '300ms ease-in-out',
      style({ transform: 'translateY(-100%)', opacity: 0 })
    ),
  ]),
]);
