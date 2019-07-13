import {
  AfterContentInit,
  ContentChildren,
  Directive,
  ElementRef,
  Inject,
  IterableDifferFactory,
  IterableDiffers,
  QueryList,
  Self,
} from '@angular/core';
import {iterableDifferObservableFromQueryList} from '../google-maps-map/google-maps-map.component';
import {ObservableHelperService} from '../observable-helper.service';
import {GOOGLE_MAPS_MAP_TOKEN} from '../tokens/google-maps-map-token';
import {GoogleMapsMapControlBottomCenterDirective} from './google-maps-map-control-bottom-center.directive';
import {GoogleMapsMapControlBottomLeftDirective} from './google-maps-map-control-bottom-left.directive';
import {GoogleMapsMapControlBottomRightDirective} from './google-maps-map-control-bottom-right.directive';
import {GoogleMapsMapControlLeftBottomDirective} from './google-maps-map-control-left-bottom.directive';
import {GoogleMapsMapControlLeftCenterDirective} from './google-maps-map-control-left-center.directive';
import {GoogleMapsMapControlLeftTopDirective} from './google-maps-map-control-left-top.directive';
import {GoogleMapsMapControlRightBottomDirective} from './google-maps-map-control-right-bottom.directive';
import {GoogleMapsMapControlRightCenterDirective} from './google-maps-map-control-right-center.directive';
import {GoogleMapsMapControlRightTopDirective} from './google-maps-map-control-right-top.directive';
import {GoogleMapsMapControlTopCenterDirective} from './google-maps-map-control-top-center.directive';
import {GoogleMapsMapControlTopLeftDirective} from './google-maps-map-control-top-left.directive';
import {GoogleMapsMapControlTopRightDirective} from './google-maps-map-control-top-right.directive';

/**
 * @dynamic
 */
@Directive({
  selector: 'google-maps-map[attachControls]',
})
export class GoogleMapsMapAttachControlsDirective implements AfterContentInit {
  @ContentChildren(GoogleMapsMapControlTopLeftDirective, {read: ElementRef})
  private _controlsTopLeft!: QueryList<ElementRef<Node>>;

  @ContentChildren(GoogleMapsMapControlTopCenterDirective, {read: ElementRef})
  private _controlsTopCenter!: QueryList<ElementRef<Node>>;

  @ContentChildren(GoogleMapsMapControlTopRightDirective, {read: ElementRef})
  private _controlsTopRight!: QueryList<ElementRef<Node>>;

  @ContentChildren(GoogleMapsMapControlLeftCenterDirective, {read: ElementRef})
  private _controlsLeftCenter!: QueryList<ElementRef<Node>>;

  @ContentChildren(GoogleMapsMapControlLeftTopDirective, {read: ElementRef})
  private _controlsLeftTop!: QueryList<ElementRef<Node>>;

  @ContentChildren(GoogleMapsMapControlLeftBottomDirective, {read: ElementRef})
  private _controlsLeftBottom!: QueryList<ElementRef<Node>>;

  @ContentChildren(GoogleMapsMapControlRightTopDirective, {read: ElementRef})
  private _controlsRightTop!: QueryList<ElementRef<Node>>;

  @ContentChildren(GoogleMapsMapControlRightCenterDirective, {read: ElementRef})
  private _controlsRightCenter!: QueryList<ElementRef<Node>>;

  @ContentChildren(GoogleMapsMapControlRightBottomDirective, {read: ElementRef})
  private _controlsRightBottom!: QueryList<ElementRef<Node>>;

  @ContentChildren(GoogleMapsMapControlBottomLeftDirective, {read: ElementRef})
  private _controlsBottomLeft!: QueryList<ElementRef<Node>>;

  @ContentChildren(GoogleMapsMapControlBottomCenterDirective, {
    read: ElementRef,
  })
  private _controlsBottomCenter!: QueryList<ElementRef<Node>>;

  @ContentChildren(GoogleMapsMapControlBottomRightDirective, {read: ElementRef})
  private _controlsBottomRight!: QueryList<ElementRef<Node>>;

  public constructor(
    @Inject(GOOGLE_MAPS_MAP_TOKEN)
    @Self()
    private readonly _map: google.maps.Map,
    private readonly _iterableDiffers: IterableDiffers,
    @Self() private readonly _observableHelper: ObservableHelperService,
  ) {}

  public ngAfterContentInit(): void {
    const iterableDifferFactory: IterableDifferFactory = this._iterableDiffers.find(
      [],
    );

    this._handleControl(
      this._controlsTopLeft,
      iterableDifferFactory,
      google.maps.ControlPosition.TOP_LEFT,
    );
    this._handleControl(
      this._controlsTopCenter,
      iterableDifferFactory,
      google.maps.ControlPosition.TOP_CENTER,
    );
    this._handleControl(
      this._controlsTopRight,
      iterableDifferFactory,
      google.maps.ControlPosition.TOP_RIGHT,
    );
    this._handleControl(
      this._controlsLeftCenter,
      iterableDifferFactory,
      google.maps.ControlPosition.LEFT_CENTER,
    );
    this._handleControl(
      this._controlsLeftTop,
      iterableDifferFactory,
      google.maps.ControlPosition.LEFT_TOP,
    );
    this._handleControl(
      this._controlsLeftBottom,
      iterableDifferFactory,
      google.maps.ControlPosition.LEFT_BOTTOM,
    );
    this._handleControl(
      this._controlsRightTop,
      iterableDifferFactory,
      google.maps.ControlPosition.RIGHT_TOP,
    );
    this._handleControl(
      this._controlsRightCenter,
      iterableDifferFactory,
      google.maps.ControlPosition.RIGHT_CENTER,
    );
    this._handleControl(
      this._controlsRightBottom,
      iterableDifferFactory,
      google.maps.ControlPosition.RIGHT_BOTTOM,
    );
    this._handleControl(
      this._controlsBottomLeft,
      iterableDifferFactory,
      google.maps.ControlPosition.BOTTOM_LEFT,
    );
    this._handleControl(
      this._controlsBottomCenter,
      iterableDifferFactory,
      google.maps.ControlPosition.BOTTOM_CENTER,
    );
    this._handleControl(
      this._controlsBottomRight,
      iterableDifferFactory,
      google.maps.ControlPosition.BOTTOM_RIGHT,
    );
  }

  private _handleControl(
    queryList: QueryList<ElementRef<Node>>,
    iterableDifferFactory: IterableDifferFactory,
    position: google.maps.ControlPosition,
  ) {
    const mvcArray: google.maps.MVCArray<Node> = this._map.controls[position];

    iterableDifferObservableFromQueryList<ElementRef<Node>>(
      queryList,
      iterableDifferFactory,
    )
      .pipe(this._observableHelper.untilOnDestroy())
      .subscribe(iterableChanges => {
        iterableChanges.forEachOperation(
          ({item}, adjustedPreviousIndex, currentIndex) => {
            if (adjustedPreviousIndex !== null) {
              mvcArray.removeAt(adjustedPreviousIndex);
            }

            if (currentIndex !== null) {
              mvcArray.insertAt(currentIndex, item.nativeElement);
            }
          },
        );
      });
  }
}
