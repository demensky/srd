import {Input} from '@angular/core';
import {ProprietaryMapItem} from './proprietary/proprietary-map-item';

// TODO: https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle.getBounds
export abstract class GoogleMapsMapItem {
  protected abstract readonly _item: ProprietaryMapItem;

  protected constructor() {}

  @Input() public set clickable(value: boolean) {
    this._item.setClickable(value);
  }

  @Input() public set zIndex(value: number) {
    this._item.setZIndex(value);
  }

  @Input() public set draggable(value: boolean) {
    this._item.setDraggable(value);
  }

  @Input() public set visible(value: boolean) {
    this._item.setVisible(value);
  }
}
