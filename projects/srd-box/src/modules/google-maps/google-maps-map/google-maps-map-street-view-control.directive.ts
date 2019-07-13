import {Directive, Inject, Input, Self} from '@angular/core';
import {GOOGLE_MAPS_MAP_TOKEN} from '../tokens/google-maps-map-token';

/**
 * @dynamic
 */
@Directive({
  selector:
    'google-maps-map[streetViewControl], google-maps-map[streetViewControlOptions]',
})
export class GoogleMapsMapStreetViewControlDirective {
  public constructor(
    @Inject(GOOGLE_MAPS_MAP_TOKEN)
    @Self()
    private readonly _map: google.maps.Map,
  ) {}

  /**
   * @see {@link google.maps.MapOptions#streetViewControl}
   */
  @Input()
  public set streetViewControl(streetViewControl: boolean | undefined) {
    this._map.setOptions({streetViewControl});
  }

  /**
   * @see {@link google.maps.MapOptions#streetViewControlOptions}
   */
  @Input()
  public set streetViewControlOptions(
    streetViewControlOptions: google.maps.StreetViewControlOptions,
  ) {
    this._map.setOptions({streetViewControlOptions});
  }
}
