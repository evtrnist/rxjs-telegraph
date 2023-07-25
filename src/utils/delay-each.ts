import { concatMap, MonoTypeOperatorFunction, of, delay } from 'rxjs';

export function delayEach<T>(duration: number): MonoTypeOperatorFunction<T> {
  return concatMap((x) => of(x).pipe(delay(duration)));
}
