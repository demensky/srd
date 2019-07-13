import {Input} from '@angular/core';
import {GoogleMapsShape} from './google-maps-shape';
import {ProprietaryFilledShape} from './proprietary/proprietary-filled-shape';

export abstract class GoogleMapsFilledShape extends GoogleMapsShape {
  protected abstract readonly _item: ProprietaryFilledShape;

  @Input() set fillColor(value: string) {
    this._item.setOptions({fillColor: value});
  }

  @Input() set fillOpacity(value: number) {
    this._item.setOptions({fillOpacity: value});
  }
}
