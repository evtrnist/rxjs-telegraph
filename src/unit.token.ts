import { InjectionToken } from '@angular/core';

export const UNIT = new InjectionToken('Morse code unit duration', {
  factory: () => 50,
});
