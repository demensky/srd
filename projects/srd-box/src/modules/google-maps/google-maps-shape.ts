import {Input} from '@angular/core';
import {GoogleMapsMapItem} from './google-maps-map-item';
import {ProprietaryShape} from './proprietary/proprietary-shape';

export abstract class GoogleMapsShape extends GoogleMapsMapItem {
  protected abstract readonly _item: ProprietaryShape;

  @Input() public set editable(value: boolean) {
    this._item.setEditable(value);
  }

  @Input() set strokeColor(value: string) {
    this._item.setOptions({strokeColor: value});
  }

  @Input() set strokeOpacity(value: number) {
    this._item.setOptions({strokeOpacity: value});
  }

  @Input() set strokeWeight(value: number) {
    this._item.setOptions({strokeWeight: value});
  }
}
