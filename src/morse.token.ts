import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';
import {
  concatMap,
  endWith,
  filter,
  from,
  fromEvent,
  map,
  merge,
  share,
} from 'rxjs';
import { MORSE_MAP } from './morse-map.token';
import { MorseService } from './morse.service';
import { SPACE } from './space';
import { UNIT } from './unit.token';
import { delayEach } from './utils/delay-each';

export const MORSE = new InjectionToken('A sequence of Morse code', {
  factory: () => {
    const chars = inject(MORSE_MAP);
    const duration = inject(UNIT);
    const service$ = inject(MorseService);

    const keydown$ = fromEvent(inject(DOCUMENT), 'keydown').pipe(
      filter((event): event is KeyboardEvent => event instanceof KeyboardEvent),
      map(({ key }: KeyboardEvent) => chars.get(key)),
      filter(Boolean)
    );

    return merge(service$, keydown$).pipe(
      concatMap((sequence) =>
        from(sequence).pipe(endWith(...SPACE), delayEach(duration))
      ),
      share()
    );
  },
});
