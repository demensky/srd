import {NextObserver, Observable} from 'rxjs';
import MapsEventListener = google.maps.MapsEventListener;
import MVCObject = google.maps.MVCObject;

export class MvcValueObservable<T> extends Observable<T>
  implements NextObserver<T> {
  private _current: T | null = null;

  public constructor(
    protected readonly _target: MVCObject,
    private readonly _key: string,
  ) {
    super(subscriber => {
      const listener: MapsEventListener = _target.addListener(
        `${_key.toLowerCase()}_changed`,
        () => {
          const value = this._target.get(_key);

          if (this._current !== null && this._isEquals(this._current, value)) {
            return;
          }

          this._current = value;
          subscriber.next(value);
        },
      );

      return () => {
        listener.remove();
      };
    });
  }

  protected _isEquals(oldValue: T, newValue: T): boolean {
    return oldValue === newValue;
  }

  public next(value: T): void {
    if (this._current !== null && this._isEquals(this._current, value)) {
      return;
    }

    this._current = value;
    this._target.set(this._key, value);
  }
}
