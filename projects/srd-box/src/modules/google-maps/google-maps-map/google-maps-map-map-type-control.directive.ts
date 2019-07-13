import {Directive, Inject, Input, Self} from '@angular/core';
import {GOOGLE_MAPS_MAP_TOKEN} from '../tokens/google-maps-map-token';

/**
 * @dynamic
 */
@Directive({
  selector:
    'google-maps-map[mapTypeControl], google-maps-map[mapTypeControlOptions]',
})
export class GoogleMapsMapMapTypeControlDirective {
  public constructor(
    @Inject(GOOGLE_MAPS_MAP_TOKEN)
    @Self()
    private readonly _map: google.maps.Map,
  ) {}

  /**
   * @see {@link google.maps.MapOptions#mapTypeControl}
   */
  @Input()
  public set mapTypeControl(mapTypeControl: boolean | undefined) {
    this._map.setOptions({mapTypeControl});
  }

  /**
   * @see {@link google.maps.MapOptions#mapTypeControlOptions}
   */
  @Input()
  public set mapTypeControlOptions(
    mapTypeControlOptions: google.maps.MapTypeControlOptions,
  ) {
    this._map.setOptions({mapTypeControlOptions});
  }
}
