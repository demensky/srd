import {Directive, Inject, Input, OnChanges, Self} from '@angular/core';
import {concat} from 'rxjs';
import {mapTo, repeat, take} from 'rxjs/operators';
import {fromGoogleMapsObject} from '../modules/google-maps/from-google-maps-object';
import {ObservableHelperService} from '../modules/google-maps/observable-helper.service';
import {GOOGLE_MAPS_MARKER_TOKEN} from '../modules/google-maps/tokens/google-maps-marker-token';

const enum BoxImageState {
  NORMAL = 0,
  HOVERED = 1,
  ACTIVE = 2,
  ACTIVE_HOVERED = 3,
}

const BOX_STATES_COUNT = 4;

const BIG_BOX_SCALE = 2;

const BOX_WIDTH = 8;

const BOX_HEIGHT = 18;

const SMALL_BOX_SCALED_SIZE = new google.maps.Size(
  BOX_WIDTH * BOX_STATES_COUNT,
  BOX_HEIGHT,
);

const SMALL_BOX_SIZE = new google.maps.Size(BOX_WIDTH, BOX_HEIGHT);

const SMALL_BOX_ANCHOR = new google.maps.Point(2, 17);

const SMALL_BOX_ORIGIN_NORMAL = new google.maps.Point(
  BoxImageState.NORMAL * BOX_WIDTH,
  0,
);

const SMALL_BOX_ORIGIN_HOVERED = new google.maps.Point(
  BoxImageState.HOVERED * BOX_WIDTH,
  0,
);

const SMALL_BOX_ORIGIN_ACTIVE = new google.maps.Point(
  BoxImageState.ACTIVE * BOX_WIDTH,
  0,
);

const SMALL_BOX_ORIGIN_ACTIVE_HOVERED = new google.maps.Point(
  BoxImageState.ACTIVE_HOVERED * BOX_WIDTH,
  0,
);

const BIG_BOX_SCALED_SIZE = new google.maps.Size(
  BOX_WIDTH * BOX_STATES_COUNT * BIG_BOX_SCALE,
  BOX_HEIGHT * BIG_BOX_SCALE,
);

const BIG_BOX_SIZE = new google.maps.Size(
  BOX_WIDTH * BIG_BOX_SCALE,
  BOX_HEIGHT * BIG_BOX_SCALE,
);

const BIG_BOX_ANCHOR = new google.maps.Point(8, 35);

const BIG_BOX_ORIGIN_NORMAL = new google.maps.Point(
  BoxImageState.NORMAL * BOX_WIDTH * BIG_BOX_SCALE,
  0,
);

const BIG_BOX_ORIGIN_HOVERED = new google.maps.Point(
  BoxImageState.HOVERED * BOX_WIDTH * BIG_BOX_SCALE,
  0,
);

const BIG_BOX_ORIGIN_ACTIVE = new google.maps.Point(
  BoxImageState.ACTIVE * BOX_WIDTH * BIG_BOX_SCALE,
  0,
);

const BIG_BOX_ORIGIN_ACTIVE_HOVERED = new google.maps.Point(
  BoxImageState.ACTIVE_HOVERED * BOX_WIDTH * BIG_BOX_SCALE,
  0,
);

function getIcon(
  active: boolean,
  big: boolean,
  hovered: boolean,
): google.maps.Icon {
  let size: google.maps.Size;
  let scaledSize: google.maps.Size;
  let origin: google.maps.Point;
  let anchor: google.maps.Point;
  let url: string;

  if (big) {
    size = BIG_BOX_SIZE;
    scaledSize = BIG_BOX_SCALED_SIZE;
    anchor = BIG_BOX_ANCHOR;

    if (devicePixelRatio >= 3) {
      url = '/assets/boxes-x6.png';
    } else if (devicePixelRatio >= 2) {
      url = '/assets/boxes-x4.png';
    } else {
      url = '/assets/boxes-x2.png';
    }

    if (active) {
      origin = hovered ? BIG_BOX_ORIGIN_ACTIVE_HOVERED : BIG_BOX_ORIGIN_ACTIVE;
    } else {
      origin = hovered ? BIG_BOX_ORIGIN_HOVERED : BIG_BOX_ORIGIN_NORMAL;
    }
  } else {
    size = SMALL_BOX_SIZE;
    scaledSize = SMALL_BOX_SCALED_SIZE;
    anchor = SMALL_BOX_ANCHOR;
    if (devicePixelRatio >= 3) {
      url = '/assets/boxes-x2.png';
    } else if (devicePixelRatio >= 2) {
      url = '/assets/boxes-x2.png';
    } else {
      url = '/assets/boxes-x1.png';
    }

    if (active) {
      origin = hovered
        ? SMALL_BOX_ORIGIN_ACTIVE_HOVERED
        : SMALL_BOX_ORIGIN_ACTIVE;
    } else {
      origin = hovered ? SMALL_BOX_ORIGIN_HOVERED : SMALL_BOX_ORIGIN_NORMAL;
    }
  }

  return {url, size, scaledSize, origin, anchor};
}

// TODO: optimize
/**
 * @dynamic
 */
@Directive({
  selector: 'google-maps-marker[boxActive], google-maps-marker[boxBig]',
  providers: [ObservableHelperService],
})
export class BoxMarkerDirective implements OnChanges {
  private _hovered = false;

  @Input()
  public readonly boxActive = false;

  @Input()
  public readonly boxBig = true;

  public constructor(
    @Inject(GOOGLE_MAPS_MARKER_TOKEN)
    @Self()
    private readonly _marker: google.maps.Marker,
    observableHelper: ObservableHelperService,
  ) {
    concat(
      fromGoogleMapsObject(_marker, 'mouseover').pipe(
        take(1),
        mapTo(true),
      ),
      fromGoogleMapsObject(_marker, 'mouseout').pipe(
        take(1),
        mapTo(false),
      ),
    )
      .pipe(
        repeat(),
        observableHelper.untilOnDestroy(),
      )
      .subscribe(hovered => {
        this._hovered = hovered;
        this._updateMarker();
      });
  }

  private _updateMarker(): void {
    this._marker.setIcon(getIcon(this.boxActive, this.boxBig, this._hovered));
  }

  public ngOnChanges(): void {
    this._updateMarker();
  }
}
