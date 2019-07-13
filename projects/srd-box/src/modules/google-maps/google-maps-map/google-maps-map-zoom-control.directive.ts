import {Directive, Inject, Input, Self} from '@angular/core';
import {GOOGLE_MAPS_MAP_TOKEN} from '../tokens/google-maps-map-token';

/**
 * @dynamic
 */
@Directive({
  selector: 'google-maps-map[zoomControl], google-maps-map[zoomControlOptions]',
})
export class GoogleMapsMapZoomControlDirective {
  public constructor(
    @Inject(GOOGLE_MAPS_MAP_TOKEN)
    @Self()
    private readonly _map: google.maps.Map,
  ) {}

  /**
   * @see {@link google.maps.MapOptions#zoomControl}
   */
  @Input()
  public set zoomControl(zoomControl: boolean | undefined) {
    this._map.setOptions({zoomControl});
  }

  /**
   * @see {@link google.maps.MapOptions#zoomControlOptions}
   */
  @Input()
  public set zoomControlOptions(
    zoomControlOptions: google.maps.ZoomControlOptions,
  ) {
    this._map.setOptions({zoomControlOptions});
  }
}
