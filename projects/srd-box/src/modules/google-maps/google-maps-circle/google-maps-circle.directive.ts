import {Directive, Inject, Input, Output, Self} from '@angular/core';
import {GoogleMapsFilledShape} from '../google-maps-filled-shape';
import {LatLngValueObservable} from '../lat-lng-value-observable';
import {MvcValueObservable} from '../mvc-value-observable';
import {GOOGLE_MAPS_CIRCLE} from '../tokens/google-maps-circle';
import {GOOGLE_MAPS_MAP_ITEM_TOKEN} from '../tokens/google-maps-map-item-token';

/**
 * @dynamic
 */
@Directive({
  selector: 'google-maps-circle',
  providers: [
    {provide: GOOGLE_MAPS_CIRCLE, useFactory: () => new google.maps.Circle()},
    {provide: GOOGLE_MAPS_MAP_ITEM_TOKEN, useExisting: GOOGLE_MAPS_CIRCLE},
  ],
})
/**
 * @see {@link google.maps.Circle}
 */
export class GoogleMapsCircleDirective extends GoogleMapsFilledShape {
  /**
   * @see {@link google.maps.Circle#getCenter}
   */
  @Output() public readonly centerChange = new LatLngValueObservable(
    this._item,
    'center',
  );

  /**
   * @see {@link google.maps.Circle#getRadius}
   */
  @Output() public readonly radiusChange = new MvcValueObservable<number>(
    this._item,
    'radius',
  );

  public constructor(
    @Inject(GOOGLE_MAPS_CIRCLE)
    @Self()
    protected readonly _item: google.maps.Circle,
  ) {
    super();
  }

  /**
   * @see {@link google.maps.CircleOptions#center}
   * @see {@link google.maps.Circle#setCenter}
   */
  @Input() public set center(value: google.maps.LatLng) {
    this.centerChange.next(value);
  }

  /**
   * @see {@link google.maps.CircleOptions#radius}
   * @see {@link google.maps.Circle#setRadius}
   */
  @Input() public set radius(value: number) {
    this.radiusChange.next(value);
  }
}
