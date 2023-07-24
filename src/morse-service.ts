import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MORSE_MAP } from './morse-token';

@Injectable({ providedIn: 'root' })
export class MorseService extends Subject<readonly (0 | 1)[]> {
  constructor(
    @Inject(MORSE_MAP) private readonly chars: Map<string, readonly (0 | 1)[]>
  ) {
    super();
  }

  public send(char: string) {
    this.next(this.chars.get(char) as (0 | 1)[]);
  }
}
