import {Directive, Inject, Input, Self} from '@angular/core';
import {GOOGLE_MAPS_MAP_TOKEN} from '../tokens/google-maps-map-token';

/**
 * @dynamic
 */
@Directive({
  selector:
    'google-maps-map[fullscreenControl], google-maps-map[fullscreenControlOptions]',
})
export class GoogleMapsMapFullscreenControlDirective {
  public constructor(
    @Inject(GOOGLE_MAPS_MAP_TOKEN)
    @Self()
    private readonly _map: google.maps.Map,
  ) {}

  /**
   * @see {@link google.maps.MapOptions#fullscreenControl}
   */
  @Input()
  public set fullscreenControl(fullscreenControl: boolean | undefined) {
    this._map.setOptions({fullscreenControl});
  }

  /**
   * @see {@link google.maps.MapOptions#fullscreenControlOptions}
   */
  @Input()
  public set fullscreenControlOptions(
    fullscreenControlOptions: google.maps.FullscreenControlOptions,
  ) {
    this._map.setOptions({fullscreenControlOptions});
  }
}
