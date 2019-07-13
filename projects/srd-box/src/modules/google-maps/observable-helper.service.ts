import {Injectable, OnDestroy} from '@angular/core';
import {MonoTypeOperatorFunction, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable()
export class ObservableHelperService implements OnDestroy {
  private readonly _root = new Subject();

  public ngOnDestroy(): void {
    this._root.next();
    this._root.complete();
  }

  public untilOnDestroy<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil<T>(this._root);
  }
}
