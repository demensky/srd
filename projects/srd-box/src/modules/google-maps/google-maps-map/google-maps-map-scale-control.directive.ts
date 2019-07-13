import {Directive, Inject, Input, Self} from '@angular/core';
import {GOOGLE_MAPS_MAP_TOKEN} from '../tokens/google-maps-map-token';

/**
 * @dynamic
 */
@Directive({
  selector:
    'google-maps-map[scaleControl], google-maps-map[scaleControlOptions]',
})
export class GoogleMapsMapScaleControlDirective {
  public constructor(
    @Inject(GOOGLE_MAPS_MAP_TOKEN)
    @Self()
    private readonly _map: google.maps.Map,
  ) {}

  /**
   * @see {@link google.maps.MapOptions#scaleControl}
   */
  @Input()
  public set scaleControl(scaleControl: boolean | undefined) {
    this._map.setOptions({scaleControl});
  }

  /**
   * @see {@link google.maps.MapOptions#scaleControlOptions}
   */
  @Input()
  public set scaleControlOptions(
    scaleControlOptions: google.maps.ScaleControlOptions,
  ) {
    this._map.setOptions({scaleControlOptions});
  }
}
