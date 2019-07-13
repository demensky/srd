import {Directive, Inject, Input, Self} from '@angular/core';
import {GOOGLE_MAPS_MAP_TOKEN} from '../tokens/google-maps-map-token';

/**
 * @dynamic
 */
@Directive({
  selector:
    'google-maps-map[rotateControl], google-maps-map[rotateControlOptions]',
})
export class GoogleMapsMapRotateControlDirective {
  public constructor(
    @Inject(GOOGLE_MAPS_MAP_TOKEN)
    @Self()
    private readonly _map: google.maps.Map,
  ) {}

  /**
   * @see {@link google.maps.MapOptions#rotateControl}
   */
  @Input()
  public set rotateControl(rotateControl: boolean | undefined) {
    this._map.setOptions({rotateControl});
  }

  /**
   * @see {@link google.maps.MapOptions#rotateControlOptions}
   */
  @Input()
  public set rotateControlOptions(
    rotateControlOptions: google.maps.RotateControlOptions,
  ) {
    this._map.setOptions({rotateControlOptions});
  }
}
