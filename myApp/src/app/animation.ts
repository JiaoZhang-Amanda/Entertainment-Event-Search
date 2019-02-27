import { trigger, state, animate, transition, style, query, stagger } from '@angular/animations';
 
export const slideInOutAnimation = trigger('slideInOutAnimation', [
	state('show', style({ left: '0' })),
	state('visible', style({ left: '0' })),
    state('hidden', style({ left: '100%' })),
    state('void', style({ left: '-100%' })),
    //transition('visible => hidden', animate('1s ease-in-out')),
    transition('hidden => show', animate('1s ease-in-out')),
    transition('void => visible', animate('1s ease-in-out'))
]);
 
export const ListAnimation = trigger('listAnimation', [
  transition('* => *', [ // each time the binding value changes
    query(':leave', [
      stagger(100, [
        animate('0.5s', style({ opacity: 0 }))
      ])
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0 }),
      stagger(100, [
        animate('0.5s', style({ opacity: 1 }))
      ])
    ], { optional: true })
  ])
]);
