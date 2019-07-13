import {Directive, Inject, Input, Output, Self} from '@angular/core';
import {Observable} from 'rxjs';
import {fromGoogleMapsObject} from '../from-google-maps-object';
import {GoogleMapsMapItem} from '../google-maps-map-item';
import {LatLngValueObservable} from '../lat-lng-value-observable';
import {GOOGLE_MAPS_MAP_ITEM_TOKEN} from '../tokens/google-maps-map-item-token';
import {GOOGLE_MAPS_MARKER_TOKEN} from '../tokens/google-maps-marker-token';

// TODO: add jsdoc
// TODO: info window https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
/**
 * @dynamic
 */
@Directive({
  selector: 'google-maps-marker',
  providers: [
    {
      provide: GOOGLE_MAPS_MARKER_TOKEN,
      useFactory: () => new google.maps.Marker(),
    },
    {
      provide: GOOGLE_MAPS_MAP_ITEM_TOKEN,
      useExisting: GOOGLE_MAPS_MARKER_TOKEN,
    },
  ],
})
// @ts-ignore
export class GoogleMapsMarkerDirective extends GoogleMapsMapItem {
  /**
   * @see {@link google.maps.Marker#getPosition}
   */
  @Output() public readonly positionChange = new LatLngValueObservable(
    this._item,
    'position',
  );

  @Output() public click: Observable<
    google.maps.MouseEvent
  > = fromGoogleMapsObject<google.maps.MouseEvent>(this._item, 'click');

  public constructor(
    @Inject(GOOGLE_MAPS_MARKER_TOKEN)
    @Self()
    protected readonly _item: google.maps.Marker,
  ) {
    super();
  }

  /**
   * @see {@link google.maps.MarkerOptions#anchorPoint}
   */
  @Input() public set anchorPoint(anchorPoint: google.maps.Point) {
    // TODO: remove as after fixed node_modules/@types/googlemaps/index.d.ts:681
    this._item.setOptions({anchorPoint} as google.maps.MarkerOptions);
  }

  /**
   * @see {@link google.maps.MarkerOptions#animation}
   * @see {@link google.maps.Marker#setAnimation}
   */
  @Input() public set animation(value: google.maps.Animation | null) {
    this._item.setAnimation(value);
  }

  /**
   * @see {@link google.maps.MarkerOptions#crossOnDrag}
   */
  @Input() public set crossOnDrag(crossOnDrag: boolean) {
    // TODO: remove as after fixed node_modules/@types/googlemaps/index.d.ts:681
    this._item.setOptions({crossOnDrag} as google.maps.MarkerOptions);
  }

  /**
   * @see {@link google.maps.MarkerOptions#cursor}
   * @see {@link google.maps.Marker#setCursor}
   */
  @Input() public set cursor(value: string) {
    this._item.setCursor(value);
  }

  /**
   * @see {@link google.maps.MarkerOptions#icon}
   * @see {@link google.maps.Marker#setIcon}
   */
  @Input() public set icon(
    value: string | google.maps.Icon | google.maps.Symbol,
  ) {
    this._item.setIcon(value);
  }

  /**
   * @see {@link google.maps.MarkerOptions#label}
   * @see {@link google.maps.Marker#setLabel}
   */
  @Input() public set label(value: string | google.maps.MarkerLabel) {
    this._item.setLabel(value);
  }

  /**
   * @see {@link google.maps.MarkerOptions#opacity}
   * @see {@link google.maps.Marker#setOptions}
   */
  @Input() public set opacity(value: number) {
    this._item.setOpacity(value);
  }

  /**
   * @see {@link google.maps.MarkerOptions#optimized}
   */
  @Input() public set optimized(optimized: boolean) {
    // TODO: remove as after fixed node_modules/@types/googlemaps/index.d.ts:681
    this._item.setOptions({optimized} as google.maps.MarkerOptions);
  }

  // TODO: add LatLngLiteral
  /**
   * @see {@link google.maps.MarkerOptions#position}
   * @see {@link google.maps.Marker#setPosition}
   */
  @Input() public set position(value: google.maps.LatLng) {
    this.positionChange.next(value);
  }

  /**
   * @see {@link google.maps.MarkerOptions#shape}
   * @see {@link google.maps.Marker#setShape}
   */
  @Input() public set shape(value: google.maps.MarkerShape) {
    this._item.setShape(value);
  }

  /**
   * @see {@link google.maps.MarkerOptions#visible}
   * @see {@link google.maps.Marker#setVisible}
   */
  @Input() public set title(value: string) {
    this._item.setTitle(value);
  }
}
